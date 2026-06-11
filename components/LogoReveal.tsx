"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoReveal({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleVideoEnd = useCallback(() => {
    setIsFadingOut(true);
    // Wait for fade-out animation to finish, then notify parent
    setTimeout(() => {
      onComplete();
    }, 800);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    handleVideoEnd();
  }, [handleVideoEnd]);

  return (
    <AnimatePresence>
      {!isFadingOut ? (
        <motion.div
          key="logo-reveal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center cursor-pointer"
          onClick={handleSkip}
        >
          <video
            ref={videoRef}
            src="/videos/Logo Reveal video.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-contain"
          />

          {/* Skip hint */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="absolute bottom-8 right-8 px-5 py-2.5 text-white/50 hover:text-white text-[10px] font-sans font-bold tracking-[0.3em] uppercase border border-white/15 hover:border-white/40 rounded-full backdrop-blur-sm transition-all duration-300 cursor-pointer"
          >
            Skip Intro
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="logo-fade"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-black"
        />
      )}
    </AnimatePresence>
  );
}
