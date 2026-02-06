"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { useAudio, AudioToggle, MELODIES, PIANO_KEYS, NOTE_FREQ } from "@/components/AudioEngine";
import { ArrowRight, Check, Play, Pause, Star, ChevronDown } from "lucide-react";

/* ─── Spotlight Cursor Effect ────────────────────────────────────────── */
function SpotlightCursor() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(255,248,220,0.04), transparent 70%)`,
      }}
    />
  );
}

/* ─── Chandelier Effect ──────────────────────────────────────────────── */
function Chandelier() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
      {/* Chain */}
      <div className="w-px h-8 bg-gradient-to-b from-transparent to-amber-400/30 mx-auto" />
      {/* Body */}
      <div className="relative">
        <div className="w-40 h-20 mx-auto">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-amber-300"
              style={{
                left: `${20 + Math.cos((i / 12) * Math.PI * 2) * 40 + 50}%`,
                top: `${50 + Math.sin((i / 12) * Math.PI * 2) * 30}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.3, 0.8],
                boxShadow: [
                  "0 0 2px rgba(255,215,0,0.3)",
                  "0 0 8px rgba(255,215,0,0.6)",
                  "0 0 2px rgba(255,215,0,0.3)",
                ],
              }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
          {/* Central glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-8 bg-amber-400/10 rounded-full blur-lg" />
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive Piano ──────────────────────────────────────────────── */
function Piano({ onPlayNote }: { onPlayNote: (note: string) => void }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handlePlay = (note: string) => {
    setActiveKey(note);
    onPlayNote(note);
    setTimeout(() => setActiveKey(null), 200);
  };

  const whiteKeys = PIANO_KEYS.filter((k) => !k.black);
  const allKeys = PIANO_KEYS;

  return (
    <div className="relative mx-auto" style={{ maxWidth: `${whiteKeys.length * 44}px` }}>
      {/* White keys */}
      <div className="flex">
        {whiteKeys.map((key) => (
          <button
            key={key.note}
            onClick={() => handlePlay(key.note)}
            onMouseDown={() => handlePlay(key.note)}
            className={`relative w-10 md:w-11 h-36 md:h-44 border border-gray-300 rounded-b-md transition-all ${
              activeKey === key.note
                ? "bg-amber-100 shadow-inner translate-y-[1px]"
                : "bg-gradient-to-b from-white to-gray-100 hover:from-gray-50 hover:to-gray-200 shadow-md"
            }`}
          />
        ))}
      </div>
      {/* Black keys - positioned absolutely */}
      <div className="absolute top-0 left-0 flex pointer-events-none" style={{ width: "100%" }}>
        {allKeys.map((key, i) => {
          if (!key.black) return null;
          // Figure out position based on preceding white keys
          const whitesBefore = allKeys.slice(0, i).filter((k) => !k.black).length;
          const leftPx = whitesBefore * 44 - 14; // 44 = white key width, offset
          return (
            <button
              key={key.note}
              onClick={() => handlePlay(key.note)}
              onMouseDown={() => handlePlay(key.note)}
              className={`absolute pointer-events-auto w-7 h-24 md:h-28 rounded-b-md z-10 transition-all ${
                activeKey === key.note
                  ? "bg-gray-700 translate-y-[1px]"
                  : "bg-gradient-to-b from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 shadow-lg"
              }`}
              style={{ left: `${leftPx}px` }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── Floating Sparkles ──────────────────────────────────────────────── */
function Sparkles({ count = 20 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Features ─────────────────────────────────────────────────────── */
const programNotes = [
  { title: "Act I: The Conductor", subtitle: "AI-Powered Orchestration", desc: "Our AI conductor reads the score of your business and directs every automation with precision and grace. No detail escapes its baton." },
  { title: "Act II: The Ensemble", subtitle: "Team Collaboration", desc: "Your team performs together in perfect harmony. Shared workflows, real-time editing, and seamless handoffs — a true ensemble." },
  { title: "Act III: The Performance", subtitle: "Execution & Analytics", desc: "Watch your automations perform flawlessly on stage. Real-time metrics give you a standing ovation's worth of data." },
  { title: "Finale: The Encore", subtitle: "Continuous Optimization", desc: "The show never truly ends. AI learns from every performance, continuously refining your workflows for an ever-better encore." },
];

/* ─── Main Page ─────────────────────────────────────────────────────── */
export default function ConcertHall() {
  const audio = useAudio(0.3);
  const [isPlayingFurElise, setIsPlayingFurElise] = useState(false);
  const [currentNote, setCurrentNote] = useState(-1);
  const [lightsOn, setLightsOn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLightsOn(true), 800);
    return () => { clearTimeout(t); audio.cleanup(); };
  }, []);

  const handlePianoNote = useCallback((note: string) => {
    if (!audio.ready) audio.init();
    audio.playNote(note, 0.8, "piano");
  }, [audio]);

  const playFurElise = () => {
    if (!audio.ready) audio.init();
    if (isPlayingFurElise) return;
    setIsPlayingFurElise(true);
    setCurrentNote(0);
    audio.playMelody(MELODIES.furElise, "piano", 1, (i) => {
      setCurrentNote(i);
    });
    const totalDur = MELODIES.furElise.reduce((acc, n) => acc + n.dur, 0);
    setTimeout(() => {
      setIsPlayingFurElise(false);
      setCurrentNote(-1);
    }, totalDur * 1000 + 500);
  };

  const playOdeToJoy = () => {
    if (!audio.ready) audio.init();
    audio.playMelody(MELODIES.odeToJoy, "piano", 1);
  };

  return (
    <div className="min-h-screen bg-[#0a0808] text-[#f5f0e0] overflow-x-hidden">
      <SpotlightCursor />
      <AudioToggle
        muted={audio.muted}
        ready={audio.ready}
        onToggle={audio.toggleMute}
        onInit={audio.init}
        activeColor="#D4AF37"
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 bg-[#0a0808]/80 backdrop-blur-md border-b border-amber-900/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            <span className="text-amber-400">Ops</span>
            <span className="text-amber-200/80 italic">Opera</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ fontFamily: "Georgia, serif" }}>
            <a href="#program" className="text-white/40 hover:text-amber-400 transition-colors">Programme</a>
            <a href="#piano" className="text-white/40 hover:text-amber-400 transition-colors">Piano</a>
            <a href="#tickets" className="text-white/40 hover:text-amber-400 transition-colors">Tickets</a>
            <button
              onClick={playFurElise}
              className={`px-4 py-2 border rounded transition-all ${
                isPlayingFurElise
                  ? "border-amber-400 text-amber-400 bg-amber-400/10"
                  : "border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
              }`}
            >
              {isPlayingFurElise ? "♪ Playing..." : "♪ Für Elise"}
            </button>
          </div>
          <a href="/" className="text-white/30 hover:text-amber-400 text-sm transition-colors" style={{ fontFamily: "Georgia, serif" }}>
            ← Lobby
          </a>
        </div>
      </nav>

      {/* Hero - The Stage */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <Chandelier />
        <Sparkles count={30} />

        {/* Stage lights */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[800px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: lightsOn ? 1 : 0 }}
          transition={{ duration: 2 }}
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.06) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="relative z-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: lightsOn ? 1 : 0, y: lightsOn ? 0 : 30 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.p
            className="text-amber-400/60 text-sm tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Tonight&apos;s Performance
          </motion.p>

          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <motion.span
              className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2 }}
            >
              OpsOpera
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 text-xl md:text-2xl text-amber-200/50 italic max-w-2xl mx-auto"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            &ldquo;Make Your Business Operations Sing&rdquo;
          </motion.p>

          <motion.p
            className="mt-4 text-white/30 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            AI-powered automation that orchestrates your entire business
            into a masterpiece worth a standing ovation.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
          >
            <button
              onClick={playFurElise}
              className="group px-8 py-4 bg-amber-400 text-[#0a0808] font-bold text-lg rounded hover:bg-amber-300 transition-all hover:shadow-[0_0_40px_rgba(255,215,0,0.2)]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {isPlayingFurElise ? (
                <span className="flex items-center gap-2"><Pause className="w-5 h-5" /> Now Playing: Für Elise</span>
              ) : (
                <span className="flex items-center gap-2"><Play className="w-5 h-5" /> Play Für Elise</span>
              )}
            </button>
            <button
              onClick={playOdeToJoy}
              className="px-8 py-4 border border-amber-400/30 text-amber-400 rounded hover:bg-amber-400/10 transition-all"
              style={{ fontFamily: "Georgia, serif" }}
            >
              ♪ Ode to Joy
            </button>
          </motion.div>

          {/* Now playing indicator */}
          {isPlayingFurElise && (
            <motion.div
              className="mt-8 flex justify-center items-center gap-2 text-amber-400/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-end gap-[2px] h-4">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-[2px] bg-amber-400 rounded-full"
                    animate={{ height: [2, 6 + Math.random() * 10, 2] }}
                    transition={{ duration: 0.3 + Math.random() * 0.3, repeat: Infinity, repeatType: "reverse" }}
                  />
                ))}
              </div>
              <span style={{ fontFamily: "Georgia, serif" }}>
                Note {currentNote + 1} of {MELODIES.furElise.length}
              </span>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="absolute bottom-8 text-amber-400/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Program Notes */}
      <section id="program" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-200" style={{ fontFamily: "Georgia, serif" }}>
            Programme
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mt-4" />
        </div>

        <div className="space-y-12">
          {programNotes.map((note, i) => (
            <motion.div
              key={note.title}
              className="relative pl-8 border-l-2 border-amber-400/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-amber-400 bg-[#0a0808]" />
              <p className="text-amber-400/50 text-xs tracking-widest uppercase" style={{ fontFamily: "Georgia, serif" }}>
                {note.subtitle}
              </p>
              <h3 className="text-2xl font-bold text-amber-100 mt-1 mb-2" style={{ fontFamily: "Georgia, serif" }}>
                {note.title}
              </h3>
              <p className="text-white/40 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                {note.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Piano */}
      <section id="piano" className="py-24 px-6 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-200 mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Take the Stage
          </h2>
          <p className="text-white/30 mb-12" style={{ fontFamily: "Georgia, serif" }}>
            Click the keys to play. Go ahead — this is your recital.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Piano onPlayNote={handlePianoNote} />
          </motion.div>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={playFurElise}
              disabled={isPlayingFurElise}
              className="px-6 py-2 border border-amber-400/30 text-amber-400 rounded text-sm hover:bg-amber-400/10 transition-all disabled:opacity-40"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Auto-play: Für Elise
            </button>
            <button
              onClick={playOdeToJoy}
              className="px-6 py-2 border border-amber-400/30 text-amber-400 rounded text-sm hover:bg-amber-400/10 transition-all"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Auto-play: Ode to Joy
            </button>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
          ))}
        </div>
        <blockquote
          className="text-2xl md:text-3xl text-amber-100/80 italic max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "Georgia, serif" }}
        >
          &ldquo;OpsOpera brought an elegance to our operations we didn&apos;t know was possible. It&apos;s like having a world-class conductor running our business.&rdquo;
        </blockquote>
        <div className="mt-6">
          <div className="font-bold text-amber-400" style={{ fontFamily: "Georgia, serif" }}>David Kim</div>
          <div className="text-white/30 text-sm">CTO, Meridian Technologies</div>
        </div>
      </section>

      {/* Tickets (Pricing) */}
      <section id="tickets" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-200" style={{ fontFamily: "Georgia, serif" }}>
            Reserve Your Seat
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Gallery", price: "Free", desc: "An introduction to the performance", features: ["5 automations", "1K runs/mo", "Community access", "Basic analytics"] },
            { name: "Orchestra", price: "$49", desc: "The finest seats in the house", features: ["Unlimited automations", "50K runs/mo", "Priority support", "Advanced analytics", "Team collaboration", "All integrations"], popular: true },
            { name: "Royal Box", price: "$199", desc: "The ultimate private experience", features: ["Everything in Orchestra", "Unlimited runs", "Dedicated concierge", "SLA guarantee", "Custom AI training", "White-glove onboarding"] },
          ].map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`relative p-8 rounded-lg border ${
                tier.popular
                  ? "border-amber-400/40 bg-gradient-to-b from-amber-900/10 to-transparent shadow-[0_0_30px_rgba(255,215,0,0.05)]"
                  : "border-amber-900/20 bg-white/[0.02]"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-[#0a0808] text-xs font-bold rounded-full">
                  BEST VALUE
                </div>
              )}
              <h3 className="text-2xl font-bold text-amber-200 mb-1" style={{ fontFamily: "Georgia, serif" }}>
                {tier.name}
              </h3>
              <p className="text-white/30 text-sm mb-4 italic" style={{ fontFamily: "Georgia, serif" }}>{tier.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-amber-400">{tier.price}</span>
                {tier.price !== "Free" && <span className="text-white/30 text-sm">/month</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/50">
                    <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded font-semibold transition-all ${
                  tier.popular
                    ? "bg-amber-400 text-[#0a0808] hover:bg-amber-300"
                    : "border border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                }`}
                style={{ fontFamily: "Georgia, serif" }}
                onClick={() => audio.ready && audio.playSuccess()}
              >
                Reserve Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-200 mb-6" style={{ fontFamily: "Georgia, serif" }}>
            The curtain rises tonight.
          </h2>
          <p className="text-white/30 text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: "Georgia, serif" }}>
            Take your seat. Let AI conduct your operations into something extraordinary.
          </p>
          <button
            className="group px-10 py-5 bg-amber-400 text-[#0a0808] font-bold text-xl rounded hover:bg-amber-300 transition-all hover:shadow-[0_0_50px_rgba(255,215,0,0.2)]"
            style={{ fontFamily: "Georgia, serif" }}
            onClick={() => { if (!audio.ready) audio.init(); audio.playSuccess(); }}
          >
            Enter the Hall
            <ArrowRight className="inline ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-900/20 py-12 px-6 text-center">
        <p className="text-white/20 text-sm" style={{ fontFamily: "Georgia, serif" }}>
          &copy; 2026 OpsOpera. All rights reserved. The performance continues.
        </p>
      </footer>
    </div>
  );
}
