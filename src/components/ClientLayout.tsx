"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import IntroAnimation from "@/components/IntroAnimation";
import ParticleBackground from "@/components/ParticleBackground";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <IntroAnimation onComplete={() => setShowContent(true)} />
      
      {showContent && (
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