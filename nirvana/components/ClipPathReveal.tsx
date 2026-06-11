"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Eye, GripVertical, ArrowLeftRight } from "lucide-react";

export default function ClipPathReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    ["inset(14% 8% 14% 8% round 16px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0.3, 0.5], [0, -40]);

  const updateSlider = useCallback(
    (clientX: number) => {
      if (!stickyRef.current) return;
      const rect = stickyRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
      setSliderPos(pct);
      if (!hasInteracted) setHasInteracted(true);
    },
    [hasInteracted]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, updateSlider]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      updateSlider(e.touches[0].clientX);
    },
    [updateSlider]
  );

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      updateSlider(e.touches[0].clientX);
    };
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, updateSlider]);

  // Two genuinely different images
  const beforeImage = "/before-space.png";
  const afterImage = "/after-space.png";

  return (
    <section ref={containerRef} className="relative h-[180vh] bg-[#f4efe6]">
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden select-none"
        style={{ cursor: isDragging ? "grabbing" : "default" }}
      >
        <motion.div style={{ clipPath }} className="absolute inset-0 w-full h-full">

          {/* ─── AFTER Layer (Fully Designed — Always Full Width Behind) ─── */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${afterImage}")` }}
          />

          {/* ─── BEFORE Layer (Raw / Empty — Clipped to sliderPos) ─── */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${beforeImage}")`,
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          />

          {/* Blueprint grid overlay on the BEFORE side for architectural feel */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(200,144,90,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200,144,90,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          />

          {/* "BEFORE" label — top-left */}
          <div
            className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20 pointer-events-none transition-opacity duration-300"
            style={{ opacity: sliderPos > 10 ? 1 : 0 }}
          >
            <span className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-[#2b2624]/80 backdrop-blur-sm text-[#fdfbf7] text-[8px] sm:text-[10px] font-bold tracking-[0.3em] uppercase rounded-full border border-white/10">
              🏗️ Raw Space
            </span>
          </div>

          {/* "AFTER" label — top-right */}
          <div
            className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 pointer-events-none transition-opacity duration-300"
            style={{ opacity: sliderPos < 90 ? 1 : 0 }}
          >
            <span className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-[#c8905a]/90 backdrop-blur-sm text-[#fdfbf7] text-[8px] sm:text-[10px] font-bold tracking-[0.3em] uppercase rounded-full border border-white/10">
              ✨ Designed
            </span>
          </div>

          {/* ─── Bottom gradient for text readability ─── */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b2624]/80 via-[#2b2624]/10 to-transparent pointer-events-none" />

          {/* ─── Draggable Divider Line ─── */}
          <div
            className="absolute top-0 bottom-0 z-30 flex items-center"
            style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
          >
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 w-[3px] bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.4)]" />

            {/* Drag Handle */}
            <button
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className={`relative z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-200 ${
                isDragging
                  ? "bg-[#c8905a] scale-110 shadow-[0_0_35px_rgba(200,144,90,0.6)]"
                  : "bg-white hover:bg-[#c8905a] hover:scale-105 shadow-[0_4px_25px_rgba(0,0,0,0.3)]"
              } border-2 border-[#c8905a]/70`}
            >
              <GripVertical
                className={`w-5 h-5 transition-colors duration-200 ${
                  isDragging ? "text-white" : "text-[#2b2624]"
                }`}
              />
            </button>
          </div>

          {/* ─── Center Text Overlay (fades when interacting) ─── */}
          <motion.div
            style={{ opacity: hasInteracted ? 0 : textOpacity, y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20 pointer-events-none transition-opacity duration-700"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans text-xs font-bold tracking-[0.4em] text-[#c8905a] uppercase mb-5 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Step Inside
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15 }}
              className="font-serif text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-wider max-w-5xl leading-[1.1] drop-shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
            >
              EXPERIENCE THE SPACE <br />
              <span className="text-gold-gradient italic pr-4 drop-shadow-none">
                Before It Exists.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-6 text-white/80 text-sm md:text-base font-light max-w-xl tracking-wider leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
            >
              Drag the slider to witness how we transform raw spaces into
              architectural masterpieces.
            </motion.p>
          </motion.div>

          {/* ─── Hint Tooltip with wiggle animation ─── */}
          <AnimatePresence>
            {!hasInteracted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: [0, 1, 1, 0.7, 1],
                  x: [0, -20, 20, -15, 0],
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  opacity: { duration: 2, delay: 0.8 },
                  x: { duration: 2.5, delay: 1.5, repeat: Infinity, repeatDelay: 2 },
                }}
                className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/95 backdrop-blur-md rounded-full border border-[#c8905a]/25 shadow-xl pointer-events-none"
              >
                <ArrowLeftRight className="w-4 h-4 text-[#c8905a]" />
                <span className="text-xs font-sans font-bold tracking-widest text-[#2b2624] uppercase">
                  Drag to compare
                </span>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
