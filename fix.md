# fix.md — Aryan Gulhane Portfolio Overhaul
> Complete guide: bug fixes for the current site + full spec for the new "real me" rebuild.

---

## PART 1 — Fixes for the Current Site (existing codebase)

These are bugs, cleanup tasks, and corrections in the current repo that should be addressed regardless of whether you rebuild or patch.

---

### 1. Remove `.next/` from git (CRITICAL)

The `/backend/.next/` build output folder is committed to the repo. This is wrong — it bloats the repo and should never be tracked.

**Fix:**
```bash
# In repo root
echo ".next/" >> .gitignore
git rm -r --cached backend/.next
git commit -m "chore: remove .next build artifacts from tracking"
```

---

### 2. Delete the stale `Hero.tsx` component

`/frontend/src/components/Hero.tsx` is an old, completely different version of the hero section that is never imported anywhere. It's dead code.

**Fix:**
```bash
rm frontend/src/components/Hero.tsx
```

---

### 3. Fix the double animation loop in `BackgroundScene.tsx`

There are two `requestAnimationFrame` loops running simultaneously — `animate()` calls `requestAnimationFrame(animate)` internally, and then `startAnimation()` wraps it in another `requestAnimationFrame(startAnimation)`. The cleanup also only cancels the outer loop ID.

**Fix — replace the animation start/cleanup block:**
```ts
// BEFORE (buggy)
const startAnimation = () => {
  animate();
  animationFrameId = requestAnimationFrame(startAnimation);
};
startAnimation();

// AFTER (correct)
let animationFrameId: number;
const loop = () => {
  animationFrameId = requestAnimationFrame(loop);
  const elapsedTime = clock.getElapsedTime();
  particlesMesh.rotation.y = elapsedTime * 0.05;
  particlesMesh.rotation.x = mouse.y * 0.1;
  particlesMesh.rotation.y += mouse.x * 0.1;
  renderer.render(scene, camera);
};
loop();

// cleanup stays the same:
// cancelAnimationFrame(animationFrameId);
```

---

### 4. Remove unused `introDone` state in `about/page.tsx`

```ts
// DELETE this line — it's declared but never used
const [introDone, setIntroDone] = useState(false);
```

---

### 5. Fix hardcoded placeholder project data

In both `frontend/src/app/page.tsx` and `frontend/src/app/projects/page.tsx`, projects have:
- `links: { live: '#', repo: '#' }` — placeholder links
- `/project1.jpg`, `/project2.jpg` — images that don't exist
- Fake project titles that don't represent real work

**Fix:** Replace with your real projects (see Part 2 for full project list to use).

---

### 6. Fix the About page fake experience entry

The timeline shows "Senior Full-Stack Developer at Tech Solutions Inc. • 2022 - Present" — this is template filler that contradicts the student intro directly above it.

**Fix — replace with real entries:**
```ts
// REAL experience
<TimelineItem
  title="Hardware Intern"
  subtitle="High Dynamics • 2025 - Present"
  description="Building battery packs and power distribution boards for drones. Currently assembling a 3S 12V LiPo pack with connectors and working on a custom PDB."
  icon={<FaBolt />}
/>

// REAL education
<TimelineItem
  title="B.Tech in Computer Science"
  subtitle="MIT ADT University • 2025 - 2029 (Expected)"
  description="First-year CS student with a focus on electronics, embedded systems, and AI. Participating in hardware projects and internships alongside academics."
  icon={<FaGraduationCap />}
/>
```

---

### 7. Fix the About page bio typos

```
// BEFORE (typo-filled draft)
"I am a Student, facinated about the Technologies Currently working on Wed Developent and Artificial Intelligence"

// AFTER (honest, real you)
"First-year CS student at MIT ADT. I tinker with electronics, build circuits, and explore embedded systems — from home automation to drone hardware. I use AI as a tool, not a career goal."
```

---

### 8. Fix the About page stats (misleading numbers)

```
// BEFORE
"5+" → "Time when started exploration" (vague and meaningless)
"4+" → "Projects worked on"
"1"  → "Open Source Contributions"

// AFTER (real numbers)
"9th Grade" → "When I built my first robot"
"6+"        → "Hardware projects built"
"1"         → "Active internship"
```

---

### 9. Add a `.env.example` file

Anyone cloning the repo (or future-you) needs to know what env vars are required.

