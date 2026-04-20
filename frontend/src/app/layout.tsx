// src/app/layout.tsx
import './globals.css';
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aryan Gulhane — Builder & Tinkerer",
  description: "Hardware tinkerer, electronics enthusiast, and B.Tech CS student at MIT ADT. Building circuits, drones, and embedded systems.",
  keywords: ["Aryan Gulhane", "electronics", "embedded systems", "hardware", "ESP32", "Arduino", "drone", "portfolio"],
  authors: [{ name: "Aryan Gulhane" }],
  openGraph: {
    title: "Aryan Gulhane — Builder & Tinkerer",
    description: "Hardware tinkerer, electronics enthusiast, and B.Tech CS student at MIT ADT.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <ThemeProvider>
          <ClientLayout>
            <main className="relative z-10">
              {children}
            </main>
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}