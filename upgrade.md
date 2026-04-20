# upgrade.md — Aryan Gulhane Portfolio: Next Level
> All feature additions, implementation details, and the exact order to do them in.

---

## Do This Week (Immediate Next Steps)

These three changes will make the site feel completely alive — do them before anything else.

### Step 1 — Add `buildLog` schema to Sanity

In your `/backend/sanity/schemaTypes/` folder, create a new file `buildLogType.ts`:

```ts
// backend/sanity/schemaTypes/buildLogType.ts
import { defineField, defineType } from 'sanity'

export const buildLogType = defineType({
  name: 'buildLog',
  title: 'Build Log',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '🧠 Planning', value: 'planning' },
          { title: '🔧 In Progress', value: 'in-progress' },
          { title: '✅ Done', value: 'done' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'What I did / learned',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['ESP32', 'Arduino', 'Drone', 'PCB', 'Sensors', 'Power', 'Bluetooth', 'IoT', 'Robotics'],
        layout: 'tags',
      },
    }),
  ],
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', status: 'status' },
    prepare({ title, subtitle, status }) {
      const emoji = status === 'done' ? '✅' : status === 'in-progress' ? '🔧' : '🧠'
      return { title: `${emoji} ${title}`, subtitle }
    },
  },
})
```

Then register it in `backend/sanity/schemaTypes/index.ts`:

```ts
import { buildLogType } from './buildLogType'

export const schemaTypes = [
  // ... your existing types
  buildLogType,
]
```

---

### Step 2 — Post your first 3 build log entries (backdated)

Go into your Sanity Studio and create these three entries. Use real dates, real descriptions in your own words. Even a few sentences is enough to start.

```
Entry 1:
  Title:  "4-Channel Home Automation with ESP32"
  Date:   Approximate date from Class 10 (e.g. 2023-11-01)
  Status: Done
  Tags:   ESP32, IoT, Bluetooth
  Desc:   Built a 4-relay home automation system controlled via Blynk IoT
          and ESP Rainmaker. Could toggle appliances from a phone app over
          WiFi. First real project that combined hardware and software.

Entry 2:
  Title:  "Obstacle Avoiding Robot"
  Date:   Class 9 approximate date (e.g. 2022-09-01)
  Status: Done
  Tags:   Arduino, Robotics, Sensors
  Desc:   My first real robot. Used an Arduino Uno and HC-SR04 ultrasonic
          sensor to detect obstacles and reroute automatically. Got me hooked
          on embedded systems.

Entry 3:
  Title:  "3S 12V LiPo Battery Pack for Drone — High Dynamics Internship"
  Date:   (your actual start month at High Dynamics)
  Status: Done
  Tags:   Drone, Power, PCB
  Desc:   Assembled a 3-cell lithium polymer battery pack for drone power
          systems. Handled cell selection, balancing connectors, and heat
          shrink finishing. First professional hardware build.
```

---

### Step 3 — Add GitHub Activity Feed to homepage

Add this component to your frontend. It fetches your last 5 public GitHub events and shows them in a live strip on the homepage.

Create `/frontend/src/components/GitHubFeed.tsx`:

```tsx
// src/components/GitHubFeed.tsx
"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaCodeBranch } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: { commits?: { message: string }[] };
  created_at: string;
}

export function GitHubFeed() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/Aryangulhane/events/public?per_page=6")
      .then((r) => r.json())
      .then((data) => {
        const pushes = data.filter((e: GitHubEvent) => e.type === "PushEvent");
        setEvents(pushes.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-2 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-10 rounded-lg bg-muted/40" />
      ))}
    </div>
  );

  if (!events.length) return null;

  return (
    <div className="space-y-2">
      {events.map((event, i) => {
        const message = event.payload.commits?.[0]?.message || "Pushed code";
        const repo = event.repo.name.replace("Aryangulhane/", "");
        const date = new Date(event.created_at).toLocaleDateString("en-IN", {
          day: "numeric", month: "short",
        });
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 px-4 py-2 text-sm"
          >
            <FaCodeBranch className="shrink-0 text-accent" size={12} />
            <span className="font-mono text-accent text-xs shrink-0">{repo}</span>
            <span className="text-muted-foreground truncate flex-1">{message}</span>
            <span className="text-muted-foreground text-xs shrink-0">{date}</span>
          </motion.div>
        );
      })}
      <Link
        href="https://github.com/Aryangulhane"
        target="_blank"
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
      >
        <FaGithub size={12} /> View all on GitHub →
      </Link>
    </div>
  );
}
```

