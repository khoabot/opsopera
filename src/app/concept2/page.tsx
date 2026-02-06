"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { OpsOperaLogo } from "@/components/OpsOperaLogo";
import { ClickNotes, MusicWaveform } from "@/components/MusicNotes";
import {
  Zap,
  Layers,
  Cpu,
  Globe,
  ArrowRight,
  Check,
  ChevronRight,
  Workflow,
  BarChart3,
  Shield,
} from "lucide-react";

const NOTE_SYMBOLS = ["♩", "♪", "♫", "♬", "𝄞"];

function NeonText({
  children,
  color = "pink",
  className = "",
}: {
  children: React.ReactNode;
  color?: "pink" | "blue" | "green";
  className?: string;
}) {
  const glowClass = {
    pink: "neon-glow-pink text-jazz-neon-pink",
    blue: "neon-glow-blue text-jazz-neon-blue",
    green: "text-jazz-neon-green",
  };
  return <span className={`${glowClass[color]} ${className}`}>{children}</span>;
}

function BeatGrid() {
  const [activeBeats, setActiveBeats] = useState<Set<string>>(new Set());
  const rows = 4;
  const cols = 16;

  useEffect(() => {
    let col = 0;
    const interval = setInterval(() => {
      const newBeats = new Set<string>();
      for (let row = 0; row < rows; row++) {
        if (Math.random() > 0.5) {
          newBeats.add(`${row}-${col}`);
        }
      }
      setActiveBeats(newBeats);
      col = (col + 1) % cols;
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const key = `${row}-${col}`;
        const isActive = activeBeats.has(key);
        const colors = ["bg-jazz-neon-pink", "bg-jazz-neon-blue", "bg-jazz-neon-green", "bg-jazz-warm"];
        return (
          <motion.div
            key={key}
            className={`h-3 rounded-sm transition-colors ${
              isActive ? colors[row] : "bg-white/5"
            }`}
            animate={isActive ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.15 }}
          />
        );
      })}
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [count, rounded, target]);

  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

const features = [
  {
    icon: Cpu,
    title: "AI Remixer",
    description: "Machine learning that remixes your processes into optimized workflows — always finding a better groove.",
    color: "text-jazz-neon-pink",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,45,120,0.3)]",
  },
  {
    icon: Workflow,
    title: "Flow State Builder",
    description: "Drag-and-drop automation builder that feels as intuitive as mixing a track. No code required.",
    color: "text-jazz-neon-blue",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]",
  },
  {
    icon: Globe,
    title: "All Access Pass",
    description: "200+ integrations that connect to every app in your stack. One backstage pass to rule them all.",
    color: "text-jazz-neon-green",
    glow: "group-hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]",
  },
  {
    icon: BarChart3,
    title: "Live Mixer",
    description: "Real-time dashboards that visualize your operations like a mixing board — adjust any dial, any time.",
    color: "text-jazz-warm",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,140,66,0.3)]",
  },
  {
    icon: Shield,
    title: "Soundproof Security",
    description: "Enterprise-grade encryption and compliance. Your data stays locked in the booth.",
    color: "text-jazz-neon-blue",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]",
  },
  {
    icon: Layers,
    title: "Multi-Track Workflows",
    description: "Layer multiple automations that work in parallel — like tracks in a mix, building to something amazing.",
    color: "text-jazz-neon-pink",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,45,120,0.3)]",
  },
];

const stats = [
  { value: 10000, suffix: "+", label: "Workflows Automated" },
  { value: 500, suffix: "+", label: "Companies Grooving" },
  { value: 40, suffix: "%", label: "Time Saved on Average" },
  { value: 99.9, suffix: "%", label: "Uptime Guaranteed" },
];

const automationSteps = [
  { icon: "🎤", label: "Input", desc: "Your data comes in from any source" },
  { icon: "🎛️", label: "Process", desc: "AI mixes and transforms it" },
  { icon: "🎧", label: "Monitor", desc: "Watch it all in real-time" },
  { icon: "🔊", label: "Output", desc: "Perfectly orchestrated results" },
];

