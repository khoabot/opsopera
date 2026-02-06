"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MusicWaveform } from "@/components/MusicNotes";

const NOTE_SYMBOLS = ["♩", "♪", "♫", "♬", "𝄞", "𝄢"];

/* ─── Hover note burst on tiles ─────────────────────────────────── */
interface NoteParticle { id: number; x: number; y: number; symbol: string; color: string; }

function useTileNotes() {
  const [particles, setParticles] = useState<NoteParticle[]>([]);
  const spawn = useCallback((e: React.MouseEvent, color: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const count = 3 + Math.floor(Math.random() * 3);
    const newP: NoteParticle[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      symbol: NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)],
      color,
    }));
    setParticles((prev) => [...prev.slice(-12), ...newP]);
  }, []);
  return { particles, spawn };
}

const concepts = [
  {
    id: 1,
    title: "Grand Opera",
    subtitle: "Dramatic & Theatrical",
    description:
      "Rich crimson and gold. Velvet curtain reveals. Ornamental borders. The elegance of a grand opera house meets enterprise-grade SaaS. Serif typography, dramatic animations, and a theatrical experience that makes business feel like art.",
    href: "/concept1",
    gradient: "from-[#4A0020] to-[#1A0011]",
    accentColor: "#D4AF37",
    textColor: "text-[#FFF8E7]",
    borderColor: "border-[#D4AF37]/30",
    hoverBorder: "hover:border-[#D4AF37]/60",
    notes: ["𝄞", "♫"],
    tags: ["Theatrical", "Luxurious", "Bold"],
  },
  {
    id: 2,
    title: "Jazz Lounge",
    subtitle: "Modern & Electric",
    description:
      "Deep blues and purples with neon accents. Beat grid visualizations. Smooth animations with electric energy. Think late-night jazz club meets cutting-edge tech — where every click has rhythm and every interaction drops a beat.",
    href: "/concept2",
    gradient: "from-[#1A1A3E] to-[#0B0B1A]",
    accentColor: "#FF2D78",
    secondaryAccent: "#00D4FF",
    textColor: "text-white",
    borderColor: "border-[#FF2D78]/30",
    hoverBorder: "hover:border-[#FF2D78]/60",
    notes: ["♪", "♬"],
    tags: ["Electric", "Bold", "Playful"],
  },
  {
    id: 3,
    title: "Sheet Music",
    subtitle: "Warm & Whimsical",
    description:
      "Cream and warm earth tones. Musical staff lines as design elements. Hand-drawn underlines and soft rounded shapes. A warm, approachable, and delightful experience — like opening a beloved book of sheet music.",
    href: "/concept3",
    gradient: "from-[#F5F0E8] to-[#FFFEF5]",
    accentColor: "#E07A5F",
    textColor: "text-[#2C1810]",
    borderColor: "border-[#D4C5B0]/50",
    hoverBorder: "hover:border-[#E07A5F]/60",
    notes: ["♩", "♫"],
    tags: ["Warm", "Friendly", "Delightful"],
    darkText: true,
  },
  {
    id: 4,
    title: "Synthwave Conductor",
    subtitle: "Retro-Futuristic & Electric",
    description:
      "80s retrowave grids, CRT scanlines, glitch text, and a full synth arpeggiator that plays in your browser. Neon sun, mountain silhouettes, and terminal-style demos. Has sound — click 'Drop the Beat' for a live synth loop, or 'Play Mozart' for Eine Kleine Nachtmusik.",
    href: "/concept4",
    gradient: "from-[#1A1A3E] to-[#0B0B1A]",
    accentColor: "#00D4FF",
    textColor: "text-white",
    borderColor: "border-[#00D4FF]/30",
    hoverBorder: "hover:border-[#00D4FF]/60",
    notes: ["♫", "♬"],
    tags: ["Synthwave", "Audio", "Retro", "Interactive"],
  },
  {
    id: 5,
    title: "The Concert Hall",
    subtitle: "Immersive & Classical",
    description:
      "A dark, spotlight-lit concert hall with chandelier sparkles and cursor-following light effects. Features an interactive piano keyboard you can actually play, plus auto-play buttons for Für Elise and Ode to Joy — all synthesized in real-time with Web Audio.",
    href: "/concept5",
    gradient: "from-[#1a1008] to-[#0a0808]",
    accentColor: "#D4AF37",
    textColor: "text-[#f5f0e0]",
    borderColor: "border-[#D4AF37]/30",
    hoverBorder: "hover:border-[#D4AF37]/60",
    notes: ["𝄞", "♪"],
    tags: ["Classical", "Piano", "Immersive", "Audio"],
  },
  {
    id: 6,
    title: "Playful Overture",
    subtitle: "Bold, Bouncy & Interactive",
    description:
      "Memphis-inspired design with geometric shapes, confetti bursts, and spring animations everywhere. Features a working step sequencer / beat machine you can compose with, a music box melody player, and sound effects on hover. The most interactive of all six.",
    href: "/concept6",
    gradient: "from-[#FFF5F0] to-[#FFFDF7]",
    accentColor: "#FF6B6B",
    textColor: "text-gray-800",
    borderColor: "border-[#FF6B6B]/30",
    hoverBorder: "hover:border-[#FF6B6B]/60",
    notes: ["♩", "♫"],
    tags: ["Playful", "Sequencer", "Audio", "Memphis"],
    darkText: true,
  },
  {
    id: 7,
    title: "The Vinyl",
    subtitle: "Radial & Exploratory",
    description:
      "No scrolling at all. A spinning vinyl record fills the screen and IS the navigation — click tracks on the record to reveal content in slide-out panels. Tonearm animates between sections. Warm analog aesthetic with wood grain textures. A completely non-linear experience.",
    href: "/concept7",
    gradient: "from-[#1a1612] to-[#0a0808]",
    accentColor: "#E07A5F",
    textColor: "text-amber-200",
    borderColor: "border-[#E07A5F]/30",
    hoverBorder: "hover:border-[#E07A5F]/60",
    notes: ["𝄞", "♫"],
    tags: ["No-Scroll", "Radial", "Analog", "Audio"],
  },
  {
    id: 8,
    title: "The Score",
    subtitle: "Horizontal & Sequential",
    description:
      "The entire page scrolls horizontally like reading a musical score left-to-right. Content is arranged in 'measures' with bar lines, time signatures, tempo markings, and actual musical notation for each section. Scroll vertically to move the 'playhead' across the score.",
    href: "/concept8",
    gradient: "from-[#F5F0E8] to-[#FFFEF5]",
    accentColor: "#E07A5F",
    textColor: "text-[#2C1810]",
    borderColor: "border-[#D4C5B0]/50",
    hoverBorder: "hover:border-[#E07A5F]/60",
    notes: ["♪", "♬"],
    tags: ["Horizontal", "Sequential", "Manuscript", "Audio"],
    darkText: true,
  },
  {
    id: 9,
    title: "The Mosaic",
    subtitle: "Bento Grid & Dense",
    description:
      "Everything visible at once on a single screen — an asymmetric bento grid of 12 tiles. No hero, no scroll, no linear flow. Click any tile to expand it. Includes an interactive piano tile, a melody player tile, stat tiles, and feature tiles. Information-dense and exploratory.",
    href: "/concept9",
    gradient: "from-[#f0ede6] to-[#f8f6f1]",
    accentColor: "#1a1a2e",
    textColor: "text-[#2C1810]",
    borderColor: "border-[#2C1810]/20",
    hoverBorder: "hover:border-[#E07A5F]/60",
    notes: ["♩", "♪"],
    tags: ["Bento", "No-Scroll", "Dense", "Audio"],
    darkText: true,
  },
  {
    id: 10,
    title: "Opening Night",
    subtitle: "Theatrical Stage Experience",
    description:
      "A literal proscenium arch frames the viewport. Red velvet curtains part on page load. Content performs as 'scenes' on a stage with footlights, wing curtains, backdrop changes, and spotlight beams. Scroll through five acts. The most theatrical concept.",
    href: "/concept10",
    gradient: "from-[#1a0a2e] to-[#0a0515]",
    accentColor: "#D4AF37",
    textColor: "text-[#FFF8E7]",
    borderColor: "border-[#D4AF37]/30",
    hoverBorder: "hover:border-[#D4AF37]/60",
    notes: ["𝄞", "♫"],
    tags: ["Theatre", "Curtains", "Stage", "Immersive"],
  },
  {
    id: 11,
    title: "The Playbill",
    subtitle: "Opera House Program",
    description:
      "Designed like a real opera playbill. Stacked cream-colored pages with gold leaf edges peel away as you scroll. Director's note, 'Tonight's Cast' listing features as performers, synopsis in three acts, press reviews, and ticket pricing. Pure editorial typography.",
    href: "/concept11",
    gradient: "from-[#2a1a10] to-[#1a0a08]",
    accentColor: "#D4AF37",
    textColor: "text-[#FFF8E7]",
    borderColor: "border-[#D4AF37]/30",
    hoverBorder: "hover:border-[#D4AF37]/60",
    notes: ["♩", "♪"],
    tags: ["Editorial", "Print", "Classical", "Typography"],
  },
  {
    id: 12,
    title: "Prima Donna",
    subtitle: "Cinematic & Modern",
    description:
      "Full-bleed cinematic sections with single words filling the entire viewport. Extreme breathing room, slow dramatic reveals, and opera glass motifs. Where classical opera house drama meets modern luxury branding — Apple keynote energy meets La Scala.",
    href: "/concept12",
    gradient: "from-[#12100e] to-[#0a0808]",
    accentColor: "#D4AF37",
    textColor: "text-[#FFF8E7]",
    borderColor: "border-[#D4AF37]/30",
    hoverBorder: "hover:border-[#D4AF37]/60",
    notes: ["𝄞", "♬"],
    tags: ["Cinematic", "Modern", "Luxury", "Dramatic"],
  },
];

