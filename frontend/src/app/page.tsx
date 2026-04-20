"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import Link from 'next/link';
import { BackgroundScene } from '@/components/BackgroundScene';
import { FaBolt, FaMicrochip, FaRobot, FaWifi, FaCamera, FaMusic, FaAtom, FaFilm, FaGithub, FaArrowRight } from 'react-icons/fa';

// --- Real Projects Data ---
const featuredProjects = [
  {
    title: 'Power Distribution Board (PDB)',
    description: 'Custom PDB for drone systems at High Dynamics. Handles power routing from battery to ESCs and other drone components.',
    tags: ['Hardware', 'Drone', 'Electronics'],
    status: 'In Progress',
    context: 'High Dynamics Internship',
  },
  {
    title: '4-Channel Home Automation System',
    description: 'Controls 4 home appliances remotely using ESP32 with both Rainmaker and Blynk IoT platforms. Includes relay switching and smartphone control.',
    tags: ['Hardware', 'Automation', 'IoT'],
    status: 'Completed',
  },
  {
    title: 'Obstacle Avoiding Robot',
    description: 'Autonomous robot using ultrasonic sensors and Arduino to detect and avoid obstacles in real time.',
    tags: ['Hardware', 'Robotics', 'Embedded'],
    status: 'Completed',
  },
];

const interests = [
  { icon: <FaMicrochip />, label: 'Electronics' },
  { icon: <FaBolt />, label: 'Embedded Systems' },
  { icon: <FaAtom />, label: 'Physics' },
  { icon: <FaMusic />, label: 'Music' },
  { icon: <FaCamera />, label: 'Photography' },
  { icon: <FaFilm />, label: 'Filmmaking' },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "40%"]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <BackgroundScene />
      <div className="fixed inset-0 bg-background" style={{ zIndex: -3 }} />

      {/* ===== HERO SECTION ===== */}
      <motion.div ref={heroRef} style={{ y, opacity }} className="relative z-10">
        <div className="container mx-auto px-6 py-28 md:py-36">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-left flex-1"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 tracking-tight"
              >
                I build things.
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="text-lg md:text-xl font-mono text-primary mb-8 flex items-start gap-2"
              >
                <span className="text-muted-foreground select-none">&gt;</span>
                <TypeAnimation
                  sequence={[
                    'Electronics & Embedded Systems',
                    2500,
                    'ESP32 / Arduino Tinkerer',
                    2500,
                    'Drone Hardware @ High Dynamics',
                    2500,
                    'B.Tech CS • MIT ADT \'29',
                    2500,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  cursor={true}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link href="/projects">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
                  >
                    See My Projects
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-3 rounded-xl border border-border text-foreground font-mono text-sm font-semibold transition-all hover:border-primary hover:text-primary"
                  >
                    Work With Me
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex-shrink-0"
            >
              <div className="relative w-60 h-60 md:w-72 md:h-72">
                {/* Animated rings */}
                {[1.3, 1.5, 1.7].map((scale, i) => (
                  <motion.div
                    key={scale}
                    className="absolute inset-0 rounded-full border border-primary/10"
                    style={{ transform: `scale(${scale})` }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/30 group">
                  <Image
                    src="/profile.jpg"
                    alt="Aryan Gulhane"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===== BELOW THE FOLD ===== */}
      <div className="relative z-0 space-y-20 md:space-y-28 pb-12">

        {/* --- Currently Building Strip --- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6"
        >
          <div className="terminal-card max-w-3xl mx-auto">
            <div className="p-5 font-mono text-sm">
              <div className="flex items-center gap-3 mb-2">
                <motion.span
                  className="inline-block h-2 w-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-primary font-semibold uppercase tracking-wider text-xs">Live Build</span>
              </div>
              <p className="text-foreground">
                <span className="text-muted-foreground">$ </span>
                Power Distribution Board (PDB) for drone
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                @ High Dynamics Internship — In Progress
              </p>
            </div>
          </div>
        </motion.section>

        {/* --- Featured Projects --- */}
        <section id="projects" className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-heading font-bold mb-10"
            >
              Featured <span className="text-primary">Projects</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  {/* Status + Context */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={project.status === 'Completed' ? 'badge-completed' : 'badge-in-progress'}>
                      {project.status === 'In Progress' ? '🔧 ' : ''}{project.status}
                    </span>
                    {project.context && (
                      <span className="text-xs text-muted-foreground font-mono">
                        @ {project.context}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono border border-primary/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-8 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors group"
              >
                View all projects
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* --- About Snippet --- */}
        <section className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="max-w-4xl"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-heading font-bold mb-6"
            >
              A bit <span className="text-primary">about me</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl"
            >
              First-year CS student at MIT ADT. I tinker with electronics, build circuits, and explore
              embedded systems — from home automation to drone hardware. I use AI as a tool, not a career goal.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
            >
              {[
                { value: '9th Grade', label: 'When I built my first robot' },
                { value: '6+', label: 'Hardware projects built' },
                { value: '1', label: 'Active internship' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="rounded-xl border border-border bg-surface p-5 text-center"
                >
                  <div className="text-2xl font-heading font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* --- Interests Row --- */}
        <section className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-heading font-bold mb-6"
            >
              What I&apos;m <span className="text-primary">into</span>
            </motion.h2>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <motion.div
                  key={interest.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-all cursor-default"
                >
                  <span className="text-primary text-base">{interest.icon}</span>
                  {interest.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- Contact CTA --- */}
        <section id="contact" className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold mb-4">
              Let&apos;s <span className="text-primary">build</span> something.
            </h2>
            <p className="text-muted-foreground mb-8">
              Got a hardware idea, an IoT project, or just want to geek out about circuits? Let&apos;s talk.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-sm font-semibold"
                >
                  Get In Touch
                </motion.button>
              </Link>
              <a
                href="https://github.com/Aryangulhane"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3 rounded-xl border border-border font-mono text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all flex items-center gap-2"
                >
                  <FaGithub /> GitHub
                </motion.button>
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
