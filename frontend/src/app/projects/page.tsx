// src/app/projects/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// --- Enhanced Project Data Structure ---
const projects = [
  {
    title: 'Cyber Dashboard',
    description: 'A futuristic data visualization dashboard built with Next.js, featuring real-time data streams and complex animations.',
    image: '/project1.jpg', // Replace with your actual image path
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    links: {
      live: '#',
      repo: '#',
    },
  },
  {
    title: 'AI Content Generator',
    description: 'A SaaS platform that leverages AI to generate marketing copy, blog posts, and social media updates.',
    image: '/project2.jpg', // Replace with your actual image path
    tags: ['React', 'Node.js', 'AI/ML', 'MongoDB'],
    links: {
      live: '#',
      repo: '#',
    },
  },
  {
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce site with a custom CMS, payment integration, and a modern, responsive user interface.',
    image: '/project3.jpg', // Replace with your actual image path
    tags: ['Next.js', 'Stripe', 'Sanity', 'TypeScript'],
    links: {
      live: '#',
      repo: '#',
    },
  },
  // Add more projects...
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Main Page Component ---
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Dynamically get all unique tags from the projects data
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return ['All', ...Array.from(tags)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      {/* Subtle background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_100%_at_50%_0%,rgba(var(--primary-rgb),0.1)_0%,rgba(var(--primary-rgb),0)_100%)]"
      />
      
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            Featured Work
          </motion.div>
          <motion.h1 variants={itemVariants} className="cyber-text text-5xl font-extrabold tracking-tight lg:text-7xl">
            <span className="text-foreground">Code</span>
            <span className="text-primary"> & </span>
            <span className="gradient-text">Creations</span>
          </motion.h1>
          <motion.div variants={itemVariants} className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0" />
          <motion.p variants={itemVariants} className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
            A thoughtfully curated selection of real‑world and experimental projects. Explore polished demos, read the code, and see how ideas ship to production.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="my-12 flex flex-wrap justify-center gap-4"
        >
          {allTags.map(tag => (
            <FilterButton
              key={tag}
              tag={tag}
              isActive={activeFilter === tag}
              onClick={() => setActiveFilter(tag)}
            />
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout // This prop enables the re-sorting animation
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))
            ) : (
              <NoProjectsFound />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// --- Helper Components ---

const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border"
  >
    <div className="relative h-56 w-full overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
    </div>
    <div className="flex flex-1 flex-col p-6">
      <h2 className="mb-2 text-2xl font-bold text-foreground">{project.title}</h2>
      <p className="mb-4 flex-1 text-sm text-muted-foreground">{project.description}</p>
      
      {/* Tech Stack Tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex items-center justify-between">
        <Link href={project.links.live} target="_blank" className="btn flex items-center gap-2 text-sm">
          <FaExternalLinkAlt /> Live Demo
        </Link>
        <Link href={project.links.repo} target="_blank" className="text-muted-foreground transition-colors hover:text-primary">
          <FaGithub size={24} />
        </Link>
      </div>
    </div>
  </motion.div>
);

const FilterButton = ({ tag, isActive, onClick }: { tag: string, isActive: boolean, onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    variants={itemVariants}
    className={`btn relative rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
      isActive ? "text-primary-foreground" : "border border-border hover:border-primary hover:text-primary"
    }`}
  >
    {tag}
    {isActive && (
      <motion.div
        layoutId="active-filter-pill"
        className="animated-border absolute inset-0 -z-10 rounded-full bg-primary"
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    )}
  </motion.button>
);

const NoProjectsFound = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="col-span-full flex flex-col items-center justify-center py-24 text-center"
  >
    <h3 className="text-2xl font-bold text-muted-foreground">No projects found for this category.</h3>
    <p className="mt-2 text-muted-foreground">Try selecting another filter!</p>
  </motion.div>
);