"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, Phone } from "lucide-react";

interface HeaderProps {
  onOpenInquiry: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ onOpenInquiry, onScrollToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Philosophy", id: "philosophy" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Style Quiz", id: "quiz" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "py-3 sm:py-4 bg-[#031f18]/80 backdrop-blur-xl border-b border-[#d4af37]/15 shadow-lg shadow-black/25"
          : "py-4 sm:py-6 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => onScrollToSection("home")}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded-full border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-all duration-300">
              <Image
                src="/logo.jpg"
                alt="Nirvana Logo"
                fill
                sizes="40px"
                className="object-cover scale-110 group-hover:scale-125 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold tracking-[0.2em] text-[#f4f3ed] group-hover:text-[#d4af37] transition-colors duration-300">
                NIRVANA
              </span>
              <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.3em] text-[#b5b0a3]">
                BUILDERS & INTERIORS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-sm tracking-widest uppercase">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onScrollToSection(item.id)}
                className="relative py-2 text-[#b5b0a3] hover:text-[#f4f3ed] transition-colors duration-300 cursor-pointer group text-xs font-semibold"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-gradient origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="header-cta-consultation"
              onClick={onOpenInquiry}
              className="flex items-center gap-2 px-5 py-2.5 bg-gold-gradient text-[#031f18] text-xs font-bold uppercase tracking-wider rounded-sm hover:opacity-90 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#f4f3ed] hover:text-[#d4af37] transition-colors duration-300 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-[#031f18] pt-24 px-8 flex flex-col justify-between pb-16"
          >
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onScrollToSection(item.id);
                  }}
                  className="text-left font-serif text-2xl tracking-wider text-[#b5b0a3] hover:text-[#d4af37] py-3 border-b border-[#d4af37]/10 cursor-pointer"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-4 bg-gold-gradient text-[#031f18] font-bold text-center uppercase tracking-wider rounded-sm cursor-pointer hover:opacity-90 transition-opacity"
              >
                Book Consultation
              </button>
              <div className="text-center text-xs text-[#b5b0a3] flex items-center justify-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 98765 43210</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
