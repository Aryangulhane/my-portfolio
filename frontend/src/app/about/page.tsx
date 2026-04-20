"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Footer from "@/components/Footer";
import {
  FaBolt, FaGraduationCap, FaRobot, FaMicrochip, FaWifi,
  FaAtom, FaMusic, FaCamera, FaFilm, FaArrowRight
} from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Skills Data (honest, hardware-first) ---
const skillCategories = [
  {
    title: 'Hardware & Electronics',
    skills: ['ESP32', 'Arduino', 'Relay Circuits', 'LiPo Battery Systems', 'PCB Basics', 'Soldering'],
    icon: <FaMicrochip />,
  },
  {
    title: 'Embedded / Firmware',
    skills: ['C/C++ for MCUs', 'Bluetooth Serial', 'Web Servers on ESP', 'I2C / SPI Communication'],
    icon: <FaBolt />,
  },
  {
    title: 'Platforms & Tools',
    skills: ['Blynk IoT', 'ESP Rainmaker', 'KiCad (learning)', 'Git', 'VS Code'],
    icon: <FaWifi />,
  },
  {
    title: 'Languages',
    skills: ['C / C++', 'Python (basics)', 'JavaScript (enough to build tools)', 'HTML / CSS'],
    icon: <FaRobot />,
  },
];

// --- Timeline Data (real) ---
const timeline = [
  {
    title: 'Hardware Intern',
    subtitle: 'High Dynamics • 2025 - Present',
    description: 'Building battery packs and power distribution boards for drones. Currently assembling a 3S 12V LiPo pack with connectors and working on a custom PDB.',
    icon: <FaBolt className="h-4 w-4" />,
  },
  {
    title: 'B.Tech in Computer Science',
    subtitle: 'MIT ADT University • 2025 - 2029 (Expected)',
    description: 'First-year CS student with a focus on electronics, embedded systems, and AI. Participating in hardware projects and internships alongside academics.',
    icon: <FaGraduationCap className="h-4 w-4" />,
  },
  {
    title: '4-Channel Home Automation',
    subtitle: 'Class 10 • 2024',
    description: 'Built a complete home automation system using ESP32 with Rainmaker and Blynk IoT platforms. Controlled 4 appliances via smartphone.',
    icon: <FaWifi className="h-4 w-4" />,
  },
  {
    title: 'First Robot Build',
    subtitle: 'Class 9 • 2023',
    description: 'Built my first obstacle-avoiding robot with Arduino and ultrasonic sensors. This is where it all started.',
    icon: <FaRobot className="h-4 w-4" />,
  },
];

// --- Interests ---
const interests = [
  { icon: <FaMicrochip />, label: 'Electronics' },
  { icon: <FaBolt />, label: 'Embedded Systems' },
  { icon: <FaAtom />, label: 'Physics' },
  { icon: <FaMusic />, label: 'Music' },
  { icon: <FaCamera />, label: 'Photography' },
  { icon: <FaFilm />, label: 'Filmmaking' },
];

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return <AboutPageSkeleton />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground relative">
      {/* ===== HERO ===== */}
      <motion.section
        className="relative px-6 py-24 sm:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="mx-auto max-w-3xl">
          <motion.div variants={itemVariants} className="mb-3 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            About Me
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-2">
            Engineer in training.
          </motion.h1>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-8">
            Tinkerer by <span className="text-primary">nature</span>.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            I&apos;m Aryan — a first-year CS student at MIT ADT University who&apos;s more comfortable with a
            soldering iron than a Figma file. I got into electronics in school, built my first robot in
            Class 9, and since then I&apos;ve been hooked on making hardware do things. I&apos;m currently interning
            at High Dynamics where I work on drone hardware. I use code as a tool — especially AI — but
            my real interest is in the physical world: circuits, embedded systems, and anything that blinks,
            moves, or beeps.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-sm font-semibold"
              >
                Download Resume
              </motion.button>
            </a>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-xl border border-border font-mono text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all"
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== SKILLS ===== */}
      <motion.section
        className="px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-4xl">
          <motion.h2 variants={itemVariants} className="mb-10 text-3xl font-heading font-bold">
            My <span className="text-primary">Toolkit</span>
          </motion.h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-primary/5 text-sm font-mono text-muted-foreground border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== TIMELINE ===== */}
      <motion.section
        className="px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-3xl">
          <motion.h2 variants={itemVariants} className="mb-10 text-3xl font-heading font-bold">
            My <span className="text-primary">Journey</span>
          </motion.h2>

          <div className="relative border-l-2 border-primary/20">
            {timeline.map((item) => (
              <TimelineItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== INTERESTS ===== */}
      <motion.section
        className="px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-3xl">
          <motion.h2 variants={itemVariants} className="mb-6 text-2xl font-heading font-bold">
            Beyond <span className="text-primary">Code</span>
          </motion.h2>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <motion.div
                key={interest.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-all cursor-default"
              >
                <span className="text-primary">{interest.icon}</span>
                {interest.label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== CTA ===== */}
      <motion.section
        className="px-6 py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-surface p-8 text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">
            Want to <span className="text-primary">collaborate</span>?
          </h2>
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
            If you&apos;re a student wanting to collaborate, a business with a hardware/IoT project,
            or just someone building something cool — let&apos;s talk.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-sm font-semibold"
            >
              Get In Touch <FaArrowRight className="text-xs" />
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

// --- Timeline Item Component ---
interface TimelineItemProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

function TimelineItem({ title, subtitle, description, icon }: TimelineItemProps) {
  return (
    <motion.div variants={itemVariants} className="relative mb-8 ml-8">
      <span className="absolute -left-[25px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background text-xs">
        {icon}
      </span>
      <div className="rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/20 hover:shadow-md hover:shadow-primary/5">
        <h3 className="text-lg font-heading font-bold">{title}</h3>
        <p className="text-xs font-mono text-muted-foreground mb-2">{subtitle}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// --- Skeleton ---
function AboutPageSkeleton() {
  return (
    <div className="container mx-auto animate-pulse px-6 py-24">
      <div className="space-y-16 max-w-3xl mx-auto">
        <div className="space-y-4">
          <div className="h-12 w-3/4 rounded-lg bg-muted/50" />
          <div className="h-6 w-full rounded-lg bg-muted/50" />
          <div className="h-6 w-5/6 rounded-lg bg-muted/50" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-40 rounded-xl bg-muted/50" />)}
        </div>
      </div>
    </div>
  );
}