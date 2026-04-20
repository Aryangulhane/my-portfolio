// src/app/projects/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// --- Real Project Data ---
interface ProjectFiles {
  schematic?: string;
  code?: string;
  bom?: string;
}

interface Project {
  title: string;
  tags: string[];
  description: string;
  status: 'Completed' | 'In Progress';
  context?: string;
  repo?: string;
  files?: ProjectFiles;
}

const projects: Project[] = [
  {
    title: '4-Channel Home Automation System',
    tags: ['Hardware', 'Automation', 'IoT'],
    description: 'Built in Class 10. Controls 4 home appliances remotely using ESP32 with both Rainmaker and Blynk IoT platforms. Includes relay switching and smartphone control.',
    status: 'Completed',
    repo: 'https://github.com/Aryangulhane',
    files: {
      code: 'https://github.com/Aryangulhane',
    },
  },
  {
    title: 'Obstacle Avoiding Robot',
    tags: ['Hardware', 'Robotics', 'Embedded'],
    description: 'Built in Class 9. Autonomous robot using ultrasonic sensors and Arduino to detect and avoid obstacles in real time.',
    status: 'Completed',
  },
  {
    title: 'ESP32 Data Logger via Web Server',
    tags: ['Hardware', 'IoT', 'Embedded'],
    description: 'Logs sensor data to a local web server hosted on the ESP32 itself. Accessible from any browser on the same network — no cloud required.',
    status: 'Completed',
    files: {
      code: 'https://github.com/Aryangulhane',
    },
  },
  {
    title: 'Bluetooth Relay Controller',
    tags: ['Hardware', 'Embedded', 'IoT'],
    description: 'Bluetooth serial communication between ESP32 and a mobile device to toggle relays on/off. Simple, fast, wireless control over hardware.',
    status: 'Completed',
  },
  {
    title: '3S 12V LiPo Battery Pack for Drone',
    tags: ['Hardware', 'Drone'],
    description: 'Built during internship at High Dynamics. A 3-cell 12V LiPo pack with connectors, assembled for drone power systems.',
    status: 'Completed',
    context: 'High Dynamics Internship',
  },
  {
    title: 'Power Distribution Board (PDB)',
    tags: ['Hardware', 'Drone', 'Electronics'],
    description: 'Currently designing and building a custom PDB for drone systems at High Dynamics. Handles power routing from battery to ESCs and other drone components.',
    status: 'In Progress',
    context: 'High Dynamics Internship',
  },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Main Page Component ---
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return ['All', ...Array.from(tags)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => p.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <div className="container mx-auto px-6 py-24 sm:py-32">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-14"
        >
          <motion.div
            variants={itemVariants}
            className="mb-3 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground"
          >
            Hardware & Software
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4"
          >
            My <span className="text-primary">Projects</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg text-muted-foreground"
          >
            Real things I&apos;ve built — from autonomous robots and IoT systems
            to drone hardware and PCB design.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-10 flex flex-wrap gap-2"
        >
          {allTags.map(tag => (
            <motion.button
              key={tag}
              variants={itemVariants}
              onClick={() => setActiveFilter(tag)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative rounded-lg px-4 py-2 text-sm font-mono font-medium transition-all ${
                activeFilter === tag
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-primary'
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20"
              >
                <h3 className="text-xl font-heading font-bold text-muted-foreground">No projects found for this category.</h3>
                <p className="mt-2 text-muted-foreground text-sm">Try selecting another filter!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// --- Project Card ---
const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 250, damping: 25 }}
    whileHover={{ y: -4 }}
    className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
  >
    {/* Status Badge */}
    <div className="flex items-center gap-2 mb-4">
      <span className={project.status === 'Completed' ? 'badge-completed' : 'badge-in-progress'}>
        {project.status === 'In Progress' ? '🔧 ' : '✓ '}{project.status}
      </span>
      {project.context && (
        <span className="text-xs text-muted-foreground font-mono">
          @ {project.context}
        </span>
      )}
    </div>

    <h2 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
      {project.title}
    </h2>

    <p className="text-sm text-muted-foreground flex-1 mb-5 leading-relaxed">
      {project.description}
    </p>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-5">
      {project.tags.map(tag => (
        <span
          key={tag}
          className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-mono text-primary border border-primary/15"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Open Project Files */}
    {project.files && (
      <div className="mt-auto pt-4 border-t border-border/50 flex flex-wrap gap-2">
        {project.files.schematic && (
          <a href={project.files.schematic} target="_blank" rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors font-mono inline-flex items-center gap-1.5">
            📐 Schematic
          </a>
        )}
        {project.files.code && (
          <a href={project.files.code} target="_blank" rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors font-mono inline-flex items-center gap-1.5">
            💾 Code
          </a>
        )}
        {project.files.bom && (
          <a href={project.files.bom} target="_blank" rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors font-mono inline-flex items-center gap-1.5">
            🧾 Parts list
          </a>
        )}
      </div>
    )}

    {/* GitHub Link (fallback when no files) */}
    {!project.files && project.repo && (
      <div className="mt-auto pt-4 border-t border-border">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <FaGithub /> View Code
        </a>
      </div>
    )}
  </motion.div>
);