"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { useAudio, AudioToggle, MELODIES, SEQ_NOTES, NOTE_FREQ } from "@/components/AudioEngine";
import { ArrowRight, Check, Sparkles, Zap, Heart, Star, Music, Layers } from "lucide-react";

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA", "#F97316", "#34D399"];
const SHAPES_BG = [
  { type: "circle", x: 5, y: 10, size: 80, color: "#FF6B6B", rotation: 0 },
  { type: "triangle", x: 85, y: 5, size: 60, color: "#4ECDC4", rotation: 30 },
  { type: "square", x: 90, y: 60, size: 50, color: "#FFE66D", rotation: 45 },
  { type: "circle", x: 10, y: 70, size: 100, color: "#A78BFA", rotation: 0 },
  { type: "zigzag", x: 50, y: 85, size: 120, color: "#F97316", rotation: -15 },
  { type: "triangle", x: 70, y: 30, size: 40, color: "#34D399", rotation: 60 },
  { type: "square", x: 25, y: 45, size: 35, color: "#FF6B6B", rotation: 20 },
  { type: "circle", x: 60, y: 75, size: 55, color: "#FFE66D", rotation: 0 },
];

/* ─── Memphis Shapes Background ──────────────────────────────────────── */
function MemphisBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.06]">
      {SHAPES_BG.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 360],
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
            y: { duration: 4 + i, repeat: Infinity },
          }}
        >
          {shape.type === "circle" && (
            <div className="w-full h-full rounded-full border-4" style={{ borderColor: shape.color }} />
          )}
          {shape.type === "square" && (
            <div className="w-full h-full border-4" style={{ borderColor: shape.color }} />
          )}
          {shape.type === "triangle" && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,10 90,90 10,90" fill="none" stroke={shape.color} strokeWidth="4" />
            </svg>
          )}
          {shape.type === "zigzag" && (
            <svg viewBox="0 0 120 40" className="w-full h-full">
              <polyline points="0,20 15,5 30,35 45,5 60,35 75,5 90,35 105,5 120,20" fill="none" stroke={shape.color} strokeWidth="3" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Step Sequencer ─────────────────────────────────────────────────── */
function StepSequencer({ onPlayNote }: { onPlayNote: (note: string) => void }) {
  const [grid, setGrid] = useState<boolean[][]>(
    SEQ_NOTES.map(() => Array(16).fill(false))
  );
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(-1);
  const intervalRef = useRef<number | null>(null);

  const toggleCell = (row: number, col: number) => {
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = !next[row][col];
      if (!next[row][col]) return next;
      onPlayNote(SEQ_NOTES[row]);
      return next;
    });
  };

  const startStop = () => {
    if (playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPlaying(false);
      setStep(-1);
      return;
    }
    setPlaying(true);
    let s = 0;
    intervalRef.current = window.setInterval(() => {
      setStep(s);
      grid.forEach((row, rIdx) => {
        if (row[s % 16]) onPlayNote(SEQ_NOTES[rIdx]);
      });
      s = (s + 1) % 16;
    }, 180);
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // Update the interval callback when grid changes
  useEffect(() => {
    if (!playing || !intervalRef.current) return;
    clearInterval(intervalRef.current);
    let s = step >= 0 ? step : 0;
    intervalRef.current = window.setInterval(() => {
      s = (s + 1) % 16;
      setStep(s);
      grid.forEach((row, rIdx) => {
        if (row[s]) onPlayNote(SEQ_NOTES[rIdx]);
      });
    }, 180);
  }, [grid, playing]);

  const rowColors = ["#FF6B6B", "#4ECDC4", "#A78BFA", "#FFE66D"];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black text-gray-800">Beat Machine</h3>
        <button
          onClick={startStop}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
            playing
              ? "bg-[#FF6B6B] text-white"
              : "bg-[#4ECDC4] text-white hover:bg-[#3dbdb5]"
          }`}
        >
          {playing ? "■ Stop" : "▶ Play"}
        </button>
      </div>

      <div className="space-y-2">
        {grid.map((row, rIdx) => (
          <div key={rIdx} className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 w-8 text-right font-mono">
              {SEQ_NOTES[rIdx]}
            </span>
            <div className="flex gap-1 flex-1">
              {row.map((active, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => toggleCell(rIdx, cIdx)}
                  className={`flex-1 h-8 md:h-10 rounded-lg transition-all ${
                    cIdx % 4 === 0 ? "border-l-2 border-gray-200" : ""
                  }`}
                  style={{
                    backgroundColor: active
                      ? step === cIdx
                        ? rowColors[rIdx]
                        : `${rowColors[rIdx]}80`
                      : step === cIdx
                        ? "#f3f4f6"
                        : "#fafafa",
                    transform: active && step === cIdx ? "scale(1.1)" : "scale(1)",
                    boxShadow: active ? `0 2px 8px ${rowColors[rIdx]}40` : "none",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-1">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              step === i ? "bg-[#FF6B6B] scale-125" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Confetti Burst ─────────────────────────────────────────────────── */
function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;
  const notes = ["♩", "♪", "♫", "♬", "✦", "★", "●"];
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${40 + Math.random() * 20}%`,
            top: "50%",
            color: COLORS[i % COLORS.length],
          }}
          initial={{ y: 0, x: 0, opacity: 1, scale: 0 }}
          animate={{
            y: -200 - Math.random() * 400,
            x: (Math.random() - 0.5) * 600,
            opacity: [1, 1, 0],
            rotate: Math.random() * 720,
            scale: [0, 1.5, 0.5],
          }}
          transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
        >
          {notes[i % notes.length]}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── Bouncy Card ────────────────────────────────────────────────────── */
