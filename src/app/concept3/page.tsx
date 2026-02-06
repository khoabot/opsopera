"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { OpsOperaLogo } from "@/components/OpsOperaLogo";
import { StaffLines, MusicWaveform } from "@/components/MusicNotes";
import {
  Sparkles,
  Zap,
  BarChart3,
  Bot,
  ArrowRight,
  Check,
  Play,
  Users,
  Clock,
  TrendingUp,
  Heart,
  Menu,
  X,
} from "lucide-react";

const NOTE_SYMBOLS = ["♩", "♪", "♫", "♬", "𝄞"];

function HandDrawnUnderline({ color = "#E07A5F", delay = 0 }: { color?: string; delay?: number }) {
  return (
    <motion.svg
      className="absolute -bottom-2 left-0 w-full"
      viewBox="0 0 200 8"
      preserveAspectRatio="none"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: "easeInOut" }}
    >
      <motion.path
        d="M0,4 C30,2 50,6 80,3 C110,0 140,7 170,4 C185,3 195,5 200,4"
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function MusicStaffSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none overflow-hidden">
        <StaffLines className="text-sheet-ink" />
        <StaffLines className="text-sheet-ink mt-16" />
        <StaffLines className="text-sheet-ink mt-16" />
        <StaffLines className="text-sheet-ink mt-16" />
        <StaffLines className="text-sheet-ink mt-16" />
        <StaffLines className="text-sheet-ink mt-16" />
        <StaffLines className="text-sheet-ink mt-16" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function NoteIcon({ note, color, size = "md" }: { note: string; color: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" };
  return (
    <motion.span
      className={`inline-block ${sizes[size]}`}
      style={{ color }}
      whileHover={{ scale: 1.3, rotate: 15 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {note}
    </motion.span>
  );
}

const features = [
  {
    icon: Bot,
    title: "Smart Compose",
    description: "AI writes the score for your operations. Tell it what you need, and watch it compose the perfect automation.",
    color: "#E07A5F",
    note: "𝄞",
  },
  {
    icon: Zap,
    title: "Quick Tempo",
    description: "Set up in minutes, not months. Our intuitive builder lets you go from idea to automation at allegro speed.",
    color: "#3D9B8F",
    note: "♪",
  },
  {
    icon: BarChart3,
    title: "Score Reader",
    description: "Analytics that tell the full story. See every note of your operations performance, beautifully visualized.",
    color: "#9B7EC8",
    note: "♫",
  },
  {
    icon: Users,
    title: "Ensemble Mode",
    description: "Built for teams. Collaborate on workflows like musicians in an ensemble — everyone in sync, every time.",
    color: "#E07A5F",
    note: "♬",
  },
];

const testimonials = [
  {
    quote: "We went from drowning in manual tasks to having everything humming along perfectly.",
    author: "Maria Gonzales",
    role: "COO, BrightPath",
    avatar: "MG",
  },
  {
    quote: "The whimsical approach actually makes people WANT to build automations. That's rare.",
    author: "James Park",
    role: "Head of Ops, Runway",
    avatar: "JP",
  },
  {
    quote: "Our team saved 30+ hours per week. And honestly? They have fun using it.",
    author: "Aisha Patel",
    role: "VP Engineering, ModalAI",
    avatar: "AP",
  },
];

const workflowNotes = [
  { position: 0, label: "Trigger", color: "#E07A5F", icon: "🎵" },
  { position: 1, label: "Condition", color: "#3D9B8F", icon: "🎶" },
  { position: 2, label: "Action", color: "#9B7EC8", icon: "🎼" },
  { position: 3, label: "Result", color: "#E07A5F", icon: "🎵" },
];

export default function SheetMusic() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [workflowPlaying, setWorkflowPlaying] = useState(false);
  const [activeNote, setActiveNote] = useState(-1);

  const playWorkflow = () => {
    setWorkflowPlaying(true);
    setActiveNote(-1);
    workflowNotes.forEach((_, i) => {
      setTimeout(() => setActiveNote(i), i * 600);
    });
    setTimeout(() => {
      setWorkflowPlaying(false);
    }, workflowNotes.length * 600 + 800);
  };

  return (
    <div className="min-h-screen bg-sheet-cream text-sheet-ink overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-sheet-cream/90 backdrop-blur-sm border-b border-sheet-staff/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <OpsOperaLogo variant="sheet" size="sm" />
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ fontFamily: "Georgia, serif" }}>
            <a href="#features" className="text-sheet-ink/50 hover:text-sheet-accent transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sheet-ink/50 hover:text-sheet-accent transition-colors">
              How It Works
            </a>
            <a href="#stories" className="text-sheet-ink/50 hover:text-sheet-accent transition-colors">
              Stories
            </a>
            <a href="#pricing" className="text-sheet-ink/50 hover:text-sheet-accent transition-colors">
              Pricing
            </a>
            <button className="px-5 py-2 bg-sheet-accent text-white font-medium rounded-full hover:bg-sheet-accent/90 transition-colors">
              Get Started Free
            </button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <a href="/" className="hidden md:block text-sheet-ink/40 hover:text-sheet-accent text-sm transition-colors">
            ← Concepts
          </a>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden px-6 pb-4 space-y-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <a href="#features" className="block text-sheet-ink/70 py-2">Features</a>
              <a href="#how-it-works" className="block text-sheet-ink/70 py-2">How It Works</a>
              <a href="#stories" className="block text-sheet-ink/70 py-2">Stories</a>
              <a href="/" className="block text-sheet-accent py-2">← All Concepts</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <MusicStaffSection className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Scattered music notes decoration */}
          <div className="relative">
            {NOTE_SYMBOLS.map((note, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl md:text-3xl"
                style={{
                  color: ["#E07A5F", "#3D9B8F", "#9B7EC8", "#E07A5F", "#3D9B8F"][i],
                  left: `${[5, 85, 15, 75, 50][i]}%`,
                  top: `${[-20, -10, 80, 70, -30][i]}px`,
                  opacity: 0.3,
                }}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {note}
              </motion.span>
            ))}

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <span className="text-sheet-ink">Make your ops </span>
              <span className="relative inline-block">
                <span className="text-sheet-accent">sing</span>
                <HandDrawnUnderline color="#E07A5F" />
              </span>
            </h1>
          </div>

          <motion.p
            className="mt-8 text-xl md:text-2xl text-sheet-ink/60 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            OpsOpera is the delightfully smart way to automate your business.
            Less stress, more harmony.
            <NoteIcon note=" ♪" color="#3D9B8F" size="md" />
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button className="group px-8 py-4 bg-sheet-accent text-white font-semibold text-lg rounded-full hover:bg-sheet-accent/90 transition-all shadow-lg shadow-sheet-accent/20 hover:shadow-xl hover:shadow-sheet-accent/30"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Start composing — it&apos;s free
              <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="px-8 py-4 border-2 border-sheet-staff text-sheet-ink/70 rounded-full hover:border-sheet-accent hover:text-sheet-accent transition-all"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <Play className="inline mr-2 w-5 h-5" />
              See a quick demo
            </button>
          </motion.div>

          {/* Fun illustration: workflow as a music staff */}
          <motion.div
            className="mt-20 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="relative bg-sheet-paper rounded-2xl p-8 border border-sheet-staff/50 shadow-sm">
              <div className="absolute top-3 right-4 text-sheet-ink/20 text-sm" style={{ fontFamily: "Georgia, serif" }}>
                Workflow in C Major
              </div>
              {/* Staff lines */}
              <svg className="w-full" height="80" viewBox="0 0 600 80">
                {[16, 28, 40, 52, 64].map((y) => (
                  <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#D4C5B0" strokeWidth="1" />
                ))}
                {/* Treble clef */}
                <text x="10" y="50" fontSize="36" fill="#2C1810" opacity="0.4">
                  𝄞
                </text>
                {/* Notes on the staff */}
                {workflowNotes.map((wn, i) => {
                  const x = 120 + i * 130;
                  const yPositions = [52, 28, 40, 20];
                  const y = yPositions[i];
                  return (
                    <g key={i}>
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={activeNote >= i ? 8 : 6}
                        fill={activeNote >= i ? wn.color : `${wn.color}60`}
                        animate={
                          activeNote === i
                            ? { scale: [1, 1.4, 1], fill: wn.color }
                            : {}
                        }
                        transition={{ duration: 0.3 }}
                      />
                      <line
                        x1={x + 6}
                        y1={y}
                        x2={x + 6}
                        y2={y - 30}
                        stroke={activeNote >= i ? wn.color : `${wn.color}60`}
                        strokeWidth="2"
                      />
                      <text
                        x={x}
                        y="78"
                        textAnchor="middle"
                        fontSize="10"
                        fill="#2C1810"
                        opacity="0.6"
                      >
                        {wn.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <div className="mt-4 text-center">
                <button
                  onClick={playWorkflow}
                  disabled={workflowPlaying}
                  className="px-6 py-2 bg-sheet-teal text-white rounded-full text-sm font-medium hover:bg-sheet-teal/90 transition-all disabled:opacity-50"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {workflowPlaying ? (
                    <span className="flex items-center gap-2">
                      <MusicWaveform color="white" barCount={8} />
                      Playing...
                    </span>
                  ) : (
                    "♪ Play this workflow"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </MusicStaffSection>

      {/* Trusted by */}
      <section className="py-16 px-6 border-y border-sheet-staff/20 bg-sheet-paper/50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sheet-ink/40 text-sm mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Trusted by teams who love what they do
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30">
            {["TechScale", "BrightPath", "Runway", "ModalAI", "Clearbit", "Retool"].map((co) => (
              <span key={co} className="text-lg font-bold text-sheet-ink" style={{ fontFamily: "Georgia, serif" }}>
                {co}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Everything in{" "}
            <span className="relative inline-block">
              <span className="text-sheet-teal">harmony</span>
              <HandDrawnUnderline color="#3D9B8F" delay={0.3} />
            </span>
          </h2>
          <p className="mt-4 text-sheet-ink/50 text-lg max-w-xl mx-auto" style={{ fontFamily: "Georgia, serif" }}>
            Simple tools, composed beautifully to make your work feel effortless.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group p-8 rounded-2xl bg-white border border-sheet-staff/30 hover:border-sheet-accent/30 transition-all hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${feature.color}15` }}>
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <NoteIcon note={feature.note} color={feature.color} />
              </div>
              <h3
                className="text-xl font-bold text-sheet-ink mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {feature.title}
              </h3>
              <p className="text-sheet-ink/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <MusicStaffSection>
        <section id="how-it-works" className="py-24 px-6 bg-sheet-paper/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                Three simple{" "}
                <span className="relative inline-block">
                  <span className="text-sheet-lavender">movements</span>
                  <HandDrawnUnderline color="#9B7EC8" delay={0.3} />
                </span>
              </h2>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  step: 1,
                  title: "Describe your workflow",
                  desc: "Tell us what you need in plain English. Our AI understands your operations and composes the perfect automation.",
                  color: "#E07A5F",
                  icon: "✍️",
                },
                {
                  step: 2,
                  title: "Fine-tune your score",
                  desc: "Drag, drop, and adjust. Our visual builder makes it easy to refine your automation until every note is perfect.",
                  color: "#3D9B8F",
                  icon: "🎛️",
                },
                {
                  step: 3,
                  title: "Hit play and relax",
                  desc: "Your automation runs 24/7, handling the busywork while you focus on the work that matters. Take a bow.",
                  color: "#9B7EC8",
                  icon: "🎵",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.step}
                  className="flex flex-col md:flex-row gap-6 items-start"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-sm font-bold px-2 py-0.5 rounded-full"
                        style={{ color: step.color, backgroundColor: `${step.color}15` }}
                      >
                        Movement {step.step}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
                      {step.title}
                    </h3>
                    <p className="text-sheet-ink/50 leading-relaxed max-w-lg">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </MusicStaffSection>

      {/* Impact Numbers */}
      <section className="py-20 px-6 bg-sheet-ink text-sheet-cream">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Clock, value: "40%", label: "Time saved" },
            { icon: TrendingUp, value: "3x", label: "Productivity boost" },
            { icon: Heart, value: "98%", label: "Customer happiness" },
            { icon: Sparkles, value: "10K+", label: "Workflows created" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <stat.icon className="w-6 h-6 mx-auto mb-3 text-sheet-accent" />
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>
                {stat.value}
              </div>
              <div className="text-sheet-cream/50 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="py-24 px-6 max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
            Happy{" "}
            <span className="relative inline-block">
              <span className="text-sheet-accent">performers</span>
              <HandDrawnUnderline color="#E07A5F" delay={0.3} />
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              className="bg-white rounded-2xl p-8 md:p-12 border border-sheet-staff/30 shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote
                className="text-xl md:text-2xl text-sheet-ink/80 italic leading-relaxed"
                style={{ fontFamily: "Georgia, serif" }}
              >
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-sheet-accent/10 flex items-center justify-center text-sheet-accent font-bold text-sm"
                >
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div className="text-left">
                  <div className="font-bold text-sheet-ink text-sm">
                    {testimonials[activeTestimonial].author}
                  </div>
                  <div className="text-sheet-ink/40 text-xs">
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === activeTestimonial ? "bg-sheet-accent w-8" : "bg-sheet-staff"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-sheet-paper/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
              Simple{" "}
              <span className="relative inline-block">
                <span className="text-sheet-teal">pricing</span>
                <HandDrawnUnderline color="#3D9B8F" delay={0.3} />
              </span>
            </h2>
            <p className="mt-4 text-sheet-ink/50 text-lg" style={{ fontFamily: "Georgia, serif" }}>
              Start free. Scale when you&apos;re ready.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Prelude",
                price: "Free",
                desc: "A gentle introduction",
                color: "#3D9B8F",
                features: ["5 automations", "1,000 runs/mo", "Community support", "Core integrations"],
              },
              {
                name: "Sonata",
                price: "$49",
                desc: "For teams in rhythm",
                color: "#E07A5F",
                popular: true,
                features: [
                  "Unlimited automations",
                  "50K runs/mo",
                  "Priority support",
                  "Advanced analytics",
                  "Team features",
                  "All integrations",
                ],
              },
              {
                name: "Concerto",
                price: "$199",
                desc: "The full performance",
                color: "#9B7EC8",
                features: [
                  "Everything in Sonata",
                  "Unlimited runs",
                  "Dedicated support",
                  "SLA guarantee",
                  "Custom AI models",
                  "On-prem option",
                ],
              },
            ].map((tier, i) => (
              <motion.div
                key={tier.name}
                className={`relative p-8 rounded-2xl border bg-white ${
                  tier.popular
                    ? "border-sheet-accent shadow-lg shadow-sheet-accent/10"
                    : "border-sheet-staff/30"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-sheet-accent text-white text-xs font-bold rounded-full">
                    MOST LOVED ♥
                  </div>
                )}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold" style={{ fontFamily: "Georgia, serif", color: tier.color }}>
                    {tier.name}
                  </h3>
                  <NoteIcon note="♪" color={tier.color} size="sm" />
                </div>
                <p className="text-sheet-ink/40 text-sm mb-4">{tier.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-sheet-ink">{tier.price}</span>
                  {tier.price !== "Free" && <span className="text-sheet-ink/30 text-sm">/month</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-sheet-ink/60">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all ${
                    tier.popular
                      ? "text-white shadow-md"
                      : "border-2 hover:opacity-80"
                  }`}
                  style={{
                    backgroundColor: tier.popular ? tier.color : "transparent",
                    borderColor: tier.color,
                    color: tier.popular ? "white" : tier.color,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {tier.price === "Free" ? "Start free" : "Get started"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center gap-4 text-4xl mb-6 opacity-40">
            {["♩", "♪", "♫", "♬", "♪"].map((n, i) => (
              <motion.span
                key={i}
                style={{ color: ["#E07A5F", "#3D9B8F", "#9B7EC8", "#E07A5F", "#3D9B8F"][i] }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {n}
              </motion.span>
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Ready to make your
            <br />
            operations{" "}
            <span className="relative inline-block">
              <span className="text-sheet-accent">sing</span>
              <HandDrawnUnderline color="#E07A5F" />
            </span>
            ?
          </h2>
          <p className="text-sheet-ink/50 text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: "Georgia, serif" }}>
            Join thousands of teams who&apos;ve turned their chaotic workflows into
            something beautiful.
          </p>
          <a href="/concept3/dashboard" className="group inline-flex items-center px-10 py-5 bg-sheet-accent text-white font-bold text-xl rounded-full hover:bg-sheet-accent/90 transition-all shadow-lg shadow-sheet-accent/20 hover:shadow-xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Start for free
            <ArrowRight className="inline ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sheet-staff/30 py-12 px-6 bg-sheet-paper/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <OpsOperaLogo variant="sheet" size="sm" />
          <p className="text-sheet-ink/30 text-sm" style={{ fontFamily: "Georgia, serif" }}>
            &copy; 2026 OpsOpera. Make your business operations sing.
          </p>
          <div className="flex gap-3 text-xl">
            {["♩", "♪", "♫", "♬"].map((n, i) => (
              <motion.span
                key={i}
                className="cursor-pointer"
                style={{ color: ["#E07A5F", "#3D9B8F", "#9B7EC8", "#E07A5F"][i], opacity: 0.4 }}
                whileHover={{ opacity: 1, scale: 1.3, rotate: 10 }}
              >
                {n}
              </motion.span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
