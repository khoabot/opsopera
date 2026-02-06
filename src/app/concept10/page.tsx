"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useAudio, AudioToggle, MELODIES } from "@/components/AudioEngine";
import { ArrowRight, Check } from "lucide-react";

/* ─── Scene Data ─────────────────────────────────────────────────────── */
const SCENES = [
  {
    id: "overture",
    act: "Prologue",
    title: "The Curtain Rises",
    subtitle: "Make Your Business Operations Sing",
    content: "Welcome to OpsOpera — where AI meets artistry to orchestrate your business into something extraordinary.",
    backdrop: "radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #0a0515 100%)",
    spotlight: "#D4AF37",
  },
  {
    id: "act1",
    act: "Act I",
    title: "The Problem",
    subtitle: "A Discordant Overture",
    content: "Your tools don't talk to each other. Your team drowns in manual work. Data lives in silos. Every day is a cacophony of context-switching. Your business deserves a conductor.",
    backdrop: "radial-gradient(ellipse at 50% 60%, #2a0a0a 0%, #0a0515 100%)",
    spotlight: "#8B0000",
  },
  {
    id: "act2",
    act: "Act II",
    title: "The Conductor Enters",
    subtitle: "AI That Finds the Harmony",
    content: null,
    features: [
      { name: "AI Conductor", desc: "Learns your operations. Composes optimal workflows. Adapts in real-time." },
      { name: "Visual Score Builder", desc: "Drag-and-drop automation. See the full orchestration. No code required." },
      { name: "Universal Ensemble", desc: "200+ integrations. Every tool in your stack, playing in perfect unison." },
      { name: "Live Performance", desc: "Real-time dashboards. Every metric. Every beat of your business, visualized." },
    ],
    backdrop: "radial-gradient(ellipse at 50% 40%, #0a1a2e 0%, #0a0515 100%)",
    spotlight: "#4ECDC4",
  },
  {
    id: "act3",
    act: "Act III",
    title: "The Performance",
    subtitle: "Choose Your Seat",
    content: null,
    pricing: [
      { tier: "Gallery", price: "Free", desc: "5 automations · 1K runs/mo · Community" },
      { tier: "Stalls", price: "$49/mo", desc: "Unlimited · 50K runs · Priority · Teams", featured: true },
      { tier: "Royal Box", price: "$199/mo", desc: "Everything · Unlimited · Dedicated · Custom AI" },
    ],
    backdrop: "radial-gradient(ellipse at 50% 50%, #1a1a0a 0%, #0a0515 100%)",
    spotlight: "#D4AF37",
  },
  {
    id: "finale",
    act: "Finale",
    title: "Standing Ovation",
    subtitle: "The Stage Is Set",
    content: "Join thousands of businesses whose operations now sing. Start free. No credit card. The performance begins the moment you step inside.",
    backdrop: "radial-gradient(ellipse at 50% 30%, #2a0a1a 0%, #0a0515 100%)",
    spotlight: "#E07A5F",
  },
];

/* ─── Proscenium Arch ────────────────────────────────────────────────── */
function ProsceniumArch() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {/* Top arch */}
      <div className="absolute top-0 left-0 right-0 h-14 md:h-20">
        <svg className="w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="archGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F0D060" />
              <stop offset="100%" stopColor="#B8960C" />
            </linearGradient>
          </defs>
          {/* Outer frame */}
          <rect x="0" y="0" width="1200" height="80" fill="#1a0a08" />
          {/* Gold trim bottom */}
          <rect x="0" y="72" width="1200" height="3" fill="url(#archGold)" opacity="0.6" />
          {/* Ornamental center */}
          <ellipse cx="600" cy="75" rx="80" ry="12" fill="url(#archGold)" opacity="0.15" />
          {/* Gold dots */}
          {Array.from({ length: 20 }).map((_, i) => (
            <circle key={i} cx={60 + i * 57} cy="40" r="2" fill="#D4AF37" opacity="0.3" />
          ))}
        </svg>
      </div>

      {/* Left column */}
      <div className="absolute top-14 md:top-20 bottom-16 md:bottom-20 left-0 w-6 md:w-12">
        <div className="h-full w-full bg-[#1a0a08]" />
        <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/20 to-[#D4AF37]/40" />
      </div>

      {/* Right column */}
      <div className="absolute top-14 md:top-20 bottom-16 md:bottom-20 right-0 w-6 md:w-12">
        <div className="h-full w-full bg-[#1a0a08]" />
        <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/20 to-[#D4AF37]/40" />
      </div>

      {/* Bottom (orchestra pit) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20">
        <div className="h-full w-full bg-[#1a0a08]" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      </div>
    </div>
  );
}

/* ─── Velvet Curtains ────────────────────────────────────────────────── */
function Curtains({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {!open && (
        <>
          <motion.div
            className="fixed top-0 bottom-0 left-0 w-1/2 z-30"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="h-full w-full relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #6B0F1A 0%, #8B1A2B 20%, #4A0A12 40%, #7B1525 60%, #5A0E18 80%, #8B1A2B 100%)",
                }}
              />
              {/* Velvet fold lines */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px"
                  style={{
                    left: `${12 + i * 12}%`,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
                  }}
                />
              ))}
              {/* Gold fringe at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#D4AF37]/30 to-transparent" />
            </div>
          </motion.div>
          <motion.div
            className="fixed top-0 bottom-0 right-0 w-1/2 z-30"
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="h-full w-full relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(225deg, #6B0F1A 0%, #8B1A2B 20%, #4A0A12 40%, #7B1525 60%, #5A0E18 80%, #8B1A2B 100%)",
                }}
              />
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px"
                  style={{
                    right: `${12 + i * 12}%`,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
                  }}
                />
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#D4AF37]/30 to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Wing Curtains (always visible) ─────────────────────────────────── */
function WingCurtains() {
  return (
    <>
      {/* Left wing */}
      <div className="fixed top-14 md:top-20 bottom-16 md:bottom-20 left-6 md:left-12 w-8 md:w-16 z-10 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, #3A0812 0%, #5A0E18 60%, transparent 100%)",
          }}
        />
      </div>
      {/* Right wing */}
      <div className="fixed top-14 md:top-20 bottom-16 md:bottom-20 right-6 md:right-12 w-8 md:w-16 z-10 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(270deg, #3A0812 0%, #5A0E18 60%, transparent 100%)",
          }}
        />
      </div>
    </>
  );
}

