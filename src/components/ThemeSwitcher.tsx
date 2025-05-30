"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const themes = [
  { name: 'light', label: 'Light' },
  { name: 'dark', label: 'Dark' },
  { name: 'cyber', label: 'Cyber' },
  { name: 'neon', label: 'Neon' },
  { name: 'matrix', label: 'Matrix' },
  { name: 'synthwave', label: 'Synthwave' },
  { name: 'retro', label: 'Retro' }
] as const;

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, isAnimating } = useTheme();

  const handleThemeChange = (themeName: typeof themes[number]['name']) => {
    if (themeName === theme.mode) return;
    setTheme(themeName);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 w-48 glass rounded-lg p-2 shadow-lg"
          >
            {themes.map((themeOption) => (
              <motion.button
                key={themeOption.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleThemeChange(themeOption.name)}
                className={`w-full text-left px-4 py-2 rounded-md mb-1 last:mb-0 transition-all duration-300 ${
                  theme.mode === themeOption.name
                    ? 'bg-accent/20 text-accent'
                    : 'hover:bg-accent/10'
                }`}
                disabled={isAnimating}
              >
                {themeOption.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 glass rounded-full flex items-center justify-center shadow-lg"
        disabled={isAnimating}
      >
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isAnimating ? 0.8 : 1
          }}
          transition={{ duration: 0.3 }}
          className="text-2xl"
        >
          {isOpen ? '×' : '🎨'}
        </motion.div>
      </motion.button>
    </div>
  );
} 