Then add this section to your homepage (`/frontend/src/app/page.tsx`), just above the Footer:

```tsx
import { GitHubFeed } from "@/components/GitHubFeed";

// Add this section before <Footer />
<section className="py-16">
  <div className="container mx-auto px-4 max-w-3xl">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl font-bold font-mono mb-6 gradient-text"
    >
      $ git log --oneline
    </motion.h2>
    <GitHubFeed />
  </div>
</section>
```

---

---

## Tier 1 Features — High Impact

### Feature 1: Live Build Diary (`/lab` page)

**What it does:** A reverse-chronological log of everything you're building. One post per week or whenever you finish something. Pulls from the `buildLog` Sanity schema you created above.

**Create `/frontend/src/app/lab/page.tsx`:**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "@/lib/sanity";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface BuildLog {
  _id: string;
  title: string;
  date: string;
  status: "planning" | "in-progress" | "done";
  description: string;
  photos: any[];
  tags: string[];
}

const statusConfig = {
  done:         { label: "Done",        color: "text-green-400  border-green-400/30  bg-green-400/10"  },
  "in-progress":{ label: "In Progress", color: "text-orange-400 border-orange-400/30 bg-orange-400/10" },
  planning:     { label: "Planning",    color: "text-blue-400   border-blue-400/30   bg-blue-400/10"   },
};

