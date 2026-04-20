// src/components/IntroAnimation.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const containerVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: {
    clipPath: "inset(50% 0 50% 0)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [showIntro, setShowIntro] = useState(true);
  const [showText, setShowText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 1200);
    const exitTriggerTimer = setTimeout(() => setIsExiting(true), 3800);
    const mainTimer = setTimeout(() => setShowIntro(false), 4400);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTriggerTimer);
      clearTimeout(mainTimer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {showIntro && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Background rings */}
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-[400px] w-[400px]">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/15"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: 1 + i * 0.35,
                    opacity: [0, 0.25, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Logo */}
            <AGLogo isExiting={isExiting} />

            {/* Loading text */}
            <AnimatePresence>
              {showText && !isExiting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase"
                >
                  <TypeAnimation
                    sequence={[
                      "Powering up...",
                      800,
                      "Initializing circuits...",
                      800,
                      "Ready to build.",
                    ]}
                    wrapper="span"
                    speed={70}
                    cursor={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Animated AG Logo ---
const AGLogo = ({ isExiting }: { isExiting: boolean }) => {
  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { type: "spring", duration: 1.2, bounce: 0 }, opacity: { duration: 0.1 } },
    },
    exit: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 120 120"
      initial="hidden"
      animate={isExiting ? "exit" : "visible"}
      className="stroke-primary drop-shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]"
    >
      <motion.path
        d="M 30 90 L 60 30 L 90 90"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
      />
      <motion.path
        d="M 42 72 L 78 72"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariants}
      />
    </motion.svg>
  );
};