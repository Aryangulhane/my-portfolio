// src/app/lab/page.tsx
"use client";

import { motion } from 'framer-motion';
import { FaBolt, FaFlask, FaMicrochip, FaTools, FaWrench, FaBook } from 'react-icons/fa';
import type { Metadata } from 'next';

// --- Build Log Entries ---
const labEntries = [
  {
    date: 'April 2025',
    title: 'PDB Layout Design',
    description: 'Working on Power Distribution Board layout — learning KiCad for PCB design. Routing power traces for ESCs and flight controller.',
    icon: <FaMicrochip />,
    status: 'active' as const,
    tags: ['KiCad', 'PCB', 'Drone'],
  },
  {
    date: 'March 2025',
    title: '3S Battery Pack Complete',
    description: 'Completed the 3S 12V LiPo battery pack assembly at High Dynamics. Soldered connectors, tested discharge curves, verified cell balancing.',
    icon: <FaBolt />,
    status: 'done' as const,
    tags: ['LiPo', 'Drone', 'Soldering'],
  },
  {
    date: 'February 2025',
    title: 'I2C Sensor Communication',
    description: 'Exploring I2C protocol for connecting multiple sensors to a single bus. Testing with BME280 and MPU6050 on ESP32.',
    icon: <FaFlask />,
    status: 'done' as const,
    tags: ['I2C', 'ESP32', 'Sensors'],
  },
  {
    date: 'January 2025',
    title: 'Started B.Tech + Lab Setup',
    description: 'Began Computer Science at MIT ADT University. Set up my home lab bench with oscilloscope, power supply, and soldering station.',
    icon: <FaTools />,
    status: 'done' as const,
    tags: ['University', 'Lab Setup'],
  },
  {
    date: 'December 2024',
    title: 'Bluetooth Relay Controller',
    description: 'Built a Bluetooth serial relay controller using ESP32. Toggle appliances from phone via custom Android app commands.',
    icon: <FaWrench />,
    status: 'done' as const,
    tags: ['Bluetooth', 'ESP32', 'Relay'],
  },
  {
    date: 'November 2024',
    title: 'ESP32 Web Server Data Logger',
    description: 'Created a local web server on ESP32 that logs temperature and humidity sensor data in real time. No cloud dependencies — fully local.',
    icon: <FaFlask />,
    status: 'done' as const,
    tags: ['ESP32', 'Web Server', 'IoT'],
  },
  {
    date: 'Summer 2024',
    title: 'Home Automation System',
    description: 'Built and deployed a 4-channel home automation system using ESP32, relay modules, and the Blynk/Rainmaker IoT platforms. Controls 4 appliances from anywhere.',
    icon: <FaBolt />,
    status: 'done' as const,
    tags: ['ESP32', 'Blynk', 'Rainmaker'],
  },
  {
    date: 'Class 9 (2023)',
    title: 'First Robot Build',
    description: 'Built my first obstacle-avoiding robot with Arduino, ultrasonic sensors, and DC motors. The moment I knew I wanted to keep building things.',
    icon: <FaBook />,
    status: 'milestone' as const,
    tags: ['Arduino', 'Robotics'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LabPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <div className="container mx-auto px-6 py-24 sm:py-32 max-w-3xl">
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
            <motion.span
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Build Log
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4"
          >
            The <span className="text-primary">Lab</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground"
          >
            A running log of what I&apos;m building, exploring, and breaking.
            Reverse chronological — newest first.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-0">
            {labEntries.map((entry, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-14 pb-10 group"
              >
                {/* Timeline dot */}
                <div className={`absolute left-3 top-1 flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                  entry.status === 'active'
                    ? 'border-primary bg-primary/20'
                    : entry.status === 'milestone'
                    ? 'border-primary bg-primary'
                    : 'border-border bg-surface'
                }`}>
                  {entry.status === 'active' && (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Date label */}
                <div className="text-xs font-mono text-muted-foreground mb-2 flex items-center gap-2">
                  [{entry.date}]
                  {entry.status === 'active' && (
                    <span className="text-primary font-semibold uppercase tracking-wider">Currently Working</span>
                  )}
                  {entry.status === 'milestone' && (
                    <span className="text-primary font-semibold uppercase tracking-wider">Milestone</span>
                  )}
                </div>

                {/* Entry card */}
                <div className="rounded-xl border border-border bg-surface p-5 transition-all group-hover:border-primary/20 group-hover:shadow-md group-hover:shadow-primary/5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm flex-shrink-0 mt-0.5">
                      {entry.icon}
                    </div>
                    <h3 className="text-lg font-heading font-bold group-hover:text-primary transition-colors">
                      {entry.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 ml-11">
                    {entry.description}
                  </p>
                  <div className="flex flex-wrap gap-2 ml-11">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-mono border border-primary/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* End marker */}
          <div className="relative pl-14">
            <div className="absolute left-3 top-0 flex items-center justify-center w-5 h-5 rounded-full border-2 border-border bg-surface">
              <span className="text-muted-foreground text-xs">...</span>
            </div>
            <p className="text-sm text-muted-foreground font-mono pt-0.5">
              More to come. Always building.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
