"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  mode: 'light' | 'dark' | 'cyber' | 'neon' | 'matrix' | 'synthwave' | 'retro';
  animation: {
    primary: string;
    secondary: string;
    accent: string;
  };
  effects: {
    glow: string;
    shadow: string;
    border: string;
  };
};

const themes: Record<string, Theme> = {
  light: {
    primary: '#ffffff',
    secondary: '#f1f5f9',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#000000',
    mode: 'light',
    animation: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      accent: '#93c5fd',
    },
    effects: {
      glow: '0 0 10px rgba(59, 130, 246, 0.5)',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
    },
  },
  dark: {
    primary: '#0a0a0a',
    secondary: '#1a1a1a',
    accent: '#3b82f6',
    background: '#0a0a0a',
    text: '#ffffff',
    mode: 'dark',
    animation: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      accent: '#93c5fd',
    },
    effects: {
      glow: '0 0 10px rgba(59, 130, 246, 0.5)',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
    },
  },
  cyber: {
    primary: '#0f172a',
    secondary: '#1e293b',
    accent: '#06b6d4',
    background: '#0f172a',
    text: '#e2e8f0',
    mode: 'cyber',
    animation: {
      primary: '#06b6d4',
      secondary: '#22d3ee',
      accent: '#67e8f9',
    },
    effects: {
      glow: '0 0 15px rgba(6, 182, 212, 0.6)',
      shadow: '0 4px 6px -1px rgba(6, 182, 212, 0.2)',
      border: '1px solid rgba(6, 182, 212, 0.3)',
    },
  },
  neon: {
    primary: '#000000',
    secondary: '#1a1a1a',
    accent: '#ff00ff',
    background: '#000000',
    text: '#ffffff',
    mode: 'neon',
    animation: {
      primary: '#ff00ff',
      secondary: '#ff69b4',
      accent: '#ff1493',
    },
    effects: {
      glow: '0 0 20px rgba(255, 0, 255, 0.7)',
      shadow: '0 4px 6px -1px rgba(255, 0, 255, 0.3)',
      border: '1px solid rgba(255, 0, 255, 0.4)',
    },
  },
  matrix: {
    primary: '#000000',
    secondary: '#001100',
    accent: '#00ff00',
    background: '#000000',
    text: '#00ff00',
    mode: 'matrix',
    animation: {
      primary: '#00ff00',
      secondary: '#00cc00',
      accent: '#009900',
    },
    effects: {
      glow: '0 0 15px rgba(0, 255, 0, 0.6)',
      shadow: '0 4px 6px -1px rgba(0, 255, 0, 0.2)',
      border: '1px solid rgba(0, 255, 0, 0.3)',
    },
  },
  synthwave: {
    primary: '#2d1b69',
    secondary: '#1a1a2e',
    accent: '#ff71ce',
    background: '#2d1b69',
    text: '#ff71ce',
    mode: 'synthwave',
    animation: {
      primary: '#ff71ce',
      secondary: '#01cdfe',
      accent: '#05ffa1',
    },
    effects: {
      glow: '0 0 20px rgba(255, 113, 206, 0.7)',
      shadow: '0 4px 6px -1px rgba(255, 113, 206, 0.3)',
      border: '1px solid rgba(255, 113, 206, 0.4)',
    },
  },
  retro: {
    primary: '#2b2b2b',
    secondary: '#3b3b3b',
    accent: '#ff6b6b',
    background: '#2b2b2b',
    text: '#ffffff',
    mode: 'retro',
    animation: {
      primary: '#ff6b6b',
      secondary: '#4ecdc4',
      accent: '#ffe66d',
    },
    effects: {
      glow: '0 0 15px rgba(255, 107, 107, 0.6)',
      shadow: '0 4px 6px -1px rgba(255, 107, 107, 0.2)',
      border: '1px solid rgba(255, 107, 107, 0.3)',
    },
  },
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (mode: Theme['mode']) => void;
  isAnimating: boolean;
  animationState: 'idle' | 'hover' | 'active';
  setAnimationState: (state: 'idle' | 'hover' | 'active') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme['mode'];
      return themes[savedTheme] || themes.dark;
    }
    return themes.dark;
  });
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'hover' | 'active'>('idle');

  const setTheme = (mode: Theme['mode']) => {
    if (!themes[mode]) return;
    
    setIsAnimating(true);
    
    // Add transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    document.body.appendChild(overlay);
    
    // Trigger reflow
    overlay.offsetHeight;
    
    // Activate overlay
    overlay.classList.add('active');
    
    setTimeout(() => {
      setThemeState(themes[mode]);
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', mode);
      }
      
      // Remove overlay after transition
      setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
          overlay.remove();
          setIsAnimating(false);
        }, 300);
      }, 300);
    }, 300);
  };

  useEffect(() => {
    if (!theme) return;

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme.mode);
    
    // Apply theme colors
    const applyThemeColor = (property: string, value: string) => {
      document.documentElement.style.setProperty(property, value);
      if (value.startsWith('#')) {
        const rgb = value.replace('#', '').match(/.{2}/g)?.join(', ') || '';
        document.documentElement.style.setProperty(`${property}-rgb`, rgb);
      }
    };

    // Apply all theme colors
    applyThemeColor('--primary', theme.primary);
    applyThemeColor('--secondary', theme.secondary);
    applyThemeColor('--accent', theme.accent);
    applyThemeColor('--background', theme.background);
    applyThemeColor('--foreground', theme.text);

    // Apply theme effects
    document.documentElement.style.setProperty('--glow', theme.effects.glow);
    document.documentElement.style.setProperty('--shadow', theme.effects.shadow);
    document.documentElement.style.setProperty('--border', theme.effects.border);

    // Apply background color to body
    document.body.style.backgroundColor = theme.background;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      isAnimating, 
      animationState, 
      setAnimationState 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 