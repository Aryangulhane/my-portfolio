// src/app/lab/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { FaBolt, FaFlask, FaMicrochip, FaTools, FaWrench, FaBook } from 'react-icons/fa';

// --- Types ---
interface BuildLog {
  _id: string;
  title: string;
  date: string;
  status: "planning" | "in-progress" | "done";
  description: string;
  photos?: any[];
  tags?: string[];
}

const statusConfig = {
  done:          { label: "Done",        dotClass: "border-green-500 bg-green-500/20", badgeClass: "text-green-500 border-green-500/30 bg-green-500/10" },
  "in-progress": { label: "In Progress", dotClass: "border-primary bg-primary/20",    badgeClass: "text-primary border-primary/30 bg-primary/10" },
  planning:      { label: "Planning",    dotClass: "border-blue-400 bg-blue-400/20",   badgeClass: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
};

// --- Static fallback data (used when Sanity has no entries) ---
const fallbackEntries: BuildLog[] = [
  {
    _id: 'f1', date: '2025-04-10', title: 'PDB Layout Design', status: 'in-progress',
    description: 'Working on Power Distribution Board layout — learning KiCad for PCB design. Routing power traces for ESCs and flight controller.',
    tags: ['KiCad', 'PCB', 'Drone'],
  },
  {
    _id: 'f2', date: '2025-03-15', title: '3S Battery Pack Complete', status: 'done',
    description: 'Completed the 3S 12V LiPo battery pack assembly at High Dynamics. Soldered connectors, tested discharge curves, verified cell balancing.',
    tags: ['LiPo', 'Drone', 'Soldering'],
  },
  {
    _id: 'f3', date: '2025-02-10', title: 'I2C Sensor Communication', status: 'done',
    description: 'Exploring I2C protocol for connecting multiple sensors to a single bus. Testing with BME280 and MPU6050 on ESP32.',
    tags: ['I2C', 'ESP32', 'Sensors'],
  },
  {
    _id: 'f4', date: '2025-01-15', title: 'Started B.Tech + Lab Setup', status: 'done',
    description: 'Began Computer Science at MIT ADT University. Set up my home lab bench with oscilloscope, power supply, and soldering station.',
    tags: ['University', 'Lab Setup'],
  },
  {
    _id: 'f5', date: '2024-12-01', title: 'Bluetooth Relay Controller', status: 'done',
    description: 'Built a Bluetooth serial relay controller using ESP32. Toggle appliances from phone via custom Android app commands.',
    tags: ['Bluetooth', 'ESP32', 'Relay'],
  },
  {
    _id: 'f6', date: '2024-11-01', title: 'ESP32 Web Server Data Logger', status: 'done',
    description: 'Created a local web server on ESP32 that logs temperature and humidity data in real time. No cloud dependencies.',
    tags: ['ESP32', 'Web Server', 'IoT'],
  },
  {
    _id: 'f7', date: '2024-06-01', title: 'Home Automation System', status: 'done',
    description: 'Built and deployed a 4-channel home automation system using ESP32, relay modules, and the Blynk/Rainmaker IoT platforms.',
    tags: ['ESP32', 'Blynk', 'Rainmaker'],
  },
  {
    _id: 'f8', date: '2023-09-01', title: 'First Robot Build', status: 'done',
    description: 'Built my first obstacle-avoiding robot with Arduino, ultrasonic sensors, and DC motors. The moment I knew I wanted to keep building things.',
    tags: ['Arduino', 'Robotics'],
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LabPage() {
  const [logs, setLogs] = useState<BuildLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingSanity, setUsingSanity] = useState(false);

  useEffect(() => {
    client
      .fetch<BuildLog[]>(
        `*[_type == "buildLog"] | order(date desc) {
          _id, title, date, status, description, photos, tags
        }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          setLogs(data);
          setUsingSanity(true);
        } else {
          setLogs(fallbackEntries);
        }
        setLoading(false);
      })
      .catch(() => {
        setLogs(fallbackEntries);
        setLoading(false);
      });
  }, []);

  const currentlyBuilding = logs.find(l => l.status === "in-progress");

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

        {/* Currently building callout */}
        {currentlyBuilding && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12 rounded-xl border border-primary/30 bg-primary/5 p-5"
          >
            <p className="text-xs font-mono text-primary mb-1 font-semibold uppercase tracking-wider">🔧 Currently Building</p>
            <p className="font-heading font-bold text-foreground">{currentlyBuilding.title}</p>
            {currentlyBuilding.description && (
              <p className="text-sm text-muted-foreground mt-1">{currentlyBuilding.description}</p>
            )}
          </motion.div>
        )}

        {/* Timeline */}
        {loading ? (
          <div className="space-y-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 rounded-xl bg-muted/30" />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-0">
              {logs.map((log) => {
                const cfg = statusConfig[log.status] ?? statusConfig.done;
                return (
                  <motion.div
                    key={log._id}
                    variants={itemVariants}
                    className="relative pl-14 pb-10 group"
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-3 top-1 flex items-center justify-center w-5 h-5 rounded-full border-2 ${cfg.dotClass}`}>
                      {log.status === 'in-progress' && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-primary"
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Date label */}
                    <div className="text-xs font-mono text-muted-foreground mb-2 flex items-center gap-2">
                      [{new Date(log.date).toLocaleDateString("en-IN", { year: "numeric", month: "long" })}]
                      {log.status === 'in-progress' && (
                        <span className="text-primary font-semibold uppercase tracking-wider">Currently Working</span>
                      )}
                    </div>

                    {/* Entry card */}
                    <div className="rounded-xl border border-border bg-surface p-5 transition-all group-hover:border-primary/20 group-hover:shadow-md group-hover:shadow-primary/5">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border font-mono ${cfg.badgeClass}`}>
                          {cfg.label}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {new Date(log.date).toLocaleDateString("en-IN", {
                            year: "numeric", month: "long", day: "numeric",
                          })}
                        </span>
                      </div>

                      <h2 className="text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                        {log.title}
                      </h2>
                      {log.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {log.description}
                        </p>
                      )}

                      {/* Tags */}
                      {log.tags && log.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {log.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-mono border border-primary/15">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Photos (Sanity only) */}
                      {usingSanity && log.photos && log.photos.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          {log.photos.slice(0, 4).map((photo, pi) => {
                            const url = urlFor(photo);
                            if (!url) return null;
                            return (
                              <div key={pi} className="relative h-36 rounded-lg overflow-hidden">
                                <Image
                                  src={url.width(400).height(300).url()}
                                  alt={`${log.title} photo ${pi + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
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
        )}

        {/* Subscribe strip */}
        <SubscribeStrip />
      </div>
    </div>
  );
}

// --- Subscribe Widget ---
function SubscribeStrip() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setDone(true);
    } catch {
      // silently fail
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center"
    >
      <p className="font-heading font-bold mb-1">Get notified when I build something</p>
      <p className="text-sm text-muted-foreground mb-4">No spam. One email per build, maybe.</p>
      {done ? (
        <p className="text-primary font-mono font-semibold">✓ You&apos;re in.</p>
      ) : (
        <div className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-mono font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </div>
      )}
    </motion.div>
  );
}