export default function LabPage() {
  const [logs, setLogs] = useState<BuildLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch<BuildLog[]>(
        `*[_type == "buildLog"] | order(date desc) {
          _id, title, date, status, description, photos, tags
        }`
      )
      .then((data) => { setLogs(data); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-accent font-mono text-sm mb-2">// always building something</p>
          <h1 className="text-5xl font-bold gradient-text cyber-text mb-4">The Lab</h1>
          <p className="text-muted-foreground text-lg">
            A running log of what I'm making, breaking, and learning. Updated whenever I build something.
          </p>
        </motion.div>

        {/* Currently building callout */}
        {logs.find(l => l.status === "in-progress") && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12 rounded-xl border border-orange-400/30 bg-orange-400/5 p-5"
          >
            <p className="text-xs font-mono text-orange-400 mb-1">🔧 CURRENTLY BUILDING</p>
            <p className="font-semibold text-foreground">
              {logs.find(l => l.status === "in-progress")?.title}
            </p>
          </motion.div>
        )}

        {/* Timeline */}
        {loading ? (
          <div className="space-y-6 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 rounded-xl bg-muted/30" />
            ))}
          </div>
        ) : (
          <div className="relative border-l-2 border-accent/20 pl-8 space-y-12">
            {logs.map((log, i) => {
              const cfg = statusConfig[log.status] ?? statusConfig.done;
              return (
                <motion.div
                  key={log._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 border border-accent/40 text-xs">
                    🔩
                  </span>

                  <div className="glass rounded-xl border border-border p-6 hover:border-accent/30 transition-colors">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border font-mono ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {new Date(log.date).toLocaleDateString("en-IN", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold mb-2">{log.title}</h2>
                    {log.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {log.description}
                      </p>
                    )}

                    {/* Tags */}
                    {log.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {log.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Photos */}
                    {log.photos?.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {log.photos.slice(0, 4).map((photo, pi) => (
                          <div key={pi} className="relative h-36 rounded-lg overflow-hidden">
                            <Image
                              src={urlFor(photo).url()}
                              alt={`${log.title} photo ${pi + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
```

Add `/lab` to your navbar in `Navbar.tsx`:
```ts
const navItems = [
  { name: 'Home',     path: '/'         },
  { name: 'About',   path: '/about'    },
  { name: 'Projects',path: '/projects' },
  { name: 'Lab',     path: '/lab'      },  // ← add this
  { name: 'Blog',    path: '/blog'     },
  { name: 'Contact', path: '/contact'  },
];
```

---

### Feature 2: Collab Booking Form (upgraded contact page)

**What it does:** Two-mode contact form. Students get a "what are you building?" flow. Businesses get a project + budget flow. Both send different email templates via Resend.

**Update `/frontend/src/app/contact/page.tsx`:**

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaBriefcase } from "react-icons/fa";

type Mode = "student" | "business" | null;

export default function ContactPage() {
  const [mode, setMode] = useState<Mode>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "", project: "", budget: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, mode }),
    });
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-24 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-accent font-mono text-sm mb-2">// open for collaboration</p>
          <h1 className="text-5xl font-bold gradient-text cyber-text mb-4">Let's build something.</h1>
          <p className="text-muted-foreground mb-10">
            Student with an idea, or a business with a hardware/IoT project? Pick your path.
          </p>
        </motion.div>

        {/* Mode selector */}
        {!sent && (
          <div className="grid grid-cols-2 gap-4 mb-10">
            <button
              onClick={() => setMode("student")}
              className={`rounded-xl border p-6 text-left transition-all ${
                mode === "student" ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
              }`}
            >
              <FaUserGraduate className="text-accent mb-3" size={24} />
              <p className="font-semibold">Student / Maker</p>
              <p className="text-sm text-muted-foreground mt-1">Collab, learn together, build something cool</p>
            </button>
            <button
              onClick={() => setMode("business")}
              className={`rounded-xl border p-6 text-left transition-all ${
                mode === "business" ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
              }`}
            >
              <FaBriefcase className="text-accent mb-3" size={24} />
              <p className="font-semibold">Business / Client</p>
              <p className="text-sm text-muted-foreground mt-1">IoT project, hardware consult, or a deal</p>
            </button>
          </div>
        )}

        {/* Form */}
        {mode && !sent && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {["name", "email"].map(field => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field as keyof typeof form]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                className="w-full rounded-lg border border-border bg-card/30 px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
            ))}

            {mode === "student" && (
              <textarea
                placeholder="What are you building or want to work on?"
                rows={4}
                value={form.project}
                onChange={e => setForm({ ...form, project: e.target.value })}
                className="w-full rounded-lg border border-border bg-card/30 px-4 py-3 text-sm focus:border-accent focus:outline-none resize-none"
              />
            )}

            {mode === "business" && (
              <>
                <textarea
                  placeholder="Describe your project or what you need"
                  rows={3}
                  value={form.project}
                  onChange={e => setForm({ ...form, project: e.target.value })}
                  className="w-full rounded-lg border border-border bg-card/30 px-4 py-3 text-sm focus:border-accent focus:outline-none resize-none"
                />
                <input
                  type="text"
                  placeholder="Rough budget / timeline (optional)"
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                  className="w-full rounded-lg border border-border bg-card/30 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </>
            )}

            <textarea
              placeholder="Anything else you want to say"
              rows={3}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-border bg-card/30 px-4 py-3 text-sm focus:border-accent focus:outline-none resize-none"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-lg bg-accent text-background font-semibold py-3 hover:bg-accent/80 transition-colors font-mono"
            >
              {loading ? "Sending..." : "$ Send message"}
            </button>
          </motion.div>
        )}

        {sent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-4xl mb-4">✅</p>
            <h2 className="text-2xl font-bold mb-2">Got it.</h2>
            <p className="text-muted-foreground">I'll get back to you soon.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
```

Update `/frontend/src/app/api/contact/route.ts` to handle `mode` and send different templates:

```ts
const subjectMap = {
  student: `[Student collab] from ${name}`,
  business: `[Business enquiry] from ${name}`,
  default: `[Contact] from ${name}`,
};

// In the html template, add:
// Mode: ${mode} | Budget: ${budget || 'not specified'} | Project: ${project}
```

---

---

## Tier 2 Features — Makes You Stand Out

### Feature 3: Open Project Files

**What it does:** Each project card gets a "Download files" section with real links to schematics, code, and parts lists.

**For each project in `/frontend/src/app/projects/page.tsx`, add a `files` field:**

```ts
const projects = [
  {
    title: '4-Channel Home Automation',
    // ... existing fields ...
    files: {
      schematic: 'https://github.com/Aryangulhane/home-automation/blob/main/schematic.pdf',
      code:      'https://github.com/Aryangulhane/home-automation',
      bom:       'https://github.com/Aryangulhane/home-automation/blob/main/bom.csv',
    },
  },
  // repeat for each project
];
```

Add a files section at the bottom of each `ProjectCard`:

```tsx
{project.files && (
  <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap gap-2">
    {project.files.schematic && (
      <a href={project.files.schematic} target="_blank"
        className="text-xs px-3 py-1 rounded border border-border hover:border-accent text-muted-foreground hover:text-accent transition-colors font-mono">
        📐 Schematic
      </a>
    )}
    {project.files.code && (
      <a href={project.files.code} target="_blank"
        className="text-xs px-3 py-1 rounded border border-border hover:border-accent text-muted-foreground hover:text-accent transition-colors font-mono">
        💾 Code
      </a>
    )}
    {project.files.bom && (
      <a href={project.files.bom} target="_blank"
        className="text-xs px-3 py-1 rounded border border-border hover:border-accent text-muted-foreground hover:text-accent transition-colors font-mono">
        🧾 Parts list
      </a>
    )}
  </div>
)}
```

**What to upload to GitHub for each project:**
- `schematic.pdf` — export from KiCad, EasyEDA, or even a clear hand-drawn photo
- `main.ino` or `main.cpp` — the actual firmware
- `bom.csv` — component name, quantity, where you bought it, approx price

---

### Feature 4: Maker Tools Page (`/tools`)

**What it does:** A page of small browser-based calculators every electronics student needs. Builds trust, gets bookmarked, brings repeat visitors.

Create `/frontend/src/app/tools/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// --- Ohm's Law Calculator ---
function OhmsLaw() {
  const [v, setV] = useState(""); const [i, setI] = useState(""); const [r, setR] = useState("");
  const calc = (solve: "V"|"I"|"R") => {
    const vn = parseFloat(v), in_ = parseFloat(i), rn = parseFloat(r);
    if (solve === "V" && !isNaN(in_) && !isNaN(rn)) setV((in_ * rn).toFixed(3));
    if (solve === "I" && !isNaN(vn) && !isNaN(rn)) setI((vn / rn).toFixed(3));
    if (solve === "R" && !isNaN(vn) && !isNaN(in_)) setR((vn / in_).toFixed(3));
  };
  return (
    <div className="glass rounded-xl border border-border p-6">
      <h3 className="font-bold font-mono mb-1">Ohm's Law  <span className="text-accent">V = I × R</span></h3>
      <p className="text-xs text-muted-foreground mb-4">Fill any two, solve the third</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[["V", "Voltage (V)", v, setV], ["I", "Current (A)", i, setI], ["R", "Resistance (Ω)", r, setR]].map(([label, ph, val, set]) => (
          <div key={label as string}>
            <label className="text-xs text-muted-foreground font-mono">{label as string}</label>
            <input type="number" placeholder={ph as string} value={val as string}
              onChange={e => (set as Function)(e.target.value)}
              className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"/>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {(["V","I","R"] as const).map(s => (
          <button key={s} onClick={() => calc(s)}
            className="flex-1 rounded-lg bg-accent/10 border border-accent/30 text-accent text-xs py-2 font-mono hover:bg-accent/20 transition-colors">
            Solve {s}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Voltage Divider ---
function VoltageDivider() {
  const [vin, setVin] = useState(""); const [r1, setR1] = useState(""); const [r2, setR2] = useState("");
  const vout = parseFloat(vin) && parseFloat(r1) && parseFloat(r2)
    ? (parseFloat(vin) * parseFloat(r2) / (parseFloat(r1) + parseFloat(r2))).toFixed(3)
    : null;
  return (
    <div className="glass rounded-xl border border-border p-6">
      <h3 className="font-bold font-mono mb-1">Voltage Divider  <span className="text-accent">Vout = Vin × R2/(R1+R2)</span></h3>
      <p className="text-xs text-muted-foreground mb-4">Calculate output voltage from a resistor divider</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[["Vin (V)", vin, setVin], ["R1 (Ω)", r1, setR1], ["R2 (Ω)", r2, setR2]].map(([ph, val, set]) => (
          <div key={ph as string}>
            <label className="text-xs text-muted-foreground font-mono">{ph as string}</label>
            <input type="number" placeholder={ph as string} value={val as string}
              onChange={e => (set as Function)(e.target.value)}
              className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"/>
          </div>
        ))}
      </div>
      {vout && <p className="text-accent font-mono font-bold text-lg">Vout = {vout} V</p>}
    </div>
  );
}

// --- LED Resistor Calculator ---
function LEDResistor() {
  const [vs, setVs] = useState(""); const [vf, setVf] = useState("2.0"); const [mA, setMA] = useState("20");
  const ohms = parseFloat(vs) && parseFloat(vf) && parseFloat(mA)
    ? Math.ceil((parseFloat(vs) - parseFloat(vf)) / (parseFloat(mA) / 1000))
    : null;
  return (
    <div className="glass rounded-xl border border-border p-6">
      <h3 className="font-bold font-mono mb-1">LED Resistor  <span className="text-accent">R = (Vs − Vf) / I</span></h3>
      <p className="text-xs text-muted-foreground mb-4">Find the right current-limiting resistor for an LED</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[["Supply V", vs, setVs], ["LED Vf (V)", vf, setVf], ["Current (mA)", mA, setMA]].map(([ph, val, set]) => (
          <div key={ph as string}>
            <label className="text-xs text-muted-foreground font-mono">{ph as string}</label>
            <input type="number" placeholder={ph as string} value={val as string}
              onChange={e => (set as Function)(e.target.value)}
              className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"/>
          </div>
        ))}
      </div>
      {ohms && <p className="text-accent font-mono font-bold text-lg">Use ≥ {ohms} Ω resistor</p>}
    </div>
  );
}

// --- LiPo Voltage Calculator ---
function LiPoVoltage() {
  const [cells, setCells] = useState("3");
  const full = parseFloat(cells) * 4.2, nominal = parseFloat(cells) * 3.7, cutoff = parseFloat(cells) * 3.0;
  return (
    <div className="glass rounded-xl border border-border p-6">
      <h3 className="font-bold font-mono mb-1">LiPo Pack Voltage</h3>
      <p className="text-xs text-muted-foreground mb-4">Voltage ranges for LiPo packs by cell count</p>
      <div className="mb-4">
        <label className="text-xs text-muted-foreground font-mono">Number of cells (S)</label>
        <input type="number" min="1" max="12" value={cells} onChange={e => setCells(e.target.value)}
          className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"/>
      </div>
      <div className="space-y-2 font-mono text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Fully charged</span><span className="text-green-400">{full.toFixed(1)} V</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Nominal</span><span className="text-accent">{nominal.toFixed(1)} V</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Cutoff (don't go below)</span><span className="text-red-400">{cutoff.toFixed(1)} V</span></div>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-accent font-mono text-sm mb-2">// free tools for makers</p>
          <h1 className="text-5xl font-bold gradient-text cyber-text mb-4">Maker Tools</h1>
          <p className="text-muted-foreground text-lg">
            Calculators I use all the time. No login, no BS — just open and use.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OhmsLaw />
          <VoltageDivider />
          <LEDResistor />
          <LiPoVoltage />
        </div>
      </div>
    </div>
  );
}
```

Add `/tools` to navbar:
```ts
{ name: 'Tools', path: '/tools' },
```

---

### Feature 5: Build Updates Newsletter

**What it does:** People subscribe to get an email when you post a new lab entry. Uses Resend Audiences (free tier).

Create `/frontend/src/app/api/subscribe/route.ts`:

```ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  try {
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      unsubscribed: false,
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

Add `RESEND_AUDIENCE_ID` to your `.env` (create an Audience in Resend dashboard → get the ID).

Add a subscribe widget to the `/lab` page footer:

```tsx
function SubscribeStrip() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="mt-16 rounded-xl border border-accent/20 bg-accent/5 p-6 text-center">
      <p className="font-semibold mb-1">Get notified when I build something</p>
      <p className="text-sm text-muted-foreground mb-4">No spam. One email per build, maybe.</p>
      {done ? <p className="text-accent font-mono">✓ You're in.</p> : (
        <div className="flex gap-2 max-w-sm mx-auto">
          <input type="email" placeholder="your@email.com" value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"/>
          <button onClick={async () => {
            await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
            setDone(true);
          }} className="rounded-lg bg-accent text-background px-4 py-2 text-sm font-mono hover:bg-accent/80 transition-colors">
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}
```

---

---

## Tier 3 Features — Dream Builds (Plan Now, Build Later)

### Feature 6: Live IoT Dashboard

**What it does:** Your ESP32 pushes real sensor data to Supabase every 30 seconds. Your site displays it live. The most impressive thing a hardware person can have on a portfolio.

**Architecture:**
```
ESP32 (sensor) → HTTP POST → Supabase (free DB) → your site polls every 30s → live graph
```

**ESP32 firmware snippet (Arduino):**
```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

DHT dht(4, DHT22);

void loop() {
  float temp = dht.readTemperature();
  float hum  = dht.readHumidity();

  HTTPClient http;
  http.begin("https://your-project.supabase.co/rest/v1/sensor_readings");
  http.addHeader("Content-Type", "application/json");
  http.addHeader("apikey", "YOUR_SUPABASE_ANON_KEY");
  http.addHeader("Authorization", "Bearer YOUR_SUPABASE_ANON_KEY");

  String payload = "{\"temperature\":" + String(temp) + ",\"humidity\":" + String(hum) + "}";
  http.POST(payload);
  http.end();
  delay(30000);
}
```

**Supabase setup:**
1. Create free project at supabase.com
2. Create table: `sensor_readings (id serial, temperature float, humidity float, created_at timestamptz default now())`
3. Enable Row Level Security → add public SELECT policy

**Next.js component sketch:**
```tsx
// src/components/IoTDashboard.tsx
// Polls /api/iot every 30s, renders a recharts LineChart
// Show temperature, humidity, timestamp
// Add to /lab page or as its own /dashboard page
```

**Env vars to add:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

### Feature 7: Parts Inventory

**What it does:** A searchable list of components you own. Useful for yourself, interesting for visitors ("what's in Aryan's lab").

**Add a `part` schema to Sanity:**
```ts
// backend/sanity/schemaTypes/partType.ts
export const partType = defineType({
  name: 'part',
  title: 'Part',
  type: 'document',
  fields: [
    defineField({ name: 'name',     type: 'string' }),
    defineField({ name: 'category', type: 'string',
      options: { list: ['Microcontrollers', 'Sensors', 'Passive', 'Power', 'Connectors', 'Modules', 'Tools'] }}),
    defineField({ name: 'quantity', type: 'number' }),
    defineField({ name: 'notes',    type: 'string' }),
    defineField({ name: 'source',   type: 'string' }), // where you bought it
  ],
})
```

Display at `/lab#inventory` or `/about#lab` — a simple searchable table.

---

### Feature 8: Creative Gallery (`/creative`)

**What it does:** Separates your photography and filmmaking from your technical work. Shows the full-person side of you — important when people decide whether to work with you.

**Page structure:**
- Toggle between Photography / Film
- Photography: masonry grid (use `columns-2 md:columns-3` CSS columns with `break-inside-avoid`)
- Film: YouTube/Vimeo embeds in a clean grid (use `aspect-video` Tailwind class)

**Add `photo` and `film` schemas to Sanity** (title, image/url, date, caption).

**Route:** `/creative` — add to footer links (not main navbar, keep navbar clean).

---

---

## New Environment Variables Needed

Add these to `/frontend/.env.local` as you build each feature:

```env
# Existing
RESEND_API_KEY=
EMAIL_RECIPIENT=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production

# New — Tier 1
RESEND_AUDIENCE_ID=          # from Resend dashboard > Audiences

# New — Tier 3 (IoT dashboard)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Navbar Final State

After all features are added, your navbar should look like:

```ts
const navItems = [
  { name: 'Home',     path: '/'         },
  { name: 'About',   path: '/about'    },
  { name: 'Projects',path: '/projects' },
  { name: 'Lab',     path: '/lab'      },
  { name: 'Tools',   path: '/tools'    },
  { name: 'Blog',    path: '/blog'     },
  { name: 'Contact', path: '/contact'  },
];
// Creative gallery → footer link only (keeps navbar clean)
```

---

## Recommended Build Order

```
Week 1  → Sanity buildLog schema + 3 backdated entries + GitHub feed on homepage
Week 2  → /lab page (full build diary)
Week 3  → Upgraded contact/collab form
Week 4  → /tools page (all 4 calculators)
Month 2 → Open project files on GitHub + link from project cards
Month 2 → Newsletter subscribe on /lab
Month 3 → IoT dashboard (ESP32 + Supabase)
Later   → Parts inventory, creative gallery
```

---

*Built from repo analysis + personal details. Last updated April 2025.*