export default function JazzLounge() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [demoActive, setDemoActive] = useState(false);
  const [demoStep, setDemoStep] = useState(-1);

  const handleDemo = () => {
    setDemoActive(true);
    setDemoStep(0);
    automationSteps.forEach((_, i) => {
      setTimeout(() => setDemoStep(i), i * 700);
    });
    setTimeout(() => {
      setDemoActive(false);
      setDemoStep(-1);
    }, automationSteps.length * 700 + 1000);
  };

  return (
    <div className="min-h-screen bg-jazz-deep text-white overflow-x-hidden">
      <ClickNotes colors={["#FF2D78", "#00D4FF", "#39FF14", "#FF8C42"]} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-lg bg-jazz-deep/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <OpsOperaLogo variant="jazz" size="sm" />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="text-white/50 hover:text-jazz-neon-blue transition-colors">
              Features
            </a>
            <a href="#demo" className="text-white/50 hover:text-jazz-neon-blue transition-colors">
              Demo
            </a>
            <a href="#pricing" className="text-white/50 hover:text-jazz-neon-blue transition-colors">
              Pricing
            </a>
            <button className="px-5 py-2 bg-gradient-to-r from-jazz-neon-pink to-jazz-purple text-white font-bold rounded-full hover:opacity-90 transition-opacity">
              Get Early Access
            </button>
          </div>
          <a href="/" className="text-white/40 hover:text-jazz-neon-blue text-sm transition-colors">
            ← Concepts
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-jazz-neon-pink/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-jazz-neon-blue/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-jazz-purple/20 rounded-full blur-[80px]" />

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block px-4 py-1 mb-6 rounded-full border border-jazz-neon-blue/30 bg-jazz-neon-blue/10 text-jazz-neon-blue text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            ♪ Now in Beta — Drop the beat on busywork
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
            <NeonText color="blue">Ops</NeonText>
            <NeonText color="pink">Opera</NeonText>
          </h1>

          <motion.p
            className="mt-6 text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Make your business operations{" "}
            <span className="text-jazz-neon-pink font-semibold">sing</span>. AI automation
            that finds the{" "}
            <span className="text-jazz-neon-blue font-semibold">rhythm</span> in your
            workflows.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <button className="group px-8 py-4 bg-gradient-to-r from-jazz-neon-pink to-jazz-purple text-white font-bold text-lg rounded-full hover:shadow-[0_0_40px_rgba(255,45,120,0.4)] transition-all">
              Start Your Free Mix
              <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-white/10 text-white/80 rounded-full hover:bg-white/5 hover:border-white/20 transition-all">
              See It Live →
            </button>
          </motion.div>

          {/* Beat Grid visualization */}
          <motion.div
            className="mt-16 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <BeatGrid />
          </motion.div>
        </motion.div>

        {/* Floating music notes in background */}
        {NOTE_SYMBOLS.map((note, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              color: ["#FF2D78", "#00D4FF", "#39FF14", "#FF8C42", "#6B21A8"][i],
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {note}
          </motion.span>
        ))}
      </section>

      {/* Stats bar */}
      <section className="py-12 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-black text-jazz-neon-blue">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/40 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Your <NeonText color="pink">Full</NeonText> Lineup
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto">
            Every tool tuned to perfection. Every feature dropping heat.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={`group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer ${feature.glow}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              <motion.div
                className="mt-4 flex items-center gap-1 text-sm font-medium"
                style={{ color: feature.color.replace("text-", "").startsWith("jazz") ? undefined : undefined }}
              >
                <span className={feature.color}>Learn more</span>
                <ChevronRight className={`w-4 h-4 ${feature.color}`} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Demo / Automation Flow */}
      <section id="demo" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Watch the <NeonText color="blue">Magic</NeonText>
            </h2>
            <p className="mt-4 text-white/50 text-lg">
              See how OpsOpera remixes your workflow in real-time
            </p>
          </motion.div>

          {/* Automation pipeline visualization */}
          <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {automationSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  className={`relative text-center p-6 rounded-xl border transition-all ${
                    demoStep >= i
                      ? "border-jazz-neon-blue/50 bg-jazz-neon-blue/10"
                      : "border-white/5 bg-white/[0.02]"
                  }`}
                  animate={demoStep === i ? { scale: [1, 1.05, 1] } : {}}
                >
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <div className="font-bold text-white text-sm">{step.label}</div>
                  <div className="text-white/40 text-xs mt-1">{step.desc}</div>
                  {demoStep >= i && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-jazz-neon-green flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Check className="w-3 h-3 text-jazz-deep" />
                    </motion.div>
                  )}
                  {i < automationSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ChevronRight
                        className={`w-4 h-4 ${
                          demoStep > i ? "text-jazz-neon-blue" : "text-white/20"
                        }`}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {demoActive && (
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <MusicWaveform color="#00D4FF" barCount={32} />
              </motion.div>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={handleDemo}
                disabled={demoActive}
                className="px-8 py-3 bg-gradient-to-r from-jazz-neon-blue to-jazz-purple text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all disabled:opacity-50"
              >
                {demoActive ? "♪ Mixing..." : "▶ Run Demo"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Pick Your <NeonText color="pink">Track</NeonText>
          </h2>
          <p className="mt-4 text-white/50 text-lg">Simple pricing. No hidden fees. Cancel anytime.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Solo",
              price: "Free",
              desc: "Perfect for trying the vibe",
              color: "border-white/10",
              features: ["5 automations", "1K runs/mo", "Community access", "Basic dashboard"],
            },
            {
              name: "Band",
              price: "$49",
              desc: "For teams finding their groove",
              color: "border-jazz-neon-pink/50",
              popular: true,
              features: [
                "Unlimited automations",
                "50K runs/mo",
                "Priority support",
                "Advanced analytics",
                "Team collaboration",
                "Custom integrations",
              ],
            },
            {
              name: "Festival",
              price: "$199",
              desc: "For headliners who need it all",
              color: "border-jazz-neon-blue/50",
              features: [
                "Everything in Band",
                "Unlimited runs",
                "Dedicated CSM",
                "SLA guarantee",
                "Custom AI models",
                "SSO & SAML",
              ],
            },
          ].map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`relative p-8 rounded-2xl border bg-white/[0.02] ${tier.color}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-jazz-neon-pink to-jazz-purple text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-black text-white mb-1">{tier.name}</h3>
              <p className="text-white/40 text-sm mb-4">{tier.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-jazz-neon-blue">{tier.price}</span>
                {tier.price !== "Free" && <span className="text-white/30 text-sm">/month</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 text-jazz-neon-green mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-full font-bold transition-all ${
                  tier.popular
                    ? "bg-gradient-to-r from-jazz-neon-pink to-jazz-purple text-white hover:shadow-[0_0_30px_rgba(255,45,120,0.3)]"
                    : "border border-white/10 text-white/80 hover:bg-white/5"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jazz-purple/10 to-transparent" />
        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Ready to <NeonText color="blue">Drop</NeonText> the Beat?
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
            Join the movement. Let AI compose your workflows while you focus on what matters.
          </p>
          <a href="/concept2/dashboard" className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-jazz-neon-pink via-jazz-purple to-jazz-neon-blue text-white font-black text-xl rounded-full hover:shadow-[0_0_60px_rgba(107,33,168,0.4)] transition-all">
            Start Free — No Credit Card
            <ArrowRight className="inline ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <OpsOperaLogo variant="jazz" size="sm" />
          <p className="text-white/30 text-sm">
            &copy; 2026 OpsOpera. Make your business operations sing.
          </p>
          <div className="flex gap-3">
            {["♩", "♪", "♫", "♬"].map((n, i) => (
              <motion.span
                key={i}
                className="text-white/20 text-xl cursor-pointer hover:text-jazz-neon-pink transition-colors"
                whileHover={{ scale: 1.3, rotate: 15 }}
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
