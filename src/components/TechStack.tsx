"use client";

import { motion } from "framer-motion";
import Image from 'next/image';

const techStack = [
  { name: 'React', icon: '/tech/react.svg' },
  { name: 'Next.js', icon: '/tech/next.svg' },
  { name: 'TypeScript', icon: '/tech/typescript.svg' },
  { name: 'Tailwind CSS', icon: '/tech/tailwind.svg' },
];

export default function TechStack() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Tech Stack
      </h2>
      <div className="flex items-center justify-center space-x-8">
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            className="relative group"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative w-12 h-12 p-2 rounded-xl bg-background/50 backdrop-blur-lg border border-accent/20">
              <Image
                src={tech.icon}
                alt={tech.name}
                width={32}
                height={32}
                className="w-full h-full object-contain filter dark:invert"
              />
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 