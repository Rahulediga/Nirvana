"use client";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  return (
    <footer className="relative bg-[#062a1e] text-[#fdfbf7] border-t border-[#c8905a]/15 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 select-text">
        {/* Brand Info */}
        <div className="flex flex-col gap-6 md:col-span-2">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onScrollToSection("home")}>
            <div className="relative w-12 h-12 overflow-hidden rounded-full border border-[#c8905a]/30">
              <Image
                src="/logo.jpg"
                alt="Nirvana Logo"
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-[#fdfbf7] group-hover:text-[#c8905a] transition-colors duration-300">
                NIRVANA
              </span>
              <span className="text-[10px] font-sans tracking-[0.3em] text-[#8a827b] uppercase">
                Builders & Developers
              </span>
            </div>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#8a827b] font-light leading-relaxed tracking-wider">
            Premium constructions, developers, and luxury interior design masters. Crafting high-fidelity residential and commercial sanctuaries tailored to elite lifestyles.
          </p>
          <div className="flex items-center gap-4 text-[#8a827b]">
            <a href="#" className="hover:text-[#c8905a] transition-colors duration-300" aria-label="Instagram">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="hover:text-[#c8905a] transition-colors duration-300" aria-label="Facebook">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-5">
          <h4 className="font-serif text-sm font-bold tracking-[0.2em] text-[#c8905a] uppercase">
            EXPLORE
          </h4>
          <nav className="flex flex-col gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-[#8a827b]">
            <button
              onClick={() => onScrollToSection("home")}
              className="text-left hover:text-[#fdfbf7] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onScrollToSection("philosophy")}
              className="text-left hover:text-[#fdfbf7] transition-colors cursor-pointer"
            >
              Philosophy
            </button>
            <button
              onClick={() => onScrollToSection("portfolio")}
              className="text-left hover:text-[#fdfbf7] transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <button
              onClick={() => onScrollToSection("quiz")}
              className="text-left hover:text-[#fdfbf7] transition-colors cursor-pointer"
            >
              Style Quiz
            </button>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-5">
          <h4 className="font-serif text-sm font-bold tracking-[0.2em] text-[#c8905a] uppercase">
            OFFICES
          </h4>
          <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#8a827b] font-light leading-relaxed tracking-wider">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#c8905a] shrink-0 mt-0.5" />
              <span>
                Nirvana Crest, Suite 402, <br />
                80 Feet Road, Indiranagar, <br />
                Bangalore, Karnataka - 560038
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#c8905a] shrink-0" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#c8905a] shrink-0" />
              <span>concierge@nirvanabuilders.in</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-[#c8905a]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center select-text">
        <span className="text-[10px] font-sans tracking-widest text-[#8a827b]">
          &copy; {new Date().getFullYear()} NIRVANA BUILDERS & DEVELOPERS. ALL RIGHTS RESERVED.
        </span>
        <span className="text-[10px] font-sans tracking-widest text-[#8a827b] flex items-center gap-1">
          <span>DESIGNED BY</span>
          <a href="#" className="text-[#c8905a] hover:underline">
            ANTIGRAVITY DESIGN LABS
          </a>
        </span>
      </div>
    </footer>
  );
}
