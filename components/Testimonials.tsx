"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Mehta",
    role: "Homeowner — Penthouse Redesign",
    location: "Mumbai, MH",
    quote:
      "Nirvana didn't just design our penthouse — they reimagined how we live. Every corner breathes quiet luxury, from the hand-finished lime plaster walls to the bespoke brass lighting. It's a sanctuary we never want to leave.",
    image: "/quiz-quiet-luxury.png",
  },
  {
    name: "Arjun & Kavitha Rao",
    role: "Homeowners — Full Villa Construction & Interiors",
    location: "Bangalore, KA",
    quote:
      "From foundation to furnishings, Nirvana handled everything with unparalleled precision. Our villa seamlessly blends Japandi simplicity with warmth. Their attention to joinery and natural materials is extraordinary.",
    image: "/quiz-organic.png",
  },
  {
    name: "Sophia Laurent",
    role: "CEO — Boutique Hotel Interiors",
    location: "Goa, GA",
    quote:
      "We commissioned Nirvana for our heritage boutique hotel, and the result exceeded every expectation. European gilding meets tropical modernism — our guests are consistently stunned. A true masterwork of taste.",
    image: "/quiz-heritage.png",
  },
  {
    name: "Vikram Desai",
    role: "Architect — Collaborative Residential Project",
    location: "Delhi, DL",
    quote:
      "Working with Nirvana's team was a revelation. Their understanding of organic modernism and ability to translate mood boards into tangible, livable beauty is rare. I've recommended them to every high-end client since.",
    image: "/quiz-minimalist.png",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const paginate = (dir: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
    startAutoplay();
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-36 bg-[#0a3d2e] overflow-hidden"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8905a]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-12">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="font-sans text-xs font-bold tracking-[0.3em] text-[#c8905a] uppercase">
            ARCHITECTS OF LUXURY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider leading-tight text-[#fdfbf7]">
            Client <span className="text-gold-gradient">Testimonials</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative w-full max-w-4xl mx-auto min-h-[380px] md:min-h-[320px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-[#fdfbf7] rounded-sm border border-[#c8905a]/20 p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl shadow-black/20"
            >
              {/* Quote Image */}
              <div className="md:col-span-4 relative aspect-square w-full max-w-[200px] mx-auto rounded-sm overflow-hidden border border-[#c8905a]/20 shadow-md">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b2624]/20 to-transparent" />
              </div>

              {/* Quote Content */}
              <div className="md:col-span-8 flex flex-col gap-4 select-text">
                <Quote className="w-8 h-8 text-[#c8905a]/40" />
                <p className="text-sm md:text-base text-[#2b2624] font-light leading-relaxed tracking-wide italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex flex-col gap-0.5 mt-2">
                  <span className="font-serif text-base font-bold text-[#2b2624] tracking-wider">
                    {t.name}
                  </span>
                  <span className="text-[10px] font-sans tracking-[0.2em] text-[#c8905a] uppercase">
                    {t.role} — {t.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            id="testimonial-prev"
            onClick={() => paginate(-1)}
            className="p-3 border border-[#c8905a]/25 hover:border-[#c8905a] bg-white/10 backdrop-blur-sm text-[#fdfbf7] rounded-full hover:text-[#c8905a] transition-all cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                id={`testimonial-dot-${idx}`}
                onClick={() => {
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  setDirection(idx > current ? 1 : -1);
                  setCurrent(idx);
                  startAutoplay();
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === current
                  ? "bg-[#c8905a] w-6"
                  : "bg-[#c8905a]/25 hover:bg-[#c8905a]/50"
                  }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            id="testimonial-next"
            onClick={() => paginate(1)}
            className="p-3 border border-[#c8905a]/25 hover:border-[#c8905a] bg-white/10 backdrop-blur-sm text-[#fdfbf7] rounded-full hover:text-[#c8905a] transition-all cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
