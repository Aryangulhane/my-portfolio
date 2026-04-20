// src/app/contact/page.tsx
"use client";

import { useState, ChangeEvent, FormEvent, FC, ReactNode, useRef, MouseEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaCopy,
  FaCheck,
  FaClock,
  FaArrowRight,
  FaPaperPlane,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiLoader, FiCheckCircle, FiAlertTriangle, FiUser, FiMessageSquare } from "react-icons/fi";

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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Main Page ---
export default function ContactPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background px-6 py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl">
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
              className="h-2 w-2 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Available for Projects
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4"
          >
            Let&apos;s build <span className="text-primary">something</span>.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-lg text-muted-foreground"
          >
            Whether you&apos;re a student with an idea, a business with a hardware project,
            or someone who just wants to geek out about circuits — my inbox is open.
          </motion.p>
        </motion.div>

        {/* Grid: Info + Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 gap-10 lg:grid-cols-5"
        >
          {/* Left side: info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status card */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="h-2.5 w-2.5 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="font-heading font-semibold text-sm">Available Now</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <FaClock className="text-[10px]" />
                  {currentTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Asia/Kolkata'
                  })} IST
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Response time: Usually within 24 hours
              </p>
            </motion.div>

            {/* Contact details */}
            <motion.div variants={itemVariants} className="space-y-3">
              <EmailRow email="aryangulhane6@gmail.com" />

              <ContactLink
                icon={<FaGithub />}
                text="Aryangulhane"
                href="https://github.com/Aryangulhane"
              />

              <ContactLink
                icon={<FaMapMarkerAlt />}
                text="Loni Kalbhor, Pune, Maharashtra, India"
              />
            </motion.div>

            {/* Quick info */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="font-heading font-semibold text-sm mb-3">What I work on</h3>
              <div className="flex flex-wrap gap-2">
                {['Hardware Projects', 'IoT Systems', 'Embedded Firmware', 'Drone Electronics', 'Automation'].map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono border border-primary/15"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side: form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// --- Email Row with Copy ---
const EmailRow = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 group hover:border-primary/30 transition-all">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm">
          <FaEnvelope />
        </div>
        <span className="font-mono text-sm text-muted-foreground">{email}</span>
      </div>
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.9 }}
        className="rounded-lg bg-secondary p-2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Copy email"
      >
        {copied ? <FaCheck className="text-green-500 text-sm" /> : <FaCopy className="text-sm" />}
      </motion.button>
    </div>
  );
};

// --- Contact Link ---
const ContactLink = ({ icon, text, href }: { icon: ReactNode; text: string; href?: string }) => {
  const Wrapper = href ? 'a' : 'div';
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Wrapper
      {...props}
      className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 group hover:border-primary/30 transition-all"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm">
        {icon}
      </div>
      <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">{text}</span>
    </Wrapper>
  );
};

// --- Contact Form ---
const ContactForm = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      cardRef.current?.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      cardRef.current?.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "An unknown error occurred.");
      }

      setStatus("success");
      setFeedbackMessage("Message received! I'll get back to you soon.");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setFeedbackMessage(error instanceof Error ? error.message : "Failed to send message.");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      variants={itemVariants}
      className="group relative rounded-2xl border border-border bg-surface p-7 sm:p-8"
    >
      {/* Hover glow effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-rgb), 0.08), transparent 80%)`,
        }}
      />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex flex-col items-center justify-center py-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <FiCheckCircle className="text-5xl text-green-500 mb-4" />
            </motion.div>
            <h3 className="text-2xl font-heading font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground mb-6">{feedbackMessage}</p>
            <motion.button
              onClick={() => setStatus("idle")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl bg-primary px-6 py-2.5 font-mono text-sm font-semibold text-primary-foreground"
            >
              Send Another
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 space-y-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaPaperPlane />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">Send a message</h3>
                <p className="text-xs text-muted-foreground">I&apos;ll get back to you within 24 hours</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                id="name"
                label="Your Name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                icon={<FiUser />}
                required
              />
              <FormField
                id="email"
                label="Your Email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                icon={<FaEnvelope />}
                required
              />
            </div>

            <FormField
              id="message"
              label="What are you working on?"
              type="textarea"
              value={formState.message}
              onChange={handleChange}
              icon={<FiMessageSquare />}
              required
              rows={5}
            />

            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
                >
                  <FiAlertTriangle />
                  {feedbackMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === "submitting"}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-mono text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <FiLoader className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <FaArrowRight className="text-xs" />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Form Field ---
interface FormFieldProps {
  id: string;
  label: string;
  type: "text" | "email" | "textarea";
  value: string;
  icon?: ReactNode;
  rows?: number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
}

const FormField: FC<FormFieldProps> = ({ id, label, type, icon, rows = 5, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const InputComponent = type === "textarea" ? "textarea" : "input";

  const specificProps: Record<string, unknown> = {};
  if (type === "textarea") {
    specificProps.rows = rows;
  } else {
    specificProps.type = type;
  }

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-xs font-mono font-medium text-muted-foreground mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className={`absolute left-3 top-3 text-sm transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`}>
            {icon}
          </div>
        )}
        <InputComponent
          id={id}
          name={id}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`block w-full resize-none rounded-xl border border-border bg-background text-foreground text-sm transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 ${icon ? 'pl-10 pr-4 py-3' : 'px-4 py-3'
            }`}
          placeholder={label}
          {...specificProps}
          {...props}
        />
      </div>
    </div>
  );
};