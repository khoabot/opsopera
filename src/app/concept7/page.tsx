"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAudio, AudioToggle, MELODIES } from "@/components/AudioEngine";
import { ArrowRight, X, Check } from "lucide-react";

/* ─── Track Data ─────────────────────────────────────────────────────── */
const TRACKS = [
  {
    id: "overture",
    label: "Overture",
    angle: -60,
    color: "#E07A5F",
    title: "Welcome to OpsOpera",
    content: "AI-powered automation that orchestrates every part of your business into one harmonious performance. No more juggling tools. No more manual busywork. Just smooth, beautiful operations.",
    cta: "Drop the needle →",
  },
  {
    id: "features",
    label: "Side A",
    angle: -20,
    color: "#4ECDC4",
    title: "What's On This Record",
    content: "AI Conductor — learns and optimizes your workflows in real-time.\nFlow Builder — drag-and-drop automation, no code required.\n200+ Integrations — connects to everything in your stack.\nLive Analytics — dashboards that actually make sense.",
    cta: "Hear more →",
  },
  {
    id: "how",
    label: "Side B",
    angle: 20,
    color: "#FFE66D",
    title: "How It Plays",
    content: "1. Describe what you need in plain English.\n2. AI composes the perfect workflow.\n3. Fine-tune with our visual builder.\n4. Hit play. Operations sing.\n\nFrom setup to symphony in under 5 minutes.",
    cta: "See it spin →",
  },
  {
    id: "pricing",
    label: "B-Side",
    angle: 60,
    color: "#A78BFA",
    title: "Pick Your Pressing",
    content: "Single (Free) — 5 automations, 1K runs/mo\n\nLP ($49/mo) — Unlimited automations, 50K runs, team features\n\nBox Set ($199/mo) — Everything unlimited, dedicated support, custom AI",
    cta: "Start spinning →",
    href: "/concept7/dashboard",
  },
];

/* ─── Vinyl Record Component ────────────────────────────────────────── */
function VinylRecord({
  spinning,
  activeTrack,
  onTrackClick,
}: {
  spinning: boolean;
  activeTrack: string | null;
  onTrackClick: (id: string) => void;
}) {
  return (
    <div className="relative w-[320px] h-[320px] md:w-[440px] md:h-[440px] lg:w-[520px] lg:h-[520px]">
      {/* Record */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: spinning ? 360 : 0 }}
        transition={{ duration: 4, repeat: spinning ? Infinity : 0, ease: "linear" }}
        style={{
          background: "radial-gradient(circle, #1a1a1a 0%, #0d0d0d 30%, #1a1a1a 31%, #111 60%, #1a1a1a 61%, #0d0d0d 100%)",
          boxShadow: "0 0 60px rgba(0,0,0,0.8), inset 0 0 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Grooves */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/[0.03]"
            style={{
              inset: `${12 + i * 2}%`,
            }}
          />
        ))}

        {/* Track hit zones — ring segments */}
        {TRACKS.map((track) => (
          <button
            key={track.id}
            className="absolute w-full h-full rounded-full"
            onClick={() => onTrackClick(track.id)}
            style={{
              clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(((track.angle - 20) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((track.angle - 20) * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((track.angle + 20) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((track.angle + 20) * Math.PI) / 180)}%)`,
            }}
          >
            <div
              className={`absolute inset-[15%] rounded-full transition-all duration-300 ${
                activeTrack === track.id ? "opacity-20" : "opacity-0 hover:opacity-10"
              }`}
              style={{ backgroundColor: track.color }}
            />
          </button>
        ))}

        {/* Center label */}
        <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-amber-800 to-amber-950 flex items-center justify-center shadow-inner border border-amber-700/30">
          <div className="text-center">
            <div className="text-amber-200 font-black text-sm md:text-lg tracking-tight">OpsOpera</div>
            <div className="text-amber-400/50 text-[8px] md:text-[10px] tracking-widest uppercase mt-0.5">
              Est. 2026
            </div>
          </div>
          {/* Spindle hole */}
          <div className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#0a0808] border border-amber-700/30" />
        </div>
      </motion.div>

      {/* Light reflection */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}

/* ─── Tonearm ────────────────────────────────────────────────────────── */
function Tonearm({ activeTrack }: { activeTrack: string | null }) {
  const trackIndex = activeTrack ? TRACKS.findIndex((t) => t.id === activeTrack) : -1;
  const rotation = trackIndex >= 0 ? -10 + trackIndex * 8 : -25;

  return (
    <motion.div
      className="absolute top-[5%] right-[10%] md:right-[15%] origin-top-right z-20"
      animate={{ rotate: rotation }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      {/* Base */}
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-lg" />
      {/* Arm */}
      <div className="w-1.5 h-48 md:h-64 bg-gradient-to-b from-gray-400 to-gray-500 mx-auto rounded-full shadow-md" />
      {/* Head */}
      <div className="w-3 h-6 bg-gray-500 mx-auto rounded-b-sm shadow-md" />
      {/* Needle */}
      <div className="w-0.5 h-3 bg-gray-300 mx-auto" />
    </motion.div>
  );
}

/* ─── Track Labels (orbital) ─────────────────────────────────────────── */
function TrackLabels({
  activeTrack,
  onTrackClick,
}: {
  activeTrack: string | null;
  onTrackClick: (id: string) => void;
}) {
  return (
    <>
      {TRACKS.map((track, i) => {
        const positions = [
          "top-[8%] left-[5%]",
          "top-[8%] right-[5%]",
          "bottom-[8%] right-[5%]",
          "bottom-[8%] left-[5%]",
        ];
        return (
          <motion.button
            key={track.id}
            className={`absolute ${positions[i]} z-20 text-left group`}
            onClick={() => onTrackClick(track.id)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full transition-all ${
                  activeTrack === track.id ? "scale-125" : "scale-100 opacity-50 group-hover:opacity-100"
                }`}
                style={{ backgroundColor: track.color }}
              />
              <span
                className={`text-xs md:text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTrack === track.id ? "text-white" : "text-white/40 group-hover:text-white/70"
                }`}
              >
                {track.label}
              </span>
            </div>
          </motion.button>
        );
      })}
    </>
  );
}

