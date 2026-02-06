"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAudio, AudioToggle, SYNTH_ARP_NOTES, SYNTH_BASS, MELODIES } from "@/components/AudioEngine";
import { ArrowRight, Check, Cpu, Globe, Layers, Zap, Terminal } from "lucide-react";

/* ─── Retro Grid Background ─────────────────────────────────────────── */
function RetroGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Horizon glow */}
      <div className="absolute bottom-[38%] left-0 right-0 h-40 bg-gradient-to-t from-purple-900/30 to-transparent" />

      {/* The Sun */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[38%] w-48 h-48 md:w-64 md:h-64">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-300 via-orange-500 to-pink-600 opacity-80" />
        {/* Sun stripes */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="absolute left-0 right-0 bg-[#0B0B1A]"
            style={{
              bottom: `${10 + i * 12}%`,
              height: `${3 + i * 1.5}%`,
            }}
          />
        ))}
      </div>

      {/* Mountain silhouettes */}
      <svg className="absolute bottom-[36%] w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,120 L150,40 L300,90 L500,20 L650,70 L800,10 L950,60 L1100,30 L1200,80 L1200,120Z" fill="#0d0d24" />
        <path d="M0,120 L200,60 L350,100 L550,50 L700,85 L900,35 L1050,75 L1200,50 L1200,120Z" fill="#0B0B1A" />
      </svg>

      {/* Perspective Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[38%]" style={{ perspective: "400px" }}>
        <div
          className="absolute inset-0 origin-top"
          style={{
            transform: "rotateX(60deg)",
            backgroundImage:
              "linear-gradient(to right, rgba(255,45,120,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,212,255,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 40px",
            animation: "gridScroll 2s linear infinite",
          }}
        />
      </div>

      {/* CRT Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-30"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)",
          backgroundSize: "100% 3px",
        }}
      />

      {/* VHS tracking line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-white/10 z-30 pointer-events-none"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ─── Glitch Text ───────────────────────────────────────────────────── */
function GlitchText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute top-0 left-0 text-[#FF2D78] opacity-60 z-0"
        style={{ clipPath: "inset(0 0 60% 0)" }}
        animate={{ x: [0, -3, 3, -1, 0], y: [0, 1, -1, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-[#00D4FF] opacity-60 z-0"
        style={{ clipPath: "inset(60% 0 0 0)" }}
        animate={{ x: [0, 3, -3, 1, 0], y: [0, -1, 1, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3, delay: 0.05 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ─── Typing Terminal ───────────────────────────────────────────────── */
function TypingTerminal({ lines, onType }: { lines: string[]; onType?: () => void }) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    const line = lines[currentLine];
    if (currentChar <= line.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[currentLine] = line.slice(0, currentChar);
          return next;
        });
        if (onType) onType();
        setCurrentChar((c) => c + 1);
      }, 30 + Math.random() * 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, lines, onType]);

  return (
    <div className="bg-black/80 border border-[#00D4FF]/30 rounded-lg p-6 font-mono text-sm md:text-base overflow-x-auto">
      <div className="flex items-center gap-2 mb-4 text-white/30">
        <div className="w-3 h-3 rounded-full bg-[#FF2D78]/60" />
        <div className="w-3 h-3 rounded-full bg-[#FF8C42]/60" />
        <div className="w-3 h-3 rounded-full bg-[#39FF14]/60" />
        <span className="ml-2 text-xs">opsopera-cli v2.0</span>
      </div>
      {displayed.map((line, i) => (
        <div key={i} className="flex">
          <span className="text-[#39FF14] mr-2 select-none">{">"}</span>
          <span className="text-[#00D4FF]">{line}</span>
          {i === currentLine && (
            <motion.span
              className="inline-block w-2 h-5 bg-[#00D4FF] ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Features ─────────────────────────────────────────────────────── */
const features = [
  { icon: Cpu, title: "Neural Conductor", desc: "AI that orchestrates your entire stack. Learns. Adapts. Optimizes.", color: "#FF2D78" },
  { icon: Zap, title: "Turbo Workflows", desc: "Build automations at lightspeed with our retro-futuristic flow builder.", color: "#00D4FF" },
  { icon: Globe, title: "Hyperconnected", desc: "Plug into 200+ integrations across every dimension of your business.", color: "#39FF14" },
  { icon: Layers, title: "Stacked Processes", desc: "Layer automations like synth tracks — each one adding power to the mix.", color: "#FF8C42" },
];

const terminalLines = [
  "opsopera init --project=myWorkflow",
  "opsopera connect --service=slack,stripe,hubspot",
  "opsopera compose --ai-model=conductor-v2",
  'opsopera trigger --event="new_customer"',
  "opsopera deploy --mode=production",
  "✓ Workflow live. 4 automations running. 0 errors.",
  "♪ Your operations are singing.",
];

/* ─── Main Page ─────────────────────────────────────────────────────── */
export default function SynthwaveConductor() {
  const audio = useAudio(0.25);
  const [arpRunning, setArpRunning] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
    return () => { audio.cleanup(); };
  }, []);

  const toggleArp = () => {
    if (!audio.ready) audio.init();
    if (arpRunning) {
      audio.stopArpeggio();
      audio.stopPad();
    } else {
      audio.startPad(["C3", "E3", "G3"]);
      audio.startArpeggio(SYNTH_ARP_NOTES, 140, "synth");
    }
    setArpRunning(!arpRunning);
  };

  const playEineKleine = () => {
    if (!audio.ready) audio.init();
    audio.playMelody(MELODIES.eineKleine, "synth", 1);
  };

  return (
    <div className="min-h-screen bg-[#0B0B1A] text-white overflow-x-hidden">
      <style jsx global>{`
        @keyframes gridScroll {
          from { background-position: 0 0; }
          to { background-position: 0 40px; }
        }
      `}</style>

      <AudioToggle
        muted={audio.muted}
        ready={audio.ready}
        onToggle={audio.toggleMute}
        onInit={audio.init}
        activeColor="#00D4FF"
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 bg-[#0B0B1A]/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-black tracking-tighter font-mono">
            <span className="text-[#00D4FF]">OPS</span>
            <span className="text-[#FF2D78]">OPERA</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-mono">
            <a href="#features" className="text-white/40 hover:text-[#00D4FF] transition-colors">[FEATURES]</a>
            <a href="#terminal" className="text-white/40 hover:text-[#00D4FF] transition-colors">[DEMO]</a>
            <a href="#pricing" className="text-white/40 hover:text-[#00D4FF] transition-colors">[PRICING]</a>
            <button
              onClick={toggleArp}
              className={`px-4 py-2 border rounded font-bold transition-all ${
                arpRunning
                  ? "border-[#FF2D78] text-[#FF2D78] bg-[#FF2D78]/10 animate-pulse"
                  : "border-[#00D4FF]/50 text-[#00D4FF] hover:bg-[#00D4FF]/10"
              }`}
            >
              {arpRunning ? "♪ PLAYING" : "♪ SYNTH"}
            </button>
          </div>
          <a href="/" className="text-white/30 hover:text-[#00D4FF] text-sm font-mono transition-colors">
            [BACK]
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <RetroGrid />

        <motion.div
          className="relative z-20 text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="inline-block px-4 py-1 mb-8 border border-[#39FF14]/30 rounded text-[#39FF14] text-xs font-mono tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            SYS.BOOT // OPSOPERA v2.0 ONLINE
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none font-mono">
            <GlitchText className="text-[#00D4FF]">OPS</GlitchText>
            <GlitchText className="text-[#FF2D78]">OPERA</GlitchText>
          </h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-white/50 font-mono max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            MAKE.YOUR.BUSINESS.OPERATIONS.<span className="text-[#FF2D78]">SING</span>_
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <button
              onClick={() => { toggleArp(); }}
              className="group px-8 py-4 bg-gradient-to-r from-[#FF2D78] to-[#FF8C42] text-white font-black text-lg font-mono rounded hover:shadow-[0_0_40px_rgba(255,45,120,0.4)] transition-all"
            >
              {arpRunning ? "■ STOP THE BEAT" : "▶ DROP THE BEAT"}
              <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={playEineKleine}
              className="px-8 py-4 border border-[#00D4FF]/30 text-[#00D4FF] font-mono rounded hover:bg-[#00D4FF]/10 transition-all"
            >
              ♪ PLAY MOZART
            </button>
          </motion.div>

          {/* Live arp visualizer */}
          {arpRunning && (
            <motion.div
              className="mt-12 flex items-end justify-center gap-1 h-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Array.from({ length: 32 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-[#FF2D78] to-[#00D4FF] rounded-full"
                  animate={{ height: [4, 12 + Math.random() * 30, 4] }}
                  transition={{
                    duration: 0.4 + Math.random() * 0.4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.04,
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-20 py-24 px-6 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-black font-mono tracking-tight text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[#00D4FF]">SYS.</span>
          <span className="text-white">CAPABILITIES</span>
        </motion.h2>
        <p className="text-center text-white/30 font-mono text-sm mb-16">// Core modules loaded</p>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="group p-6 border border-white/5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer"
              style={{ boxShadow: `inset 0 0 0 0 ${f.color}00` }}
              whileHover={{ boxShadow: `inset 0 0 30px ${f.color}15, 0 0 20px ${f.color}10` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => { if (audio.ready) audio.playNote(["C5","E5","G5","A5"][i], 0.3, "synth"); }}
            >
              <f.icon className="w-8 h-8 mb-4" style={{ color: f.color }} />
              <h3 className="text-xl font-black font-mono mb-2" style={{ color: f.color }}>
                {f.title}
              </h3>
              <p className="text-white/40 text-sm font-mono leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Terminal Demo */}
      <section id="terminal" className="relative z-20 py-24 px-6 max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-black font-mono tracking-tight text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[#39FF14]">CMD.</span>
          <span className="text-white">DEPLOY</span>
        </motion.h2>
        <p className="text-center text-white/30 font-mono text-sm mb-12">// Watch it happen in real-time</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TypingTerminal
            lines={terminalLines}
            onType={() => { if (audio.ready && Math.random() > 0.7) audio.playClick(); }}
          />
        </motion.div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-20 py-24 px-6 max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-black font-mono tracking-tight text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[#FF8C42]">SYS.</span>
          <span className="text-white">PRICING</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "LITE", price: "FREE", features: ["5 workflows", "1K runs/mo", "Community"], color: "#00D4FF" },
            { name: "PRO", price: "$49", features: ["Unlimited flows", "50K runs/mo", "Priority support", "Advanced AI", "Team access", "API access"], color: "#FF2D78", popular: true },
            { name: "ENTERPRISE", price: "$199", features: ["Everything", "Unlimited runs", "Dedicated CSM", "SLA", "Custom models", "SSO"], color: "#39FF14" },
          ].map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`relative p-8 border rounded-lg font-mono ${
                tier.popular ? "border-[#FF2D78]/50 bg-[#FF2D78]/5" : "border-white/10 bg-white/[0.02]"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FF2D78] text-white text-xs font-black rounded">
                  RECOMMENDED
                </div>
              )}
              <h3 className="text-lg font-black mb-1" style={{ color: tier.color }}>{tier.name}</h3>
              <div className="text-3xl font-black text-white mb-6">{tier.price}<span className="text-white/30 text-sm">{tier.price !== "FREE" ? "/mo" : ""}</span></div>
              <ul className="space-y-2 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/50 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: tier.color }} />{f}
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 rounded font-black text-sm transition-all"
                style={{
                  border: `1px solid ${tier.color}60`,
                  color: tier.popular ? "white" : tier.color,
                  backgroundColor: tier.popular ? `${tier.color}` : "transparent",
                }}
                onClick={() => audio.ready && audio.playSuccess()}
              >
                ACTIVATE
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-20 py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black font-mono tracking-tighter mb-6">
            <GlitchText className="text-white">ENTER THE GRID</GlitchText>
          </h2>
          <p className="text-white/40 font-mono mb-8 max-w-lg mx-auto">
            The future of business operations is here. And it sounds amazing.
          </p>
          <button
            onClick={() => { if (!audio.ready) audio.init(); audio.playSuccess(); }}
            className="group px-10 py-5 bg-gradient-to-r from-[#FF2D78] via-[#FF8C42] to-[#00D4FF] text-white font-black text-xl font-mono rounded hover:shadow-[0_0_60px_rgba(255,45,120,0.3)] transition-all"
          >
            JACK IN
            <ArrowRight className="inline ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/5 py-8 px-6 text-center font-mono text-white/20 text-xs">
        <p>&copy; 2026 OPSOPERA // MAKE.YOUR.BUSINESS.OPERATIONS.SING</p>
      </footer>
    </div>
  );
}
