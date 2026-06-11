"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Shield, Sparkles, Hammer } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  trigger: boolean;
}

function Counter({ value, suffix = "", trigger }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDuration = 2000;
    const incrementTime = Math.max(Math.floor(totalDuration / end), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, trigger]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const values = [
    {
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />,
      title: "Quiet Luxury Aesthetic",
      description: "Understated elegance focusing on textured natural plaster, fine brass moldings, and deep bespoke colors that create comforting sanctuaries.",
    },
    {
      icon: <Hammer className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />,
      title: "Structural Craftsmanship",
      description: "Rooted in premium builders and developers heritage. We manage constructions and materials with absolute precision and maintain the highest build quality.",
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />,
      title: "Bespoke Perfection",
      description: "Every drawer joint, lighting layout, and marble texture is curated individually. No templates, no duplication—your space is a single unique masterwork.",
    },
  ];

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-36 bg-[#031f18] text-[#f4f3ed] overflow-hidden"
    >
      {/* Decorative line */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[#d4af37]/5 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Side */}
        <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-3"
          >
            <span className="font-sans text-xs font-bold tracking-[0.3em] text-[#d4af37] uppercase">
              OUR MANIFESTO
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold tracking-wider leading-tight">
              Crafting Havens of <br />
              <span className="text-gold-gradient text-glow-gold">Sovereign Serenity</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm sm:text-base text-[#b5b0a3] font-light leading-relaxed tracking-wider"
          >
            At Nirvana, we believe that an interior is not simply a decorated room, but an extension of your soul.
            By marrying master craftsmanship in general construction with elite, contemporary architectural design,
            we create private sanctuaries that evoke deep tranquility and timeless sophistication.
          </motion.p>

          {/* Pillars */}
          <div className="flex flex-col gap-4 sm:gap-6 mt-2 sm:mt-4">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-sm border border-[#d4af37]/5 bg-[#052e24]/40 hover:border-[#d4af37]/20 transition-all duration-300 group"
              >
                <div className="p-2 sm:p-3 bg-[#031f18] rounded-sm group-hover:bg-[#d4af37]/10 transition-colors duration-300 shrink-0">
                  {val.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-base sm:text-lg font-semibold tracking-wider text-[#f4f3ed] group-hover:text-[#d4af37] transition-colors duration-300">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b5b0a3] font-light leading-relaxed tracking-wide">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-5 flex flex-col gap-8 sm:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            style={{ y: imageY }}
            className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-[#d4af37]/25 shadow-2xl"
          >
            <Image
              src="/images/quiet_luxury.png"
              alt="Luxury Parlor Detail"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover scale-105 hover:scale-110 transition-transform duration-300 ease-out"
            />
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#d4af37]/50" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#d4af37]/50" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#d4af37]/50" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#d4af37]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>

          {/* Counters */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-[#d4af37]/15">
            <div className="flex flex-col gap-1 text-center">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#d4af37]">
                <Counter value={150} suffix="+" trigger={isInView} />
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] sm:tracking-[0.25em] text-[#b5b0a3] uppercase">
                Sanctuaries
              </span>
            </div>
            <div className="flex flex-col gap-1 text-center border-x border-[#d4af37]/15">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#d4af37]">
                <Counter value={12} suffix="+" trigger={isInView} />
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] sm:tracking-[0.25em] text-[#b5b0a3] uppercase">
                Years
              </span>
            </div>
            <div className="flex flex-col gap-1 text-center">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#d4af37]">
                <Counter value={100} suffix="%" trigger={isInView} />
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] sm:tracking-[0.25em] text-[#b5b0a3] uppercase">
                Bespoke
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
