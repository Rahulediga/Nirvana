"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import ClipPathReveal from "@/components/ClipPathReveal";
import ProjectShowcase from "@/components/ProjectShowcase";
import StyleQuiz from "@/components/StyleQuiz";
import Testimonials from "@/components/Testimonials";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import LogoReveal from "@/components/LogoReveal";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("Quiet Luxury");

  const handleOpenInquiry = (initialStyle?: string) => {
    if (initialStyle) {
      setSelectedStyle(initialStyle);
    }
    setIsInquiryOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Logo Reveal Intro Splash */}
      {showIntro && (
        <LogoReveal onComplete={() => setShowIntro(false)} />
      )}

      <div className="relative w-full min-h-screen flex flex-col bg-[#031f18] text-[#f4f3ed] font-sans selection:bg-[#d4af37]/30 selection:text-[#f4f3ed]">
        {/* Sticky morphing navigation header */}
        <Header
          onOpenInquiry={() => handleOpenInquiry("Quiet Luxury")}
          onScrollToSection={handleScrollToSection}
        />

        {/* Main Sections */}
        <main className="flex-1">
          {/* Parallax Hero Intro */}
          <Hero
            onOpenInquiry={() => handleOpenInquiry("Quiet Luxury")}
            onScrollToSection={handleScrollToSection}
          />

          {/* Philosophy and Counting metrics */}
          <Philosophy />

          {/* Cinematic Clip-Path Scroll Reveal */}
          <ClipPathReveal />

          {/* Horizontal Category Showcase */}
          <ProjectShowcase />

          {/* Interactive Aesthetic Style Quiz */}
          <StyleQuiz onOpenInquiry={handleOpenInquiry} />

          {/* Client Testimonials — Light contrast section */}
          <Testimonials />
        </main>

        {/* Inquiry Form Drawer (Estimate Calculator & Consultation Bookings) */}
        <InquiryForm
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
          selectedStyle={selectedStyle}
        />

        {/* Brand Footer */}
        <Footer onScrollToSection={handleScrollToSection} />
      </div>
    </>
  );
}
