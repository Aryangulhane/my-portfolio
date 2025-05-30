// src/app/projects/page.tsx
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: 'Project One',
    description: 'A brief description of Project One.',
    image: '/project1.jpg',
  },
  {
    title: 'Project Two',
    description: 'A brief description of Project Two.',
    image: '/project2.jpg',
  },
  // Add more projects as needed
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center text-accent mb-8">My Projects</h1>
        <p className="text-center text-lg text-text/80 mb-12">Explore my work and the technologies I use.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative rounded-lg overflow-hidden bg-accent/20 shadow-lg transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p className="text-sm">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
  