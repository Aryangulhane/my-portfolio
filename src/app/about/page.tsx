"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import Scene3D from "@/components/Scene3D";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 90 },
    { name: "MongoDB", level: 75 },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold"
                {...fadeInUp}
              >
                About <span className="text-primary">Me</span>
              </motion.h1>
              <motion.div 
                className="text-lg sm:text-xl text-muted-foreground"
                {...fadeInUp}
                transition={{ delay: 0.2 }}
              >
                I'm a passionate full-stack developer with a keen eye for creating elegant solutions in the least amount of time. I specialize in building responsive web applications using modern technologies.
              </motion.div>
              <motion.div 
                className="flex flex-wrap gap-4"
                {...fadeInUp}
                transition={{ delay: 0.4 }}
              >
                <a 
                  href="/resume.pdf" 
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Contact Me
                </a>
              </motion.div>
            </div>

            {/* Right Column - 3D Scene */}
            <motion.div 
              className="relative h-[400px] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Scene3D />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My <span className="text-primary">Skills</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="bg-background/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Work <span className="text-primary">Experience</span>
          </motion.h2>

          <div className="space-y-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="relative pl-8 border-l-2 border-primary/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <motion.div 
                  className="bg-card/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-bold mb-2">Senior Developer</h3>
                  <motion.div 
                    className="text-muted-foreground mb-2"
                  >
                    Company Name • 2020 - Present
                  </motion.div>
                  <motion.div 
                    className="text-muted-foreground"
                  >
                    Led the development of multiple web applications using React, Node.js, and MongoDB.
                    Implemented CI/CD pipelines and improved application performance by 40%.
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Education & <span className="text-primary">Certifications</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((_, index) => (
              <motion.div
                key={index}
                className="bg-background/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-2">Bachelor of Science in Computer Science</h3>
                <motion.div 
                  className="text-muted-foreground mb-2"
                >
                  University Name • 2016 - 2020
                </motion.div>
                <motion.div 
                  className="text-muted-foreground"
                >
                  Graduated with honors. Specialized in Software Engineering and Web Development.
                  Participated in various hackathons and coding competitions.
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 