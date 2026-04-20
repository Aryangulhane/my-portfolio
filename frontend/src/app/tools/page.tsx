// src/app/tools/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
    <motion.div variants={itemVariants} className="rounded-xl border border-border bg-surface p-6 hover:border-primary/20 transition-all">
      <h3 className="font-heading font-bold mb-1">Ohm&apos;s Law <span className="text-primary font-mono text-sm">V = I × R</span></h3>
      <p className="text-xs text-muted-foreground mb-4">Fill any two, solve the third</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[["V", "Voltage (V)", v, setV], ["I", "Current (A)", i, setI], ["R", "Resistance (Ω)", r, setR]].map(([label, ph, val, set]) => (
          <div key={label as string}>
            <label className="text-xs text-muted-foreground font-mono block mb-1">{label as string}</label>
            <input type="number" placeholder={ph as string} value={val as string}
              onChange={e => (set as React.Dispatch<React.SetStateAction<string>>)(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"/>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {(["V","I","R"] as const).map(s => (
          <button key={s} onClick={() => calc(s)}
            className="flex-1 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs py-2.5 font-mono font-semibold hover:bg-primary/20 transition-colors">
            Solve {s}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// --- Voltage Divider ---
function VoltageDivider() {
  const [vin, setVin] = useState(""); const [r1, setR1] = useState(""); const [r2, setR2] = useState("");
  const vout = parseFloat(vin) && parseFloat(r1) && parseFloat(r2)
    ? (parseFloat(vin) * parseFloat(r2) / (parseFloat(r1) + parseFloat(r2))).toFixed(3)
    : null;
  return (
    <motion.div variants={itemVariants} className="rounded-xl border border-border bg-surface p-6 hover:border-primary/20 transition-all">
      <h3 className="font-heading font-bold mb-1">Voltage Divider <span className="text-primary font-mono text-sm">Vout = Vin × R2/(R1+R2)</span></h3>
      <p className="text-xs text-muted-foreground mb-4">Calculate output voltage from a resistor divider</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[["Vin (V)", vin, setVin], ["R1 (Ω)", r1, setR1], ["R2 (Ω)", r2, setR2]].map(([ph, val, set]) => (
          <div key={ph as string}>
            <label className="text-xs text-muted-foreground font-mono block mb-1">{ph as string}</label>
            <input type="number" placeholder={ph as string} value={val as string}
              onChange={e => (set as React.Dispatch<React.SetStateAction<string>>)(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"/>
          </div>
        ))}
      </div>
      {vout && (
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-center">
          <span className="text-primary font-mono font-bold text-lg">Vout = {vout} V</span>
        </div>
      )}
    </motion.div>
  );
}

// --- LED Resistor Calculator ---
function LEDResistor() {
  const [vs, setVs] = useState(""); const [vf, setVf] = useState("2.0"); const [mA, setMA] = useState("20");
  const ohms = parseFloat(vs) && parseFloat(vf) && parseFloat(mA)
    ? Math.ceil((parseFloat(vs) - parseFloat(vf)) / (parseFloat(mA) / 1000))
    : null;
  return (
    <motion.div variants={itemVariants} className="rounded-xl border border-border bg-surface p-6 hover:border-primary/20 transition-all">
      <h3 className="font-heading font-bold mb-1">LED Resistor <span className="text-primary font-mono text-sm">R = (Vs − Vf) / I</span></h3>
      <p className="text-xs text-muted-foreground mb-4">Find the right current-limiting resistor for an LED</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[["Supply V", vs, setVs], ["LED Vf (V)", vf, setVf], ["Current (mA)", mA, setMA]].map(([ph, val, set]) => (
          <div key={ph as string}>
            <label className="text-xs text-muted-foreground font-mono block mb-1">{ph as string}</label>
            <input type="number" placeholder={ph as string} value={val as string}
              onChange={e => (set as React.Dispatch<React.SetStateAction<string>>)(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"/>
          </div>
        ))}
      </div>
      {ohms !== null && ohms > 0 && (
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-center">
          <span className="text-primary font-mono font-bold text-lg">Use ≥ {ohms} Ω resistor</span>
        </div>
      )}
    </motion.div>
  );
}

// --- LiPo Voltage Calculator ---
function LiPoVoltage() {
  const [cells, setCells] = useState("3");
  const n = parseFloat(cells) || 3;
  const full = n * 4.2, nominal = n * 3.7, cutoff = n * 3.0;
  return (
    <motion.div variants={itemVariants} className="rounded-xl border border-border bg-surface p-6 hover:border-primary/20 transition-all">
      <h3 className="font-heading font-bold mb-1">LiPo Pack Voltage</h3>
      <p className="text-xs text-muted-foreground mb-4">Voltage ranges for LiPo packs by cell count</p>
      <div className="mb-4">
        <label className="text-xs text-muted-foreground font-mono block mb-1">Number of cells (S)</label>
        <input type="number" min="1" max="12" value={cells} onChange={e => setCells(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"/>
      </div>
      <div className="space-y-3 font-mono text-sm">
        <div className="flex justify-between items-center rounded-lg bg-green-500/5 border border-green-500/10 px-3 py-2">
          <span className="text-muted-foreground">Fully charged</span>
          <span className="text-green-500 font-bold">{full.toFixed(1)} V</span>
        </div>
        <div className="flex justify-between items-center rounded-lg bg-primary/5 border border-primary/10 px-3 py-2">
          <span className="text-muted-foreground">Nominal</span>
          <span className="text-primary font-bold">{nominal.toFixed(1)} V</span>
        </div>
        <div className="flex justify-between items-center rounded-lg bg-red-500/5 border border-red-500/10 px-3 py-2">
          <span className="text-muted-foreground">Cutoff (don&apos;t go below)</span>
          <span className="text-red-500 font-bold">{cutoff.toFixed(1)} V</span>
        </div>
      </div>
    </motion.div>
  );
}

// --- Power Calculator (bonus) ---
function PowerCalc() {
  const [v, setV] = useState(""); const [i, setI] = useState("");
  const p = parseFloat(v) && parseFloat(i) ? (parseFloat(v) * parseFloat(i)).toFixed(3) : null;
  return (
    <motion.div variants={itemVariants} className="rounded-xl border border-border bg-surface p-6 hover:border-primary/20 transition-all">
      <h3 className="font-heading font-bold mb-1">Power Calculator <span className="text-primary font-mono text-sm">P = V × I</span></h3>
      <p className="text-xs text-muted-foreground mb-4">Calculate power dissipation in your circuit</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[["Voltage (V)", v, setV], ["Current (A)", i, setI]].map(([ph, val, set]) => (
          <div key={ph as string}>
            <label className="text-xs text-muted-foreground font-mono block mb-1">{ph as string}</label>
            <input type="number" placeholder={ph as string} value={val as string}
              onChange={e => (set as React.Dispatch<React.SetStateAction<string>>)(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"/>
          </div>
        ))}
      </div>
      {p && (
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-center">
          <span className="text-primary font-mono font-bold text-lg">P = {p} W</span>
        </div>
      )}
    </motion.div>
  );
}

export default function ToolsPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <div className="container mx-auto px-6 py-24 sm:py-32 max-w-4xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-14">
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              // free tools for makers
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">
              Maker <span className="text-primary">Tools</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Calculators I use all the time. No login, no BS — just open and use.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OhmsLaw />
            <VoltageDivider />
            <LEDResistor />
            <LiPoVoltage />
            <PowerCalc />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