export default function ConceptPicker() {
  const [hoveredConcept, setHoveredConcept] = useState<number | null>(null);
  const { particles, spawn } = useTileNotes();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Background floating notes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {NOTE_SYMBOLS.map((note, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl opacity-[0.04]"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.03, 0.07, 0.03],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          >
            {note}
          </motion.span>
        ))}
      </div>

      {/* Global note particle layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute text-lg select-none"
              style={{ left: p.x, top: p.y, color: p.color }}
              initial={{ opacity: 1, scale: 0.3, position: "fixed" }}
              animate={{
                opacity: 0,
                scale: 1.3,
                y: -40 - Math.random() * 30,
                x: (Math.random() - 0.5) * 50,
                rotate: (Math.random() - 0.5) * 50,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {p.symbol}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-16 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#FF2D78] to-[#E07A5F] bg-clip-text text-transparent">
              OpsOpera
            </span>
          </h1>
          <motion.p
            className="mt-4 text-xl md:text-2xl text-white/50 italic"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Make Your Business Operations Sing
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <MusicWaveform color="#ffffff30" barCount={32} />
        </motion.div>

        <motion.div
          className="mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-white/40 leading-relaxed">
            Twelve brand concepts for OpsOpera. 1–3 are visual themes.
            4–6 add synthesized audio. 7–9 break layout conventions entirely.
            10–12 go deep into the opera/theatre metaphor — curtains, stages,
            playbills, and cinematic drama.
          </p>
        </motion.div>
      </header>

      {/* Concept Cards */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="grid gap-8 md:gap-10">
          {concepts.map((concept, i) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
            >
              <Link href={concept.href}>
                <motion.div
                  className={`group relative rounded-2xl border ${concept.borderColor} ${concept.hoverBorder} overflow-hidden cursor-pointer transition-all`}
                  onMouseEnter={(e) => { setHoveredConcept(concept.id); spawn(e, concept.accentColor); }}
                  onMouseLeave={() => setHoveredConcept(null)}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${concept.gradient} opacity-90`} />

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(600px circle at 50% 50%, ${concept.accentColor}10, transparent 70%)`,
                    }}
                  />

                  <div className={`relative z-10 p-8 md:p-12 ${concept.textColor}`}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                            style={{
                              color: concept.accentColor,
                              backgroundColor: `${concept.accentColor}15`,
                              border: `1px solid ${concept.accentColor}30`,
                            }}
                          >
                            Concept {concept.id}
                          </span>
                          <div className="flex gap-1.5 text-xl">
                            {concept.notes.map((n, j) => (
                              <motion.span
                                key={j}
                                className="inline-block"
                                style={{ opacity: hoveredConcept === concept.id ? 0.8 : 0.35 }}
                                animate={
                                  hoveredConcept === concept.id
                                    ? { y: [0, -8, 2, -5, 0], rotate: [0, 15, -10, 8, 0], scale: [1, 1.2, 1, 1.15, 1] }
                                    : { y: 0, rotate: 0, scale: 1 }
                                }
                                transition={{ duration: 1.2, delay: j * 0.15, ease: "easeInOut" }}
                              >
                                {n}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <h2
                          className="text-3xl md:text-4xl font-bold mb-1"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {concept.title}
                        </h2>
                        <p
                          className="text-lg opacity-60 mb-4"
                          style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
                        >
                          {concept.subtitle}
                        </p>
                        <p className={`opacity-50 leading-relaxed max-w-xl ${concept.darkText ? "text-[#2C1810]/60" : ""}`}>
                          {concept.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {concept.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full opacity-50"
                              style={{
                                border: `1px solid ${concept.accentColor}40`,
                                color: concept.accentColor,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        className="flex-shrink-0 flex items-center gap-2 font-medium"
                        style={{ color: concept.accentColor }}
                        animate={
                          hoveredConcept === concept.id
                            ? { x: [0, 5, 0] }
                            : {}
                        }
                        transition={{ duration: 0.8, repeat: hoveredConcept === concept.id ? Infinity : 0 }}
                      >
                        Explore →
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6 text-center">
        <p className="text-white/20 text-sm">
          OpsOpera Brand Exploration — Twelve concepts, one vision.
        </p>
        <div className="mt-3 flex justify-center gap-3 text-white/10 text-xl">
          {["♩", "♪", "♫", "♬", "𝄞"].map((n, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.5, opacity: 0.4 }}
              className="cursor-pointer"
            >
              {n}
            </motion.span>
          ))}
        </div>
      </footer>
    </div>
  );
}
