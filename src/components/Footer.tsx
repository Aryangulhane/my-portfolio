// src/components/Footer.tsx
"use client"; // 👈 This is necessary!

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full py-6 px-6 bg-white text-center text-sm text-gray-500 border-t mt-10">
      © {year ?? "----"} Aryan Gulhane. Dream. Build. Dominate.
    </footer>
  );
}
