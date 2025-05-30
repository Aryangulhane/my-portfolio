"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import IntroAnimation from "@/components/IntroAnimation";
import ParticleBackground from "@/components/ParticleBackground";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith('/blog');

  return (
    <>
      {!isBlogPage && <IntroAnimation onComplete={() => setShowContent(true)} />}
      
      {(showContent || isBlogPage) && (
        <>
          <ParticleBackground />
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <ThemeSwitcher />
        </>
      )}
    </>
  );
} 