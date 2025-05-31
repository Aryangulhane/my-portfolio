// 💡 Main layout file with Navbar & Footer
// src/app/layout.tsx
import './globals.css'
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Welcome to my portfolio website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground scroll-smooth`}>
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}






