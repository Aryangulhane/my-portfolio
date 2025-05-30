"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [showIntro, setShowIntro] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      setTimeout(onComplete, 1000); // Wait for exit animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="absolute inset-0 matrix-rain opacity-10" />
          </div>

          <div className="relative z-10 text-center">
            {/* Name animation */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-wider">
                <span className="inline-block">
                  {Array.from("ARYAN").map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block text-accent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </motion.div>

            {/* Tagline animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wider">
                <span className="inline-block">
                  {Array.from("Crafting Digital Experiences").map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 2 + index * 0.05,
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            >
              <motion.div
                className="h-full bg-accent"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 