/* ─── Footlights ─────────────────────────────────────────────────────── */
function Footlights({ color = "#D4AF37" }: { color?: string }) {
  return (
    <div className="fixed bottom-16 md:bottom-20 left-6 md:left-12 right-6 md:right-12 h-4 z-15 pointer-events-none flex items-center justify-center gap-4 md:gap-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 md:w-3 md:h-3 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            boxShadow: [
              `0 0 4px ${color}40`,
              `0 0 12px ${color}80`,
              `0 0 4px ${color}40`,
            ],
          }}
          transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}
      {/* Glow on stage floor */}
      <div
        className="absolute -top-6 left-0 right-0 h-8"
        style={{ background: `linear-gradient(to top, ${color}08, transparent)` }}
      />
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────── */
export default function OpeningNight() {
  const audio = useAudio(0.25);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurtainsOpen(true);
      // Play a warm chord when curtains open
      setTimeout(() => {
        if (!audio.ready) audio.init();
        audio.playChord(["C3", "E3", "G3", "C4"], 3, "pad");
      }, 800);
    }, 1500);
    return () => { clearTimeout(timer); audio.cleanup(); };
  }, []);

  // Track which scene we're on
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * SCENES.length), SCENES.length - 1);
      if (idx !== currentScene) {
        setCurrentScene(idx);
        if (audio.ready) {
          const notes = ["C4", "E4", "G4", "C5", "E5"];
          audio.playNote(notes[idx % notes.length], 0.4, "bell");
        }
      }
    });
    return unsub;
  }, [scrollYProgress, currentScene, audio]);

  const scene = SCENES[currentScene];

  return (
    <div ref={containerRef} className="bg-[#0a0515]" style={{ height: `${SCENES.length * 100}vh` }}>
      <AudioToggle
        muted={audio.muted} ready={audio.ready}
        onToggle={audio.toggleMute} onInit={audio.init}
        activeColor="#D4AF37" className="z-40"
      />

      {/* Curtains (animate out on load) */}
      <Curtains open={curtainsOpen} />

      {/* Proscenium arch — always visible */}
      <ProsceniumArch />

      {/* Wing curtains */}
      <WingCurtains />

      {/* Footlights */}
      <Footlights color={scene?.spotlight} />

      {/* The Stage — fixed viewport within the arch */}
      <div className="fixed top-14 md:top-20 bottom-16 md:bottom-20 left-6 md:left-12 right-6 md:right-12 overflow-hidden">
        {/* Backdrop (changes per scene) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={scene?.id}
            className="absolute inset-0"
            style={{ background: scene?.backdrop }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Stage floor */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#1a0a08]/60 to-transparent" />
        <div
          className="absolute bottom-0 left-0 right-0 h-16 opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(139,100,50,0.3) 40px, rgba(139,100,50,0.3) 41px)",
          }}
        />

        {/* Spotlight beam */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            width: "500px",
            height: "100%",
            background: `linear-gradient(180deg, ${scene?.spotlight}10 0%, transparent 70%)`,
            clipPath: "polygon(40% 0%, 60% 0%, 80% 100%, 20% 100%)",
          }}
        />

        {/* Scene content — centered on stage */}
        <div className="absolute inset-0 flex items-center justify-center px-8 md:px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene?.id}
              className="text-center max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              {/* Act label */}
              <motion.p
                className="text-xs tracking-[0.4em] uppercase mb-4"
                style={{ color: `${scene?.spotlight}80` }}
                initial={{ opacity: 0, letterSpacing: "0.6em" }}
                animate={{ opacity: 1, letterSpacing: "0.4em" }}
                transition={{ delay: 0.3 }}
              >
                {scene?.act}
              </motion.p>

              {/* Scene title */}
              <motion.h2
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3"
                style={{ fontFamily: "Georgia, serif", color: scene?.spotlight }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {scene?.title}
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl italic text-white/40 mb-8"
                style={{ fontFamily: "Georgia, serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {scene?.subtitle}
              </motion.p>

              {/* Content */}
              {scene?.content && (
                <motion.p
                  className="text-white/50 leading-relaxed max-w-xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {scene.content}
                </motion.p>
              )}

              {/* Features */}
              {scene?.features && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {scene.features.map((f, i) => (
                    <motion.div
                      key={f.name}
                      className="text-left p-4 rounded-lg border border-white/5 bg-white/[0.03]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <h4 className="font-bold text-sm" style={{ color: scene.spotlight }}>{f.name}</h4>
                      <p className="text-white/40 text-xs mt-1">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pricing */}
              {scene?.pricing && (
                <div className="flex gap-4 mt-4 justify-center">
                  {scene.pricing.map((p, i) => (
                    <motion.div
                      key={p.tier}
                      className={`flex-1 max-w-[200px] p-5 rounded-lg text-center ${
                        p.featured
                          ? "border-2 bg-white/[0.05]"
                          : "border border-white/10 bg-white/[0.02]"
                      }`}
                      style={{ borderColor: p.featured ? scene.spotlight : undefined }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    >
                      {p.featured && (
                        <span className="text-[9px] tracking-widest uppercase" style={{ color: scene.spotlight }}>
                          Best seat
                        </span>
                      )}
                      <h4 className="font-bold text-white text-sm">{p.tier}</h4>
                      <div className="text-2xl font-bold my-1" style={{ color: scene.spotlight }}>{p.price}</div>
                      <p className="text-white/30 text-[10px]">{p.desc}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* CTA on finale */}
              {scene?.id === "overture" && (
                <motion.button
                  className="mt-8 px-8 py-4 rounded font-bold text-lg"
                  style={{
                    backgroundColor: scene.spotlight,
                    color: "#0a0515",
                    fontFamily: "Georgia, serif",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${scene.spotlight}30` }}
                  onClick={() => { if (!audio.ready) audio.init(); audio.playChord(["C4","E4","G4","C5"], 2, "pad"); }}
                >
                  Take Your Seat <ArrowRight className="inline ml-2 w-5 h-5" />
                </motion.button>
              )}
              {scene?.id === "finale" && (
                <motion.button
                  className="mt-8 px-10 py-5 rounded font-bold text-xl"
                  style={{
                    backgroundColor: scene.spotlight,
                    color: "#0a0515",
                    fontFamily: "Georgia, serif",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${scene.spotlight}40` }}
                  onClick={() => {
                    if (!audio.ready) audio.init();
                    audio.playMelody(MELODIES.odeToJoy.slice(0, 8), "bell", 1.2);
                  }}
                >
                  Begin the Performance <ArrowRight className="inline ml-2 w-6 h-6" />
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Back link */}
        <a
          href="/"
          className="absolute top-4 left-4 z-20 text-white/20 hover:text-[#D4AF37] text-sm transition-colors"
          style={{ fontFamily: "Georgia, serif" }}
        >
          ← Lobby
        </a>

        {/* Scene navigation dots */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                const scrollTo = (i / (SCENES.length - 1)) * (document.body.scrollHeight - window.innerHeight);
                window.scrollTo({ top: scrollTo, behavior: "smooth" });
              }}
              className="group flex items-center gap-2"
            >
              <span className={`text-[9px] tracking-widest uppercase transition-colors hidden md:block ${
                currentScene === i ? "text-white/60" : "text-white/0 group-hover:text-white/30"
              }`}>
                {s.act}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  currentScene === i ? "scale-125" : "scale-75 opacity-30"
                }`}
                style={{ backgroundColor: currentScene === i ? s.spotlight : "#fff" }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Orchestra pit label */}
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 z-20 text-white/10 text-[9px] tracking-[0.3em] uppercase">
        Orchestra
      </div>
    </div>
  );
}