/* ─── Content Panel ──────────────────────────────────────────────────── */
function ContentPanel({
  track,
  onClose,
  onPlayAudio,
}: {
  track: (typeof TRACKS)[0] | null;
  onClose: () => void;
  onPlayAudio: () => void;
}) {
  return (
    <AnimatePresence>
      {track && (
        <motion.div
          className="fixed inset-y-0 right-0 w-full md:w-[480px] z-30 flex items-center"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <div className="w-full h-full md:h-auto md:my-12 bg-[#1a1612] md:rounded-l-3xl border-l border-t border-b border-white/5 p-8 md:p-12 overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: track.color }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: track.color }}>
                {track.label}
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-amber-100 mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {track.title}
            </h2>

            <div className="space-y-3 mb-8">
              {track.content.split("\n").map((line, i) => (
                <motion.p
                  key={i}
                  className={`text-white/50 leading-relaxed ${line.startsWith("•") || /^\d\./.test(line) ? "ml-2" : ""}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <div className="flex gap-3">
              <motion.button
                className="px-6 py-3 rounded-full font-bold text-sm"
                style={{ backgroundColor: track.color, color: "#0a0808" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { onPlayAudio(); if ((track as any).href) setTimeout(() => window.location.href = (track as any).href, 500); }}
              >
                {track.cta}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────── */
export default function TheVinyl() {
  const audio = useAudio(0.3);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    return () => audio.cleanup();
  }, []);

  const handleTrackClick = (id: string) => {
    if (!audio.ready) audio.init();
    if (activeTrack === id) {
      setActiveTrack(null);
      setSpinning(true);
      return;
    }
    setActiveTrack(id);
    setSpinning(false);
    audio.playNote("C5", 0.15, "musicbox");
  };

  const handlePlayAudio = () => {
    if (!audio.ready) audio.init();
    audio.playMelody(MELODIES.eineKleine, "piano", 1);
  };

  const activeTrackData = TRACKS.find((t) => t.id === activeTrack) ?? null;

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #1a1612 0%, #0a0808 70%)",
      }}
    >
      <AudioToggle
        muted={audio.muted} ready={audio.ready}
        onToggle={audio.toggleMute} onInit={audio.init}
        activeColor="#E07A5F"
      />

      {/* Wood grain texture suggestion */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,200,100,0.1) 40px, rgba(255,200,100,0.1) 41px)",
        }}
      />

      {/* Back link */}
      <a
        href="/"
        className="absolute top-6 left-6 z-30 text-white/30 hover:text-amber-400 text-sm transition-colors"
        style={{ fontFamily: "Georgia, serif" }}
      >
        ← All Concepts
      </a>

      {/* Title — top center */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-amber-200/80" style={{ fontFamily: "Georgia, serif" }}>
          OpsOpera
        </h1>
        <p className="text-amber-400/40 text-xs tracking-widest uppercase mt-1">
          Select a track to explore
        </p>
      </motion.div>

      {/* Motto — bottom center */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-amber-400/30 text-sm italic" style={{ fontFamily: "Georgia, serif" }}>
          &ldquo;Make your business operations sing.&rdquo;
        </p>
        <div className="flex justify-center gap-2 mt-2 text-amber-400/20">
          {["♩", "♪", "♫", "♬"].map((n, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              {n}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Track Labels */}
      <TrackLabels activeTrack={activeTrack} onTrackClick={handleTrackClick} />

      {/* Record + Tonearm — centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={activeTrack ? { x: -60, scale: 0.9 } : { x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <VinylRecord
            spinning={spinning}
            activeTrack={activeTrack}
            onTrackClick={handleTrackClick}
          />
          <Tonearm activeTrack={activeTrack} />
        </motion.div>
      </div>

      {/* Content Panel */}
      <ContentPanel
        track={activeTrackData}
        onClose={() => { setActiveTrack(null); setSpinning(true); }}
        onPlayAudio={handlePlayAudio}
      />

      {/* Ambient vinyl hiss indicator */}
      {spinning && (
        <motion.div
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 text-white/20 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-end gap-[1px] h-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-[2px] bg-amber-400/30 rounded-full"
                animate={{ height: [1, 3 + Math.random() * 8, 1] }}
                transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
            ))}
          </div>
          <span>Now spinning</span>
        </motion.div>
      )}
    </div>
  );
}
