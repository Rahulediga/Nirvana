"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowDown, ChevronRight, Compass } from "lucide-react";

interface HeroProps {
  onOpenInquiry: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onOpenInquiry, onScrollToSection }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const titleText = "ELEVATING SPACES";
  const subtitleText = "INTO LIVING MASTERPIECES";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 18 },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background Video */}
      <motion.div
        style={{ scale: imageScale }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <video
          src="/videos/Heroic Page Video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute bottom-16 sm:bottom-24 md:bottom-28 left-0 z-10 px-5 sm:px-12 md:px-20 flex flex-col items-start text-left gap-4 sm:gap-5 max-w-3xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-2 px-3 py-1.5 border border-[#d4af37]/30 bg-black/40 backdrop-blur-sm rounded-full text-[#d4af37] text-[9px] sm:text-xs font-semibold uppercase tracking-[0.25em]"
        >
          <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin-slow" />
          <span>NIRVANA BUILDERS &amp; DEVELOPERS</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.06em] text-[#f4f3ed] leading-[1.1] select-text whitespace-normal"
        >
          <span className="flex flex-wrap gap-x-2 sm:gap-x-4 md:gap-x-5">
            {titleText.split(" ").map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-base sm:text-xl md:text-2xl font-light tracking-[0.1em] sm:tracking-[0.15em] text-[#b5b0a3] font-serif"
        >
          {subtitleText}
        </motion.p>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-16 h-[1px] bg-[#d4af37] origin-left"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-md text-xs sm:text-sm text-[#b5b0a3]/80 font-light leading-relaxed tracking-wide select-text"
        >
          Crafting architectural sanctuaries that fuse quiet luxury with structural brilliance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-3 mt-1 w-full sm:w-auto"
        >
          <button
            id="hero-cta-journey"
            onClick={onOpenInquiry}
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gold-gradient text-[#031f18] text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-sm shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.45)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <span>Begin Your Journey</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            id="hero-cta-portfolio"
            onClick={() => onScrollToSection("portfolio")}
            className="flex items-center justify-center gap-2 px-7 py-3.5 border border-[#f4f3ed]/20 bg-white/5 backdrop-blur-sm text-[#f4f3ed] hover:border-[#d4af37] hover:text-[#d4af37] text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 cursor-pointer"
          >
            <span>View Masterpieces</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => onScrollToSection("philosophy")}
        className="absolute bottom-6 sm:bottom-8 right-5 sm:right-12 md:right-20 z-10 flex flex-col items-center gap-2 text-[#b5b0a3]/60 hover:text-[#d4af37] cursor-pointer transition-colors duration-300"
      >
        <span className="text-[9px] font-sans tracking-[0.3em] uppercase hidden sm:block">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