function BouncyCard({
  children,
  color,
  delay = 0,
  onHover,
}: {
  children: React.ReactNode;
  color: string;
  delay?: number;
  onHover?: () => void;
}) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border-2 cursor-pointer"
      style={{ borderColor: `${color}30` }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{
        scale: 1.03,
        y: -5,
        boxShadow: `0 20px 40px ${color}20`,
        borderColor: color,
      }}
      onMouseEnter={onHover}
    >
      {children}
    </motion.div>
  );
}

/* ─── Features ─────────────────────────────────────────────────────── */
const features = [
  { icon: Sparkles, title: "Magic Composer", desc: "Tell the AI what you need. Watch it compose the perfect workflow. Like magic, but real.", color: "#FF6B6B", note: "C5" },
  { icon: Zap, title: "Instant Tempo", desc: "From idea to automation in under a minute. No code. No fuss. Just flow.", color: "#4ECDC4", note: "E5" },
  { icon: Layers, title: "Mix & Match", desc: "Combine automations like building blocks. Stack them. Layer them. Make something amazing.", color: "#A78BFA", note: "G5" },
  { icon: Heart, title: "Joy Built In", desc: "We believe work tools should spark joy. Every interaction is designed to make you smile.", color: "#F97316", note: "A5" },
];

/* ─── Main Page ─────────────────────────────────────────────────────── */
export default function PlayfulOverture() {
  const audio = useAudio(0.3);
  const [confettiActive, setConfettiActive] = useState(false);
  const [musicBoxPlaying, setMusicBoxPlaying] = useState(false);

  useEffect(() => {
    return () => audio.cleanup();
  }, []);

  const playMusicBox = () => {
    if (!audio.ready) audio.init();
    if (musicBoxPlaying) return;
    setMusicBoxPlaying(true);
    audio.playMelody(MELODIES.musicBox, "musicbox", 1);
    const totalDur = MELODIES.musicBox.reduce((acc, n) => acc + n.dur, 0);
    setTimeout(() => setMusicBoxPlaying(false), totalDur * 1000 + 500);
  };

  const handleSeqNote = useCallback((note: string) => {
    if (!audio.ready) audio.init();
    audio.playNote(note, 0.15, "bell");
  }, [audio]);

  const handleFeatureHover = useCallback((note: string) => {
    if (audio.ready) audio.playNote(note, 0.2, "musicbox");
  }, [audio]);

  const triggerConfetti = () => {
    if (!audio.ready) audio.init();
    audio.playSuccess();
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-gray-800 overflow-x-hidden">
      <MemphisBackground />
      <ConfettiBurst active={confettiActive} />
      <AudioToggle
        muted={audio.muted}
        ready={audio.ready}
        onToggle={audio.toggleMute}
        onInit={audio.init}
        activeColor="#FF6B6B"
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 bg-[#FFFDF7]/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight">
            <span className="text-[#FF6B6B]">Ops</span>
            <span className="text-[#4ECDC4]">Opera</span>
            <motion.span
              className="inline-block ml-1 text-[#FFE66D]"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              ♪
            </motion.span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-bold">
            <a href="#features" className="text-gray-400 hover:text-[#FF6B6B] transition-colors">Features</a>
            <a href="#sequencer" className="text-gray-400 hover:text-[#4ECDC4] transition-colors">Play</a>
            <a href="#pricing" className="text-gray-400 hover:text-[#A78BFA] transition-colors">Pricing</a>
            <button
              onClick={playMusicBox}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                musicBoxPlaying
                  ? "bg-[#FFE66D] text-gray-800"
                  : "bg-[#FF6B6B] text-white hover:bg-[#ff5555]"
              }`}
            >
              {musicBoxPlaying ? "♪ Playing..." : "♪ Music Box"}
            </button>
          </div>
          <a href="/" className="text-gray-300 hover:text-[#FF6B6B] text-sm font-bold transition-colors">
            ← Back
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        {/* Floating decorative notes */}
        {["♩", "♪", "♫", "♬", "♩", "♫"].map((note, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl md:text-5xl"
            style={{
              left: `${10 + i * 16}%`,
              top: `${15 + (i % 3) * 25}%`,
              color: COLORS[i],
              opacity: 0.15,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1],
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

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="inline-block px-5 py-2 mb-6 rounded-full bg-[#FFE66D]/30 text-[#F97316] text-sm font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            ✨ Now with extra whimsy
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
            <motion.span
              className="block text-[#FF6B6B]"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              Ops
            </motion.span>
            <motion.span
              className="block text-[#4ECDC4]"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              Opera
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 text-xl md:text-2xl text-gray-400 max-w-xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Make your business operations
            <motion.span
              className="inline-block ml-2 text-[#FF6B6B] font-black"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              sing!
            </motion.span>
            <motion.span
              className="inline-block ml-1 text-[#FFE66D]"
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              🎵
            </motion.span>
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              onClick={triggerConfetti}
              className="group px-8 py-4 bg-[#FF6B6B] text-white font-black text-lg rounded-full shadow-lg shadow-[#FF6B6B]/30 hover:shadow-xl hover:shadow-[#FF6B6B]/40 transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start for free! 🎉
              <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              onClick={playMusicBox}
              className="px-8 py-4 border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold rounded-full hover:bg-[#4ECDC4]/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ♪ Hear the Music Box
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            What makes it <span className="text-[#4ECDC4]">special</span>? ✨
          </h2>
          <p className="mt-3 text-gray-400 text-lg">Hover the cards — they make sounds!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <BouncyCard
              key={f.title}
              color={f.color}
              delay={i * 0.1}
              onHover={() => handleFeatureHover(f.note)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl" style={{ backgroundColor: `${f.color}15` }}>
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <motion.span
                  className="text-2xl"
                  style={{ color: f.color }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  ♪
                </motion.span>
              </div>
              <h3 className="text-xl font-black mb-2" style={{ color: f.color }}>{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </BouncyCard>
          ))}
        </div>
      </section>

      {/* Step Sequencer */}
      <section id="sequencer" className="relative z-10 py-24 px-6 max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Make some <span className="text-[#A78BFA]">noise</span> 🥁
          </h2>
          <p className="mt-3 text-gray-400 text-lg">
            Click cells to compose a beat, then hit play!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <StepSequencer onPlayNote={handleSeqNote} />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-[#FF6B6B] to-[#F97316]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "10K+", label: "Happy teams" },
            { value: "40%", label: "Time saved" },
            { value: "99.9%", label: "Uptime" },
            { value: "∞", label: "Possibilities" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-black">{s.value}</div>
              <div className="text-white/70 text-sm mt-1 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Pick your <span className="text-[#FF6B6B]">plan</span> 🎵
          </h2>
          <p className="mt-3 text-gray-400 text-lg">No hidden fees. Cancel anytime. Start free.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Freestyle", price: "Free", desc: "Just vibes", color: "#4ECDC4", emoji: "🎸",
              features: ["5 automations", "1K runs/mo", "Community", "Basic dashboard"] },
            { name: "Showtime", price: "$49", desc: "For growing bands", color: "#FF6B6B", emoji: "🎷", popular: true,
              features: ["Unlimited automations", "50K runs/mo", "Priority support", "Advanced analytics", "Team features", "All integrations"] },
            { name: "Headliner", price: "$199", desc: "Main stage energy", color: "#A78BFA", emoji: "🎹",
              features: ["Everything in Showtime", "Unlimited runs", "Dedicated CSM", "SLA guarantee", "Custom AI", "SSO & SAML"] },
          ].map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`relative bg-white rounded-3xl p-8 border-2 ${
                tier.popular ? "shadow-xl" : "shadow-md"
              }`}
              style={{ borderColor: tier.popular ? tier.color : "#f3f4f6" }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 150 }}
              whileHover={{ y: -5, boxShadow: `0 20px 40px ${tier.color}15` }}
            >
              {tier.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-white text-xs font-black"
                  style={{ backgroundColor: tier.color }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  MOST POPULAR ⭐
                </motion.div>
              )}
              <div className="text-3xl mb-2">{tier.emoji}</div>
              <h3 className="text-2xl font-black" style={{ color: tier.color }}>{tier.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{tier.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-gray-800">{tier.price}</span>
                {tier.price !== "Free" && <span className="text-gray-400 text-sm">/mo</span>}
              </div>
              <ul className="space-y-2 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: tier.color }} />{f}
                  </li>
                ))}
              </ul>
              <motion.button
                className="w-full py-3 rounded-full font-black text-sm transition-all"
                style={{
                  backgroundColor: tier.popular ? tier.color : "transparent",
                  color: tier.popular ? "white" : tier.color,
                  border: `2px solid ${tier.color}`,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={triggerConfetti}
              >
                {tier.price === "Free" ? "Start jamming!" : "Let's go! 🎉"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex justify-center gap-3 text-5xl mb-6">
            {["🎵", "✨", "🎶", "🎉", "🎵"].map((e, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
              >
                {e}
              </motion.span>
            ))}
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Ready to make
            <br />
            some <span className="text-[#FF6B6B]">music</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
            Join thousands of teams who turned boring operations into something they actually enjoy.
          </p>
          <motion.button
            onClick={triggerConfetti}
            className="group px-10 py-5 bg-gradient-to-r from-[#FF6B6B] to-[#F97316] text-white font-black text-xl rounded-full shadow-lg shadow-[#FF6B6B]/30"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,107,107,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Let&apos;s go! 🚀
            <ArrowRight className="inline ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-100 py-12 px-6 text-center">
        <div className="flex justify-center gap-2 text-2xl mb-4">
          {COLORS.map((c, i) => (
            <motion.span
              key={i}
              style={{ color: c }}
              whileHover={{ scale: 1.5, rotate: 20 }}
              className="cursor-pointer"
            >
              ♪
            </motion.span>
          ))}
        </div>
        <p className="text-gray-300 text-sm">
          &copy; 2026 OpsOpera. Made with ♥ and a whole lot of ♪
        </p>
      </footer>
    </div>
  );
}
