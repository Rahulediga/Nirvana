"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw, ChevronRight } from "lucide-react";

/* ─── Data ─── */
interface Option {
  label: string;
  style: string;
  image: string;
  subtitle: string;
}

interface Question {
  question: string;
  tagline: string;
  options: Option[];
}

const questions: Question[] = [
  {
    question: "Which space speaks to your soul?",
    tagline: "VISUAL INSTINCT",
    options: [
      { label: "Quiet Luxury", style: "Quiet Luxury", image: "/quiz-quiet-luxury.png", subtitle: "Bespoke warmth & understated elegance" },
      { label: "Minimalist", style: "Contemporary Minimalist", image: "/quiz-minimalist.png", subtitle: "Clean lines & pure simplicity" },
      { label: "Organic Modern", style: "Organic Modernism", image: "/quiz-organic.png", subtitle: "Nature woven into every detail" },
      { label: "Heritage", style: "European Heritage", image: "/quiz-heritage.png", subtitle: "Timeless grandeur & opulence" },
    ],
  },
  {
    question: "How should your space feel?",
    tagline: "EMOTIONAL ATMOSPHERE",
    options: [
      { label: "Warm & Tailored", style: "Quiet Luxury", image: "/quiz-quiet-luxury.png", subtitle: "Enveloping comfort, impeccable craft" },
      { label: "Airy & Free", style: "Contemporary Minimalist", image: "/quiz-minimalist.png", subtitle: "Breathing space, zero distractions" },
      { label: "Grounded & Alive", style: "Organic Modernism", image: "/quiz-organic.png", subtitle: "Connected to the earth, full of life" },
      { label: "Grand & Storied", style: "European Heritage", image: "/quiz-heritage.png", subtitle: "Halls of history, walls of wonder" },
    ],
  },
  {
    question: "Pick your ideal material palette:",
    tagline: "TACTILE PREFERENCE",
    options: [
      { label: "Walnut & Brass", style: "Quiet Luxury", image: "/quiz-quiet-luxury.png", subtitle: "Dark walnut, boucle, lime plaster" },
      { label: "Concrete & Glass", style: "Contemporary Minimalist", image: "/quiz-minimalist.png", subtitle: "Polished concrete, steel, leather" },
      { label: "Oak & Linen", style: "Organic Modernism", image: "/quiz-organic.png", subtitle: "Reclaimed oak, terracotta, travertine" },
      { label: "Marble & Velvet", style: "European Heritage", image: "/quiz-heritage.png", subtitle: "Mahogany, gilded gold, crystal" },
    ],
  },
  {
    question: "Your philosophy on decor?",
    tagline: "DESIGN PHILOSOPHY",
    options: [
      { label: "Less, but Exceptional", style: "Quiet Luxury", image: "/quiz-quiet-luxury.png", subtitle: "Fewer, but impossibly refined pieces" },
      { label: "Pure Function", style: "Contemporary Minimalist", image: "/quiz-minimalist.png", subtitle: "Every object earns its place" },
      { label: "Perfectly Imperfect", style: "Organic Modernism", image: "/quiz-organic.png", subtitle: "Wabi-sabi beauty in raw form" },
      { label: "More is More", style: "European Heritage", image: "/quiz-heritage.png", subtitle: "Layered elegance, rich storytelling" },
    ],
  },
];

const resultsMap: Record<string, { name: string; desc: string; image: string }> = {
  "Quiet Luxury": {
    name: "Quiet Luxury",
    desc: "You appreciate the subtle art of understatement. True luxury lies in bespoke craftsmanship, rich textures, and spaces that feel exclusively tailored without ever shouting for attention.",
    image: "/quiz-quiet-luxury.png",
  },
  "Contemporary Minimalist": {
    name: "Contemporary Minimalist",
    desc: "Clarity is your ultimate comfort. You seek highly functional, sleek environments where architectural lines and natural light do all the talking.",
    image: "/quiz-minimalist.png",
  },
  "Organic Modernism": {
    name: "Organic Modernism",
    desc: "You find peace in nature. Your ideal space bridges the indoors and outdoors, utilizing raw woods, soft linens, and biophilic design to create a grounded sanctuary.",
    image: "/quiz-organic.png",
  },
  "European Heritage": {
    name: "European Heritage",
    desc: "You are a romantic with a deep appreciation for history. Grandeur, intricate details, and timeless European opulence define your ultimate living space.",
    image: "/quiz-heritage.png",
  },
};

/* ─── Component ─── */
interface StyleQuizProps {
  onOpenInquiry: (style: string) => void;
}

