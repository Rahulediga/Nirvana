"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Calculator, CheckCircle2, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

interface InquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStyle?: string;
}

export default function InquiryForm({ isOpen, onClose, selectedStyle = "Quiet Luxury" }: InquiryFormProps) {
  const [activeMode, setActiveMode] = useState<"book" | "estimate">("book");
  const [step, setStep] = useState(1);

  // Book Consultation State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [projectType, setProjectType] = useState("Full Home");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Estimate State
  const [sqft, setSqft] = useState<number>(1200);
  const [stylePreference, setStylePreference] = useState(selectedStyle);
  const [roomCount, setRoomCount] = useState<number>(2);
  const [estimatedCostRange, setEstimatedCostRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    if (selectedStyle) setStylePreference(selectedStyle);
  }, [selectedStyle]);

  useEffect(() => {
    let pricePerSqft = 150;
    switch (stylePreference) {
      case "Quiet Luxury": pricePerSqft = 350; break;
      case "Contemporary Minimalist": pricePerSqft = 300; break;
      case "Organic Modernism": pricePerSqft = 250; break;
      case "European Heritage": pricePerSqft = 400; break;
      case "Japandi": pricePerSqft = 280; break;
    }
    const baseCost = sqft * pricePerSqft;
    const roomPremium = roomCount * 25000;
    const totalCost = baseCost + roomPremium;
    setEstimatedCostRange({
      min: Math.round(totalCost * 0.9),
      max: Math.round(totalCost * 1.15),
    });
  }, [sqft, stylePreference, roomCount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setName(""); setEmail(""); setPhone(""); setDate(""); setTime(""); setMessage("");
      onClose();
    }, 4000);
  };

  const projectTypes = ["Full Home", "Single Room", "Commercial", "Renovation"];

  // Framer Motion variants for sleek step transitions
  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Deep Blur Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-xl"
          />

          {/* Central Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-5xl h-auto md:h-[75vh] flex flex-col md:flex-row bg-[#16161f] rounded-2xl overflow-hidden shadow-2xl border border-[#c9a55a]/20 z-10"
          >
            {/* Left Panel: Imagery & Vibe (Hidden on small mobile) */}
            <div className="hidden md:flex md:w-5/12 relative flex-col justify-between p-10 overflow-hidden border-r border-[#c9a55a]/10">
              <Image
                src={activeMode === "book" ? "/images/quiet_luxury.png" : "/images/contemporary_minimalist.png"}
                alt="Luxury Interior"
                fill
                className="object-cover opacity-40 transition-opacity duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/20 to-[#0a0a0f]/90" />

              <div className="relative z-10">
                <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-[#c9a55a] uppercase">
                  Nirvana Experience
                </span>
                <h3 className="font-serif text-3xl font-bold tracking-wide text-[#f0ece4] mt-4 leading-snug">
                  {activeMode === "book"
                    ? "Begin the journey to your ultimate sanctuary."
                    : "Plan the investment for your bespoke masterpiece."}
                </h3>
              </div>

              <div className="relative z-10 flex items-center gap-4 text-[#9a9590] text-sm font-light">
                <div className="w-12 h-[1px] bg-[#c9a55a]" />
                <p>Architectural Precision & Quiet Luxury</p>
              </div>
            </div>

            {/* Right Panel: Interactive Form */}
            <div className="w-full md:w-7/12 flex flex-col h-[70vh] md:h-full bg-[#0d0d14] relative">
              {/* Header & Controls */}
              <div className="flex items-center justify-between p-6 border-b border-[#c9a55a]/10">
                <div className="flex bg-[#16161f] p-1 rounded-lg border border-[#c9a55a]/10">
                  <button
                    onClick={() => { setActiveMode("book"); setStep(1); }}
                    className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${activeMode === "book" ? "bg-[#c9a55a]/10 text-[#c9a55a]" : "text-[#9a9590] hover:text-[#f0ece4]"
                      }`}
                  >
                    Consultation
                  </button>
                  <button
                    onClick={() => setActiveMode("estimate")}
                    className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${activeMode === "estimate" ? "bg-[#c9a55a]/10 text-[#c9a55a]" : "text-[#9a9590] hover:text-[#f0ece4]"
                      }`}
                  >
                    Calculator
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-[#9a9590] hover:text-[#c9a55a] hover:bg-[#c9a55a]/10 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Success Overlay — covers entire right panel */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[#0d0d14] z-50"
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#c9a55a] mb-6" />
                    <h4 className="font-serif text-3xl font-bold text-[#f0ece4] mb-4">Request Received</h4>
                    <p className="text-[#9a9590] font-light max-w-sm leading-relaxed">
                      Thank you, {name || "Guest"}. Our lead architect will review your details and connect with you shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Content Area */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 relative scrollbar-none">
                <AnimatePresence mode="wait">
                  {/* === BOOKING WIZARD === */}
                  {activeMode === "book" && !isSubmitted && (
                    <motion.div key="book" initial="hidden" animate="visible" exit="exit" variants={stepVariants} className="h-full flex flex-col">

                      {/* Progress Bar */}
                      <div className="w-full h-1 bg-[#16161f] rounded-full mb-8 overflow-hidden">
                        <motion.div
                          className="h-full bg-gold-gradient"
                          initial={{ width: `${((step - 1) / 3) * 100}%` }}
                          animate={{ width: `${(step / 3) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      {step === 1 && (
                        <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-6 flex-1">
                          <div>
                            <h3 className="font-serif text-2xl font-bold text-[#f0ece4] mb-2">Let's get acquainted.</h3>
                            <p className="text-[#9a9590] font-light text-sm">How should we address you?</p>
                          </div>
                          <div className="relative group">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your Full Name"
                              className="w-full bg-transparent border-b-2 border-[#c9a55a]/20 focus:border-[#c9a55a] text-xl text-[#f0ece4] placeholder:text-[#9a9590]/40 py-4 outline-none transition-all"
                            />
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-6 flex-1">
                          <div>
                            <h3 className="font-serif text-2xl font-bold text-[#f0ece4] mb-2">Welcome, {name.split(' ')[0] || "there"}.</h3>
                            <p className="text-[#9a9590] font-light text-sm">What type of space are we crafting?</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {projectTypes.map((type) => (
                              <button
                                key={type}
                                onClick={() => setProjectType(type)}
                                className={`p-4 rounded-xl border text-left transition-all ${projectType === type
                                    ? "bg-[#c9a55a]/10 border-[#c9a55a] text-[#c9a55a]"
                                    : "bg-[#16161f] border-[#c9a55a]/10 text-[#9a9590] hover:border-[#c9a55a]/40"
                                  }`}
                              >
                                <span className="font-sans font-bold uppercase tracking-wider text-xs">{type}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-6 flex-1">
                          <div>
                            <h3 className="font-serif text-2xl font-bold text-[#f0ece4] mb-2">The Final Details</h3>
                            <p className="text-[#9a9590] font-light text-sm">When and how can our concierge reach you?</p>
                          </div>
                          <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-[#16161f] border border-[#c9a55a]/20 focus:border-[#c9a55a] rounded-lg text-base text-[#f0ece4] p-4 outline-none transition-all [color-scheme:dark]"
                              />
                              <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-[#16161f] border border-[#c9a55a]/20 focus:border-[#c9a55a] rounded-lg text-base text-[#f0ece4] p-4 outline-none transition-all [color-scheme:dark]"
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full bg-[#16161f] border border-[#c9a55a]/20 focus:border-[#c9a55a] rounded-lg text-base text-[#f0ece4] p-4 outline-none transition-all"
                              />
                              <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone Number *"
                                className="w-full bg-[#16161f] border border-[#c9a55a]/20 focus:border-[#c9a55a] rounded-lg text-base text-[#f0ece4] p-4 outline-none transition-all"
                              />
                            </div>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Any specific visions or requirements? (Optional)"
                              rows={3}
                              className="w-full bg-[#16161f] border border-[#c9a55a]/20 focus:border-[#c9a55a] rounded-lg text-base text-[#f0ece4] p-4 outline-none transition-all resize-none"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Navigation Footer */}
                      <div className="flex items-center justify-between pt-6 mt-auto">
                        {step > 1 ? (
                          <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-[#9a9590] hover:text-[#f0ece4] transition-colors font-bold uppercase tracking-wider text-xs">
                            <ArrowLeft className="w-4 h-4" /> Back
                          </button>
                        ) : <div />}

                        {step < 3 ? (
                          <button
                            onClick={() => setStep(step + 1)}
                            disabled={step === 1 && !name.trim()}
                            className="flex items-center gap-2 px-6 py-3 bg-[#c9a55a] text-[#0a0a0f] rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#d4af37] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={handleSubmit}
                            disabled={!phone.trim()}
                            className="flex items-center gap-2 px-8 py-3 bg-gold-gradient shadow-[0_0_20px_rgba(201,165,90,0.3)] text-[#0a0a0f] rounded-lg font-bold uppercase tracking-wider text-xs hover:shadow-[0_0_30px_rgba(201,165,90,0.5)] disabled:opacity-50 transition-all"
                          >
                            Submit Inquiry
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* === COST ESTIMATOR === */}
                  {activeMode === "estimate" && !isSubmitted && (
                    <motion.div key="estimate" initial="hidden" animate="visible" exit="exit" variants={stepVariants} className="flex flex-col gap-8 h-full">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-[#f0ece4] mb-2">Investment Calculator</h3>
                        <p className="text-[#9a9590] font-light text-sm">Configure your project to view a preliminary estimate.</p>
                      </div>

                      <div className="flex flex-col gap-6 flex-1">
                        {/* Style Select */}
                        <div className="flex flex-col gap-3">
                          <label className="text-[10px] font-sans uppercase tracking-widest text-[#9a9590]">Design Language</label>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                            {["Quiet Luxury", "Contemporary Minimalist", "Organic Modernism", "European Heritage", "Japandi"].map(style => (
                              <button
                                key={style}
                                onClick={() => setStylePreference(style)}
                                className={`p-3 rounded-lg border text-xs font-bold text-center transition-all ${stylePreference === style
                                    ? "bg-[#c9a55a]/10 border-[#c9a55a] text-[#c9a55a]"
                                    : "bg-[#16161f] border-[#c9a55a]/10 text-[#9a9590] hover:border-[#c9a55a]/40"
                                  }`}
                              >
                                {style}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Slider */}
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between text-xs font-bold text-[#9a9590] uppercase tracking-widest">
                            <span>Space Size</span>
                            <span className="text-[#c9a55a]">{sqft} Sq.Ft</span>
                          </div>
                          <input
                            type="range" min="400" max="8000" step="100" value={sqft}
                            onChange={(e) => setSqft(Number(e.target.value))}
                            className="w-full h-1.5 bg-[#16161f] rounded-lg appearance-none cursor-pointer accent-[#c9a55a]"
                          />
                        </div>

                        {/* Rooms */}
                        <div className="flex flex-col gap-3">
                          <label className="text-[10px] font-sans uppercase tracking-widest text-[#9a9590]">Bespoke Rooms</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(num => (
                              <button
                                key={num} onClick={() => setRoomCount(num)}
                                className={`w-12 h-12 rounded-lg border flex items-center justify-center text-sm font-bold transition-all ${roomCount === num ? "bg-[#c9a55a] text-[#0a0a0f] border-[#c9a55a]" : "bg-[#16161f] border-[#c9a55a]/10 text-[#9a9590]"
                                  }`}
                              >
                                {num}{num === 5 ? "+" : ""}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Result Box */}
                      <div className="mt-auto p-6 rounded-xl border border-[#c9a55a]/30 bg-[#c9a55a]/5 relative overflow-hidden min-h-[120px]">
                        <div className="absolute top-0 right-0 p-2 bg-[#c9a55a]/20 rounded-bl-xl">
                          <Sparkles className="w-3 h-3 text-[#c9a55a]" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a9590] block mb-2">Estimated Range</span>
                        <div className="font-serif text-3xl font-bold text-[#c9a55a]">
                          {estimatedCostRange.min > 0 ? (
                            <>
                              ₹{estimatedCostRange.min.toLocaleString("en-IN")} <span className="text-[#9a9590] font-sans text-xl mx-2">—</span> ₹{estimatedCostRange.max.toLocaleString("en-IN")}
                            </>
                          ) : (
                            <span className="text-xl text-[#9a9590] animate-pulse">Calculating...</span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => { setActiveMode("book"); setStep(1); }}
                        className="w-full py-4 border-2 border-[#c9a55a] text-[#c9a55a] hover:bg-[#c9a55a] hover:text-[#0a0a0f] rounded-lg font-bold uppercase tracking-widest text-xs transition-all"
                      >
                        Proceed to Consultation
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
