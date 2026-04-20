// src/components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp, FaInstagram } from "react-icons/fa";

const navItems = [
  { name: 'Projects', path: '/projects' },
  { name: 'Lab', path: '/lab' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const socialLinks = [
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/Aryangulhane' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/aryan-gulhane' },
  { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com/AryanGulhane3' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/aryangulhane21' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mt-20 border-t border-border py-12 px-6"
    >
      {/* Back to Top */}
      <motion.button
        onClick={handleScrollTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="absolute -top-5 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-sm"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </motion.button>

      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 transition-all group-hover:bg-primary">
              <span className="font-mono text-xs font-bold text-primary transition-colors group-hover:text-primary-foreground">AG</span>
            </div>
            <span className="font-heading text-sm font-semibold text-foreground">Aryan Gulhane</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-sm font-mono text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <hr className="my-8 border-border/50" />

        <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
          <p className="text-xs text-muted-foreground font-mono">
            © {year} Aryan Gulhane — Built with curiosity & a soldering iron.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                whileHover={{ y: -2, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-lg text-muted-foreground transition-colors hover:text-primary"
              >
                <social.icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}