export default function StyleQuiz({ onOpenInquiry }: StyleQuizProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<{ name: string; desc: string; image: string } | null>(null);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const handleAnswer = (style: string) => {
    const newAnswers = [...answers, style];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const counts = newAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      const topStyle = Object.keys(counts).reduce((a, b) =>
        counts[a] > counts[b] ? a : b
      );
      setQuizResult(resultsMap[topStyle]);
    }
  };

  const resetQuiz = () => {
    setIsStarted(false);
    setQuizResult(null);
    setCurrentStep(0);
    setAnswers([]);
    setHoveredOption(null);
  };

  return (
    <section id="quiz" className="relative py-28 md:py-40 bg-[#fdfbf7] overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8905a]/20 to-transparent" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#c8905a]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">

          {/* ═══════ INTRO SCREEN ═══════ */}
          {!isStarted ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
            >
              {/* Left — Text */}
              <div className="flex-1 text-center lg:text-left">
                <span className="font-sans text-xs font-bold tracking-[0.3em] text-[#c8905a] uppercase block mb-6">
                  Discover Your Sanctuary
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#2b2624] mb-6">
                  The Architecture <br />
                  <span className="text-gold-gradient">Of You.</span>
                </h2>
                <p className="text-[#6b625a] text-sm md:text-base font-light max-w-md leading-relaxed tracking-wider mb-8 mx-auto lg:mx-0">
                  A 4-step visual journey through interiors curated for your unique aesthetic. Simply tap the space that resonates.
                </p>
                <button
                  onClick={() => setIsStarted(true)}
                  className="group flex items-center gap-3 mx-auto lg:mx-0 px-8 py-4 bg-[#2b2624] text-[#fdfbf7] font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-[#c8905a] transition-all duration-300 cursor-pointer shadow-lg"
                >
                  Begin The Experience
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right — Preview Mosaic */}
              <div className="flex-1 w-full max-w-md lg:max-w-lg">
                <div className="grid grid-cols-2 gap-3 aspect-square">
                  {["/quiz-quiet-luxury.png", "/quiz-minimalist.png", "/quiz-organic.png", "/quiz-heritage.png"].map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15, duration: 0.6 }}
                      className="relative rounded-sm overflow-hidden border border-[#c8905a]/10 shadow-md"
                    >
                      <Image src={img} alt="Style preview" fill sizes="200px" className="object-cover hover:scale-110 transition-transform duration-700" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          /* ═══════ QUIZ QUESTIONS ═══════ */
          ) : !quizResult ? (
            <motion.div
              key={`q-${currentStep}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Header Row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-4 h-4 text-[#c8905a]" />
                    <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-[#c8905a] uppercase">
                      {questions[currentStep].tagline}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#2b2624] leading-tight">
                    {questions[currentStep].question}
                  </h3>
                </div>

                {/* Step Counter */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-serif text-5xl font-bold text-[#c8905a]">0{currentStep + 1}</span>
                  <div className="flex flex-col gap-1">
                    <div className="w-12 h-[2px] bg-[#c8905a]" />
                    <span className="text-[10px] font-bold tracking-widest text-[#8a827b] uppercase">of 04</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-[3px] bg-[#c8905a]/10 rounded-full mb-10 overflow-hidden">
                <motion.div
                  className="h-full bg-gold-gradient rounded-full"
                  initial={{ width: `${(currentStep / questions.length) * 100}%` }}
                  animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              {/* Options Grid — Image Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {questions[currentStep].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    onClick={() => handleAnswer(opt.style)}
                    onMouseEnter={() => setHoveredOption(i)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className="group relative aspect-[3/4] rounded-sm overflow-hidden border border-[#c8905a]/15 cursor-pointer hover:border-[#c8905a]/60 transition-all duration-500 shadow-md hover:shadow-xl"
                  >
                    {/* Image */}
                    <Image
                      src={opt.image}
                      alt={opt.label}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className={`object-cover transition-all duration-700 ${
                        hoveredOption === i ? "scale-110 brightness-100" : "scale-100 brightness-[0.85]"
                      }`}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 transition-all duration-500 ${
                      hoveredOption === i
                        ? "bg-gradient-to-t from-[#2b2624]/90 via-[#2b2624]/30 to-transparent"
                        : "bg-gradient-to-t from-[#2b2624]/80 via-[#2b2624]/40 to-[#2b2624]/10"
                    }`} />

                    {/* Option Label */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <span className="block font-sans text-[9px] font-bold tracking-[0.25em] text-[#c8905a] uppercase mb-1.5">
                        Option {String.fromCharCode(65 + i)}
                      </span>
                      <span className="block font-serif text-lg md:text-xl font-bold text-white mb-1">
                        {opt.label}
                      </span>
                      <span className={`block text-[11px] text-white/60 font-light tracking-wide transition-all duration-300 ${
                        hoveredOption === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                      }`}>
                        {opt.subtitle}
                      </span>
                    </div>

                    {/* Hover Arrow */}
                    <div className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-all duration-300 ${
                      hoveredOption === i ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}>
                      <ChevronRight className="w-4 h-4 text-[#2b2624]" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

          /* ═══════ RESULT REVEAL ═══════ */
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
            >
              {/* Left — Result Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 w-full max-w-md lg:max-w-lg"
              >
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[#c8905a]/30 shadow-2xl">
                  <Image src={quizResult.image} alt={quizResult.name} fill sizes="500px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2b2624]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-4 py-2 bg-[#c8905a]/90 text-white text-[10px] font-bold tracking-[0.3em] uppercase rounded-full">
                      Your Match
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right — Result Text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-1 text-center lg:text-left"
              >
                <span className="font-sans text-xs font-bold tracking-[0.3em] text-[#c8905a] uppercase block mb-4">
                  Your Design Language Is
                </span>
                <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#2b2624] mb-6 leading-tight">
                  {quizResult.name}
                </h3>
                <div className="w-16 h-[2px] bg-gold-gradient mb-6 mx-auto lg:mx-0" />
                <p className="text-[#6b625a] text-sm md:text-base font-light max-w-lg leading-relaxed tracking-wider mb-10 mx-auto lg:mx-0">
                  {quizResult.desc}
                </p>

                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                  <button
                    onClick={() => onOpenInquiry(quizResult.name)}
                    className="group flex items-center gap-2 px-8 py-4 bg-[#2b2624] text-[#fdfbf7] font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-[#c8905a] transition-all cursor-pointer shadow-lg"
                  >
                    Consult On This Style
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 px-6 py-4 border border-[#2b2624]/20 text-[#2b2624] hover:border-[#c8905a] hover:text-[#c8905a] font-bold uppercase tracking-widest text-xs rounded-sm transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retake
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
