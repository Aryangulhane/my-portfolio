// src/app/contact/page.tsx
"use client";

import { useState, ChangeEvent, FormEvent, FC, ReactNode, useRef, MouseEvent, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaCopy,
  FaCheck,
  FaInstagram,
  FaTwitter,
  FaSpotify,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaCalendar,
  FaArrowRight,
  FaPaperPlane,
  FaRocket,
  FaLightbulb,
  FaCode,
  FaDownload,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FiLoader, FiCheckCircle, FiAlertTriangle, FiSend, FiMail, FiUser, FiMessageSquare } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

// --- Main Page Component ---
export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background px-4 py-24 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_100%_at_50%_0%,rgba(var(--primary-rgb),0.1)_0%,rgba(var(--primary-rgb),0)_100%)]"
      />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Mouse Follower Effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30"
        animate={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb), 0.08), transparent 80%)`
        }}
      />

      {/* Confetti Effect */}
      {showConfetti && <ConfettiEffect />}

      <div className="container mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-6 py-2 text-sm font-semibold text-primary"
            whileHover={{ scale: 1.05 }}
          >
            <HiSparkles className="animate-pulse" />
            Available for New Projects
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16"
        >
          <ContactInfo currentTime={currentTime} />
          <ContactForm onSuccess={() => setShowConfetti(true)} />
        </motion.div>

        {/* Stats Section */}
        <StatsSection />

        {/* Quick Links Section */}
        <QuickLinksSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Calendar Booking Section */}
        <CalendarSection />
      </div>
    </div>
  );
}

// --- Helper Components ---

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

const FloatingParticles = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-2 w-2 rounded-full bg-primary/20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

const ConfettiEffect = () => (
  <div className="pointer-events-none fixed inset-0 z-50">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-3 w-3 rounded-full"
        style={{
          backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][i % 5],
          left: `${Math.random() * 100}%`,
          top: -20,
        }}
        animate={{
          y: window.innerHeight + 100,
          rotate: 360,
          opacity: [1, 0],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 0.5,
        }}
      />
    ))}
  </div>
);

const ContactInfo: FC<{ currentTime: Date }> = ({ currentTime }) => {
  const [activeTab, setActiveTab] = useState<'social' | 'details'>('social');

  return (
    <motion.div
      variants={containerVariants}
      className="flex flex-col justify-center"
    >
      <motion.div
        variants={itemVariants}
        className="cyber-text mb-6 text-5xl font-bold lg:text-6xl"
      >
        <TypeAnimation
          sequence={[
            "Let's Build Something.",
            2000,
            "Solving Problems with Code.",
            2000,
            "Crafting Digital Experiences.",
            2000,
            "Have an Idea? Let's Talk.",
            3000,
          ]}
          wrapper="span"
          speed={50}
          className="gradient-text"
          repeat={Infinity}
          cursor={true}
        />
      </motion.div>

      <motion.p variants={itemVariants} className="mb-8 text-lg text-muted-foreground">
        As of October 2025, I am available for freelance work and open to discussing new projects. 
        Let's create something amazing together.
      </motion.p>

      {/* Live Status Card */}
      <motion.div
        variants={itemVariants}
        className="mb-8 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="h-3 w-3 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-semibold">Available Now</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FaClock />
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZone: 'Asia/Kolkata' 
            })} IST
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Response time: Usually within 24 hours</p>
        </div>
      </motion.div>

      {/* Tab Switcher */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex gap-2 rounded-xl bg-secondary p-1">
          <button
            onClick={() => setActiveTab('social')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'social' 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Social Links
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'details' 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Contact Details
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === 'social' ? (
          <motion.div
            key="social"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-3"
          >
            <EmailContactDetail icon={<FaEnvelope />} email="aryangulhane6@gmail.com" />
            <AnimatedContactDetail
              icon={<FaLinkedin />}
              text="Connect on LinkedIn"
              href="https://www.linkedin.com/in/aryan-gulhane"
              color="hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/30"
            />
            <AnimatedContactDetail
              icon={<FaGithub />}
              text="Explore my Projects"
              href="https://github.com/Aryangulhane"
              color="hover:bg-foreground/10 hover:text-foreground hover:border-foreground/30"
            />
            <AnimatedContactDetail
              icon={<FaInstagram />}
              text="Explore my Life"
              href="https://instagram.com/aryangulhane21"
              color="hover:bg-[#E4405F]/10 hover:text-[#E4405F] hover:border-[#E4405F]/30"
            />
            <AnimatedContactDetail
              icon={<FaTwitter />}
              text="Explore my Thoughts"
              href="https://x.com/AryanGulhane3"
              color="hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30"
            />
            <AnimatedContactDetail
              icon={<FaSpotify />}
              text="Know my Music Taste"
              href="https://open.spotify.com/user/31lmnozvyi6m4ynu7sdbgbfnkmyq"
              color="hover:bg-[#1DB954]/10 hover:text-[#1DB954] hover:border-[#1DB954]/30"
            />
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            <InfoCard icon={<FaMapMarkerAlt />} label="Location" value="Pimpri, Maharashtra, India" />
            <InfoCard icon={<FaClock />} label="Timezone" value="IST (UTC+5:30)" />
            <InfoCard icon={<FaPhone />} label="Response Time" value="Within 24 hours" />
            <InfoCard icon={<FaCalendar />} label="Availability" value="Open for projects" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Resume Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-primary bg-primary/10 px-6 py-4 font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
      >
        <FaDownload />
        Download Resume
        <FaArrowRight className="ml-auto" />
      </motion.button>
    </motion.div>
  );
};

const EmailContactDetail = ({ icon, email }: { icon: ReactNode; email: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 5 }}
      className="group flex items-center justify-between rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <span className="font-mono text-sm text-muted-foreground sm:text-base">{email}</span>
      </div>
      <motion.button
        onClick={handleCopy}
        className="rounded-lg bg-secondary p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        aria-label="Copy email"
        whileTap={{ scale: 0.9 }}
      >
        {isCopied ? <FaCheck className="text-green-500" /> : <FaCopy />}
      </motion.button>
    </motion.div>
  );
};

const AnimatedContactDetail = ({ icon, text, href, color }: { icon: ReactNode; text: string; href: string; color: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.02, x: 5 }}
    className={`group flex items-center justify-between rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all hover:shadow-lg ${color}`}
  >
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-xl">
        {icon}
      </div>
      <span className="font-medium">{text}</span>
    </div>
    <FaExternalLinkAlt className="text-sm opacity-0 transition-opacity group-hover:opacity-100" />
  </motion.a>
);

const InfoCard = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </motion.div>
);

// ## Enhanced Contact Form ##
const ContactForm: FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "", subject: "", budget: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [selectedService, setSelectedService] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current?.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current?.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (e.target.name === 'message') {
      setCharCount(e.target.value.length);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, service: selectedService }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "An unknown error occurred.");
      }

      setStatus("success");
      setFeedbackMessage("Message received! I'll be in touch shortly.");
      setFormState({ name: "", email: "", message: "", subject: "", budget: "" });
      setCharCount(0);
      setSelectedService("");
      onSuccess();

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
      className="contact-card group relative rounded-3xl border border-border bg-card/50 p-8 shadow-2xl backdrop-blur-sm"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-rgb), 0.15), transparent 80%)`,
        }}
      />
      
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <FormFeedback status="success" message={feedbackMessage} onReset={() => setStatus("idle")} />
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="relative z-10"
          >
            <div className="mb-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl text-primary"
              >
                <FaPaperPlane />
              </motion.div>
              <h3 className="text-3xl font-bold text-foreground">Let's Connect</h3>
              <p className="mt-2 text-sm text-muted-foreground">Fill out the form below and I'll get back to you soon</p>
            </div>

            {/* Service Selection */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-foreground">What can I help you with?</label>
              <div className="grid grid-cols-2 gap-3">
                {['Web Development', 'UI/UX Design', 'Consultation', 'Other'].map((service) => (
                  <motion.button
                    key={service}
                    type="button"
                    onClick={() => setSelectedService(service)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-xl border p-3 text-sm font-medium transition-all ${
                      selectedService === service
                        ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                        : 'border-border bg-secondary hover:border-primary/50'
                    }`}
                  >
                    {service}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <EnhancedFormField 
                  id="name" 
                  label="Your Name" 
                  type="text" 
                  value={formState.name} 
                  onChange={handleChange} 
                  icon={<FiUser />}
                  required 
                />
                <EnhancedFormField 
                  id="email" 
                  label="Your Email" 
                  type="email" 
                  value={formState.email} 
                  onChange={handleChange} 
                  icon={<FiMail />}
                  required 
                />
              </div>

              <EnhancedFormField 
                id="subject" 
                label="Subject" 
                type="text" 
                value={formState.subject} 
                onChange={handleChange} 
                icon={<FiMessageSquare />}
                required 
              />

              <div className="relative">
                <EnhancedFormField 
                  id="message" 
                  label="Your Message" 
                  type="textarea" 
                  value={formState.message} 
                  onChange={handleChange} 
                  icon={<FiMessageSquare />}
                  required 
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Minimum 10 characters</span>
                  <span className={charCount > 500 ? 'text-destructive' : ''}>{charCount}/500</span>
                </div>
              </div>

              <select
                name="budget"
                value={formState.budget}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Select Your Budget Range</option>
                <option value="<$1000">Less than $1,000</option>
                <option value="$1000-$5000">$1,000 - $5,000</option>
                <option value="$5000-$10000">$5,000 - $10,000</option>
                <option value=">$10000">More than $10,000</option>
              </select>

              <AnimatePresence>
                {status === "error" && <FormFeedback key="error" status="error" message={feedbackMessage} />}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={status === "submitting"}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                {status === "submitting" ? (
                  <>
                    <FiLoader className="animate-spin" /> 
                    Sending Message...
                  </>
                ) : (
                  <>
                    <FaRocket className="transition-transform group-hover:translate-x-1" />
                    Send Message
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface EnhancedFormFieldProps {
  id: string;
  label: string;
  type: "text" | "email" | "textarea";
  value: string;
  icon?: ReactNode;
  rows?: number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
}

const EnhancedFormField: FC<EnhancedFormFieldProps> = ({ 
  id, 
  label, 
  type,
  icon,
  rows = 5, 
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const InputComponent = type === "textarea" ? "textarea" : "input";

  const specificProps: any = {};
  if (type === "textarea") {
    specificProps.rows = rows;
  } else {
    specificProps.type = type;
  }

  return (
    <div className="relative">
      {icon && (
        <div className={`absolute left-4 top-3.5 text-muted-foreground transition-colors ${isFocused ? 'text-primary' : ''}`}>
          {icon}
        </div>
      )}
      <InputComponent
        id={id}
        name={id}
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`peer block w-full resize-none rounded-xl border border-border bg-secondary text-foreground transition-all placeholder:text-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          icon ? 'px-12 py-3' : 'px-4 py-3'
        }`}
        {...specificProps}
        {...props}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary ${
          icon ? 'left-12' : 'left-4'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const FormFeedback = ({ status, message, onReset }: { status: "success" | "error"; message: string; onReset?: () => void }) => {
  const isSuccess = status === 'success';
  const Icon = isSuccess ? FiCheckCircle : FiAlertTriangle;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`relative z-10 flex items-center gap-3 rounded-xl p-6 text-sm ${
        isSuccess
          ? 'flex-col justify-center py-12 text-center'
          : 'border border-destructive/20 bg-destructive/10 text-destructive'
      }`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <Icon className={isSuccess ? 'mb-4 text-6xl text-green-500' : 'text-2xl'} />
      </motion.div>
      <div className={isSuccess ? 'flex flex-col' : ''}>
        {isSuccess && <h3 className="mb-2 text-3xl font-bold text-foreground">Message Sent!</h3>}
        <p className={isSuccess ? 'text-lg text-muted-foreground' : ''}>{message}</p>
        {isSuccess && onReset && (
          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground"
          >
            Send Another Message
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

// --- New Sections ---

const StatsSection = () => {
  const stats = [
    { icon: <FaRocket />, value: "50+", label: "Projects Completed" },
    { icon: <FaLightbulb />, value: "100+", label: "Creative Solutions" },
    { icon: <FaCode />, value: "5+", label: "Years Experience" },
    { icon: <FaCheck />, value: "98%", label: "Client Satisfaction" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-24 max-w-6xl"
    >
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 text-center backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              initial={false}
            />
            <div className="relative z-10">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
                {stat.icon}
              </div>
              <motion.div
                className="mb-1 text-3xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const QuickLinksSection = () => {
  const quickLinks = [
    { 
      icon: <FaCode />, 
      title: "View Portfolio", 
      description: "Check out my latest projects and case studies",
      href: "/portfolio",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    { 
      icon: <FaLightbulb />, 
      title: "Read Blog", 
      description: "Explore articles on web development and design",
      href: "/blog",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    { 
      icon: <FaGithub />, 
      title: "GitHub Repos", 
      description: "Browse my open-source contributions",
      href: "https://github.com/Aryangulhane",
      gradient: "from-gray-500/20 to-slate-500/20"
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-24 max-w-6xl"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Quick Links</h2>
        <p className="text-muted-foreground">Explore more about my work and expertise</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {quickLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : '_self'}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-2xl"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
            <div className="relative z-10">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-3xl text-primary transition-transform group-hover:scale-110">
                {link.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{link.title}</h3>
              <p className="text-sm text-muted-foreground">{link.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                Learn More 
                <FaArrowRight className="transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is your typical response time?",
      answer: "I usually respond to all inquiries within 24 hours during business days. For urgent matters, feel free to mention it in your message."
    },
    {
      question: "What services do you offer?",
      answer: "I specialize in full-stack web development with Next.js, React, TypeScript, and modern web technologies. I also offer UI/UX design, consultation, and technical writing services."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! I work with clients worldwide and am comfortable with remote collaboration across different time zones."
    },
    {
      question: "What is your project timeline?",
      answer: "Project timelines vary based on scope and complexity. Typically, small projects take 2-4 weeks, while larger projects may take 2-3 months. We'll discuss specific timelines during our initial consultation."
    },
    {
      question: "How do you handle payments?",
      answer: "I typically work with a 50% upfront payment and 50% upon project completion. For longer projects, we can arrange milestone-based payments. I accept various payment methods including bank transfers and PayPal."
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-24 max-w-4xl"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Find quick answers to common questions</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-secondary/50"
            >
              <span className="pr-4 font-semibold">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaArrowRight className="rotate-90 text-primary" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border p-6 text-muted-foreground">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const CalendarSection = () => {
  const [selectedTime, setSelectedTime] = useState<string>("");

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-24 max-w-4xl"
    >
      <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-card/50 to-card/50 p-8 backdrop-blur-sm md:p-12">
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl text-primary"
          >
            <FaCalendar />
          </motion.div>
          <h2 className="mb-4 text-3xl font-bold">Schedule a Call</h2>
          <p className="text-muted-foreground">
            Book a free 30-minute consultation to discuss your project
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-sm font-semibold">Select a Date</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold">Select a Time (IST)</label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <motion.button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-lg border p-2 text-sm font-medium transition-all ${
                    selectedTime === time
                      ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                      : 'border-border bg-secondary hover:border-primary/50'
                  }`}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-2xl"
        >
          <FaCalendar />
          Confirm Booking
          <FaArrowRight />
        </motion.button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          You'll receive a confirmation email with meeting details
        </p>
      </div>
    </motion.section>
  )}