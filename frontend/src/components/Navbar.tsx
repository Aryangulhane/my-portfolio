// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from '@/context/ThemeContext';
import { FiSun, FiMoon } from "react-icons/fi";

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Lab', path: '/lab' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl mx-4 mt-3 rounded-2xl border border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:border-primary">
              <span className="font-mono text-sm font-bold text-primary transition-colors group-hover:text-primary-foreground">AG</span>
            </div>
            <span className="hidden sm:block font-heading text-sm font-semibold text-foreground tracking-tight">
              Aryan Gulhane
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.path} path={item.path} currentPath={pathname}>
                {item.name}
              </NavLink>
            ))}
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <MenuButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPath={pathname}
      />
    </>
  );
}

// --- Helper Components ---

function NavLink({ path, currentPath, children }: { path: string, currentPath: string, children: React.ReactNode }) {
  const isActive = path === currentPath;
  return (
    <Link
      href={path}
      className={`relative rounded-lg px-3 py-2 text-sm font-medium font-mono transition-colors ${
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="active-nav-link"
          className="absolute inset-x-1 -bottom-px h-0.5 bg-primary rounded-full"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}

function MenuButton({ isOpen, onClick }: { isOpen: boolean, onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground"
      aria-label="Toggle menu"
    >
      <motion.span
        className="absolute block h-0.5 w-4 bg-current"
        animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute block h-0.5 w-4 bg-current"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute block h-0.5 w-4 bg-current"
        animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}

function MobileMenu({ isOpen, onClose, currentPath }: { isOpen: boolean, onClose: () => void, currentPath: string }) {
  const menuVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 }
    },
    closed: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" }
    }
  };
  const itemVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: 20, opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-background/95 backdrop-blur-xl"
        >
          {navItems.map((item) => (
            <motion.div key={item.path} variants={itemVariants}>
              <Link
                href={item.path}
                onClick={onClose}
                className={`text-2xl font-heading font-semibold ${
                  currentPath === item.path ? 'text-primary' : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme.mode === 'dark' ? 'light' : 'dark';

  return (
    <motion.button
      onClick={() => setTheme(nextTheme)}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface hover:border-primary/50 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme.mode}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-sm"
        >
          {theme.mode === 'dark' ? <FiSun /> : <FiMoon />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}