**Create `/frontend/.env.example`:**
```env
# Resend — for the contact form API
RESEND_API_KEY=your_resend_api_key_here
EMAIL_RECIPIENT=your_email@example.com

# Sanity — for blog content
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

---

### 10. Remove duplicate Sanity schema files in backend

The backend has both `category.ts` + `categoryType.ts` and `post.ts` + `postType.ts`. Pick one naming convention and delete the duplicates.

```bash
# Check which is actually imported in index.ts, then delete the unused ones
cat backend/sanity/schemaTypes/index.ts
rm backend/sanity/schemaTypes/category.ts   # if categoryType.ts is the one imported
rm backend/sanity/schemaTypes/post.ts       # if postType.ts is the one imported
```

---

### 11. Update Next.js from 14.0.0

Next.js 14.0.0 has known bugs. Update to at least 14.2.x or preferably 15.x.

```bash
cd frontend
npm install next@latest react@latest react-dom@latest
```

---

---

## PART 2 — New Site Spec: "The Real Aryan"

This is a full specification for rebuilding the portfolio to actually represent who you are — a hardware tinkerer, electronics enthusiast, B.Tech student, drone intern, and curious maker who also loves physics, music, and filmmaking.

**Audience:** Fellow students, makers, potential collaborators, businesses wanting to work with you.
**Vibe:** Builder / Tinkerer — hands-on, raw, curious. Not corporate. Not "hire me as a web dev."

---

### Tech Stack (keep what works, simplify what doesn't)

```
Frontend:   Next.js 15 + TypeScript + Tailwind CSS
Animations: Framer Motion (keep — it's good)
3D:         Three.js (keep for background — fits the maker aesthetic)
CMS:        Sanity (keep for blog only)
Email:      Resend (keep for contact form)
Fonts:      JetBrains Mono (code/terminal feel) + Inter (body)
Theme:      Dark by default — hardware/maker aesthetic. Light mode optional.
```

---

### Site Structure (Pages)

```
/               → Home (hero + about snippet + projects preview + current build)
/projects       → All hardware + software projects
/lab            → "What I'm building now" — live log / work in progress
/about          → Full about: who I am, interests, timeline, skills
/blog           → Sanity-powered writing (keep existing)
/contact        → Contact + collaboration CTA
```

---

### Page 1: Home (`/`)

#### Hero Section
- Headline: `"I build things."` (simple, confident, true)
- Subheading (typewriter cycling through):
  - `> Electronics & Embedded Systems`
  - `> ESP32 / Arduino Tinkerer`
  - `> Drone Hardware @ High Dynamics`
  - `> B.Tech CS • MIT ADT '29`
- Two CTA buttons: `See My Projects` and `Work With Me`
- Background: keep the Three.js particle canvas — fits the aesthetic

#### "Currently Building" Strip
A single highlighted card pinned below the hero showing your active project:
```
🔧 LIVE BUILD: Power Distribution Board (PDB) for drone
   @ High Dynamics Internship — In Progress
```
This updates whenever you're working on something new. It shows people you're active.

#### Projects Preview
3 cards — your most impressive real projects (see projects list below). Link to `/projects`.

#### "A bit about me" Section
Short 3-line honest bio + 3 stat cards:
- "Built my first robot in Class 9"
- "6+ hardware projects"  
- "Currently interning at High Dynamics"

#### Interests Row
Small icon pills showing: Electronics · Embedded Systems · Physics · Music · Photography · Filmmaking

---

### Page 2: Projects (`/projects`)

Replace all hardcoded fake projects with your real ones. Use filter tags: `Hardware`, `Embedded`, `Automation`, `IoT`, `Web`.

**Real Projects to add:**

```yaml
- title: "4-Channel Home Automation System"
  tags: [Hardware, Automation, IoT]
  description: >
    Built in Class 10. Controls 4 home appliances remotely using ESP32
    with both Rainmaker and Blynk IoT platforms. Includes relay switching
    and smartphone control.
  status: Completed
  image: (photo of your actual build)
  repo: (github link if exists)

- title: "Obstacle Avoiding Robot"
  tags: [Hardware, Robotics, Embedded]
  description: >
    Built in Class 9. Autonomous robot using ultrasonic sensors and Arduino
    to detect and avoid obstacles in real time.
  status: Completed
  image: (photo)

- title: "ESP32 Data Logger via Web Server"
  tags: [Hardware, IoT, Embedded]
  description: >
    Logs sensor data to a local web server hosted on the ESP32 itself.
    Accessible from any browser on the same network — no cloud required.
  status: Completed

- title: "Bluetooth Relay Controller"
  tags: [Hardware, Embedded, IoT]
  description: >
    Bluetooth serial communication between ESP32 and a mobile device to
    toggle relays on/off. Simple, fast, wireless control over hardware.
  status: Completed

- title: "3S 12V LiPo Battery Pack for Drone"
  tags: [Hardware, Drone]
  description: >
    Built during internship at High Dynamics. A 3-cell 12V LiPo pack with
    connectors, assembled for drone power systems.
  status: Completed
  context: High Dynamics Internship

- title: "Power Distribution Board (PDB)"
  tags: [Hardware, Drone, Electronics]
  description: >
    Currently designing and building a custom PDB for drone systems
    at High Dynamics. Handles power routing from battery to ESCs and
    other drone components.
  status: 🔧 In Progress
  context: High Dynamics Internship
```

Each card should show: title, status badge (Completed / In Progress), tags, short description, optional GitHub link, optional photo.

---

### Page 3: Lab (`/lab`) — NEW PAGE

This is the most unique page on the site. A running log of what you're currently exploring, learning, or breaking.

**Format:** Reverse-chronological entries, like a build log or captain's log.

```
[April 2025]  Working on PDB layout — learning KiCad for PCB design
[March 2025]  Completed 3S battery pack at High Dynamics
[Feb 2025]    Exploring I2C communication between sensors
[Jan 2025]    Started B.Tech — setting up lab bench at home
```

This can be a simple hardcoded array at first, then moved to Sanity later.
It signals to visitors: this person is *always building something*.

---

### Page 4: About (`/about`)

Rewrite completely. Structure:

#### Hero
- Name, one-liner: `"Engineer in training. Tinkerer by nature."`
- Real bio paragraph:
  > "I'm Aryan — a first-year CS student at MIT ADT University who's more comfortable with a soldering iron than a Figma file. I got into electronics in school, built my first robot in Class 9, and since then I've been hooked on making hardware do things. I'm currently interning at High Dynamics where I work on drone hardware. I use code as a tool — especially AI — but my real interest is in the physical world: circuits, embedded systems, and anything that blinks, moves, or beeps."

#### Skills (honest, hardware-first)
```
Hardware & Electronics:   ESP32, Arduino, relay circuits, LiPo battery systems, PCB basics
Embedded / Firmware:      C/C++ for microcontrollers, Bluetooth serial, web servers on ESP
Platforms & Tools:        Blynk IoT, ESP Rainmaker, KiCad (learning), Git
Languages:                C/C++, Python (basics), JavaScript (enough to build tools)
```
Remove the fake "90% React", "85% TypeScript" skill bars — they're not honest.

#### Timeline (real)
```
[2025 - Present]  Hardware Intern @ High Dynamics — drone battery packs, PDB design
[2025 - 2029]     B.Tech CS @ MIT ADT University
[Class 10]        4-Channel Home Automation with ESP32 + Rainmaker/Blynk
[Class 9]         Built first obstacle-avoiding robot with Arduino
```

#### Interests Section
Small cards or icons for: Physics · Music · Photography · Filmmaking · Electronics

#### "Work with me" CTA
> "If you're a student wanting to collaborate, a business with a hardware/IoT project, or just someone building something cool — let's talk."
Button → `/contact`

---

### Page 5: Contact (`/contact`)

Keep the Resend-powered form. Update the copy:

```
// HEADLINE
"Let's build something."

// SUBTEXT
"Whether you're a student with an idea, a business with a hardware project,
or someone who just wants to geek out about circuits — my inbox is open."

// FORM FIELDS
Name, Email, "What are you working on?" (textarea), Send

// BELOW FORM — social links
GitHub: github.com/Aryangulhane
Email: aryangulhane6@gmail.com
```

---

### Visual / Design Direction

```
Color Palette:
  Background:   #0a0a0a (near black)
  Surface:      #111111
  Border:       #222222
  Accent:       #f97316 (orange — maker/hardware feel, not "tech startup blue")
  Text:         #e5e5e5
  Muted:        #666666

Typography:
  Headings:     JetBrains Mono or Space Grotesk
  Body:         Inter
  Code/labels:  JetBrains Mono

Design Notes:
  - NO fake skill percentage bars
  - NO stock-photo project images — use real photos of your builds, or circuit/schematic SVGs
  - Status badges on projects: green "Completed" / orange "In Progress"
  - The "Currently Building" card on home should feel like a terminal readout
  - Keep the Three.js particle background on home — it works
  - Minimal glassmorphism is fine, but don't overdo it
```

---

### Content You Still Need to Gather

Before giving this to Codex / any AI builder, collect:

- [ ] Photos of your actual projects (home automation board, robot, ESP32 setups)
- [ ] Your GitHub username confirmed: `Aryangulhane`
- [ ] Your actual email: `aryangulhane6@gmail.com`
- [ ] A profile photo you're happy with
- [ ] Any short video clips from your filmmaking/photography for the about page (optional)
- [ ] Decide: do you want Sanity blog to stay? (Recommended: yes, move lab log there too)

---

### Prompt Template for Codex / AI Builder

When you hand this to Codex or another AI, use this as your starting prompt:

```
I have an existing Next.js 15 + TypeScript + Tailwind CSS portfolio.
I want to rebuild it based on the spec in fix.md.

Key facts about me:
- Name: Aryan Gulhane
- I'm a B.Tech CS student at MIT ADT (2025-2029), 1st year
- My real interest is electronics and embedded systems — NOT web development
- I'm currently interning at High Dynamics building drone hardware (battery packs, PDB)
- Past projects: obstacle-avoiding robot (Arduino), 4-channel home automation (ESP32 + Blynk/Rainmaker), ESP32 data logger, Bluetooth relay controller
- Other interests: Physics, Music, Photography, Filmmaking
- GitHub: Aryangulhane
- Target audience: students, makers, potential collaborators and business clients

Vibe: Builder/Tinkerer — dark theme, orange accent, honest, no fake skill bars,
hardware-first, feels like a maker's corner of the internet.

Pages to build: Home, Projects, Lab (build log), About, Blog (existing Sanity), Contact.

Please start with [page name] and follow the spec in fix.md.
```

---

*Generated from repo analysis + personal details shared by Aryan Gulhane, April 2025.*
