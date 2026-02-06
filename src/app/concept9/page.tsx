"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useAudio, AudioToggle, MELODIES, PIANO_KEYS } from "@/components/AudioEngine";
import { X, Check, ArrowRight, Sparkles, Zap, BarChart3, Bot, Users, Shield, Music } from "lucide-react";

/* ─── Tile Data ──────────────────────────────────────────────────────── */
interface Tile {
  id: string;
  label: string;
  color: string;
  gridArea: string;
  type: "brand" | "tagline" | "feature" | "stat" | "piano" | "testimonial" | "pricing" | "cta" | "visual" | "melody";
  icon?: React.ElementType;
  title?: string;
  desc?: string;
  statValue?: string;
  statLabel?: string;
  quote?: string;
  author?: string;
}

const TILES: Tile[] = [
  {
    id: "brand", label: "Brand", color: "#1a1a2e", gridArea: "1 / 1 / 3 / 3",
    type: "brand",
  },
  {
    id: "tagline", label: "Tagline", color: "#E07A5F", gridArea: "1 / 3 / 2 / 6",
    type: "tagline",
  },
  {
    id: "feat-ai", label: "AI", color: "#3D9B8F", gridArea: "2 / 3 / 3 / 5",
    type: "feature", icon: Bot, title: "AI Conductor",
    desc: "Machine learning that studies your operations and composes optimal workflows. It learns your business, finds patterns, and creates automations you never knew you needed.",
  },
  {
    id: "stat-teams", label: "Teams", color: "#A78BFA", gridArea: "2 / 5 / 3 / 6",
    type: "stat", statValue: "10K+", statLabel: "Teams singing",
  },
  {
    id: "piano", label: "Piano", color: "#2C1810", gridArea: "3 / 1 / 4 / 4",
    type: "piano",
  },
  {
    id: "feat-zap", label: "Speed", color: "#FF6B6B", gridArea: "3 / 4 / 4 / 6",
    type: "feature", icon: Zap, title: "Instant Setup",
    desc: "From zero to running automations in under 5 minutes. Our AI handles the complex parts — you just describe what you need in plain English.",
  },
  {
    id: "testimonial", label: "Quote", color: "#F5F0E8", gridArea: "4 / 1 / 5 / 3",
    type: "testimonial",
    quote: "OpsOpera turned our chaos into a symphony. 40 hours saved per week.",
    author: "Sarah Chen, VP Ops",
  },
  {
    id: "feat-int", label: "Integrations", color: "#4ECDC4", gridArea: "4 / 3 / 5 / 4",
    type: "feature", icon: Shield, title: "200+ Integrations",
    desc: "Connects to Slack, Stripe, HubSpot, Salesforce, and 200 more. One platform, every tool, perfect harmony.",
  },
  {
    id: "melody", label: "Melody", color: "#FFE66D", gridArea: "4 / 4 / 5 / 5",
    type: "melody",
  },
  {
    id: "stat-time", label: "Time", color: "#E07A5F", gridArea: "4 / 5 / 5 / 6",
    type: "stat", statValue: "40%", statLabel: "Time saved",
  },
  {
    id: "pricing", label: "Pricing", color: "#D4AF37", gridArea: "5 / 1 / 6 / 4",
    type: "pricing",
  },
  {
    id: "cta", label: "CTA", color: "#FF6B6B", gridArea: "5 / 4 / 6 / 6",
    type: "cta",
  },
];

/* ─── Mini Piano ─────────────────────────────────────────────────────── */
function MiniPiano({ onPlay }: { onPlay: (note: string) => void }) {
  const keys = PIANO_KEYS.slice(0, 12); // one octave
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const play = (note: string) => {
    setActiveKey(note);
    onPlay(note);
    setTimeout(() => setActiveKey(null), 200);
  };

  const whites = keys.filter((k) => !k.black);

  return (
    <div className="relative h-full flex items-end pb-4 px-2">
      <div className="flex w-full relative" style={{ height: "70%" }}>
        {whites.map((key) => (
          <button
            key={key.note}
            onClick={() => play(key.note)}
            className={`flex-1 rounded-b border border-gray-300 transition-all ${
              activeKey === key.note ? "bg-amber-100 shadow-inner" : "bg-white hover:bg-gray-50 shadow-sm"
            }`}
          />
        ))}
        {keys.map((key, i) => {
          if (!key.black) return null;
          const whitesBefore = keys.slice(0, i).filter((k) => !k.black).length;
          return (
            <button
              key={key.note}
              onClick={() => play(key.note)}
              className={`absolute top-0 rounded-b z-10 transition-all ${
                activeKey === key.note ? "bg-gray-600" : "bg-gray-900 hover:bg-gray-700"
              }`}
              style={{
                left: `${(whitesBefore / whites.length) * 100 - 100 / whites.length / 3}%`,
                width: `${100 / whites.length * 0.6}%`,
                height: "55%",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── Expanded Tile Overlay ──────────────────────────────────────────── */
function ExpandedTile({
  tile,
  onClose,
  audio,
}: {
  tile: Tile;
  onClose: () => void;
  audio: ReturnType<typeof useAudio>;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl p-8 md:p-12"
        style={{ backgroundColor: tile.type === "testimonial" ? "#FFFEF5" : tile.color }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {tile.type === "feature" && tile.icon && (
          <div>
            <tile.icon className="w-10 h-10 text-white/80 mb-4" />
            <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {tile.title}
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">{tile.desc}</p>
          </div>
        )}

        {tile.type === "testimonial" && (
          <div>
            <blockquote className="text-2xl italic text-[#2C1810]/80 mb-4" style={{ fontFamily: "Georgia, serif" }}>
              &ldquo;{tile.quote}&rdquo;
            </blockquote>
            <p className="text-[#2C1810]/50 font-bold">{tile.author}</p>
          </div>
        )}

        {tile.type === "pricing" && (
          <div>
            <h3 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>
              Choose Your Score
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Solo", price: "Free", items: ["5 automations", "1K runs/mo", "Community"] },
                { name: "Ensemble", price: "$49", items: ["Unlimited", "50K runs/mo", "Priority support", "Team"], popular: true },
                { name: "Orchestra", price: "$199", items: ["Everything", "Unlimited runs", "Dedicated CSM", "Custom AI"] },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`p-4 rounded-xl ${tier.popular ? "bg-white/20 border border-white/30" : "bg-white/10"}`}
                >
                  <h4 className="font-bold text-white text-sm">{tier.name}</h4>
                  <div className="text-2xl font-bold text-white my-2">{tier.price}</div>
                  {tier.items.map((item) => (
                    <p key={item} className="text-white/50 text-xs flex items-center gap-1 mt-1">
                      <Check className="w-3 h-3 text-white/60" />{item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {tile.type === "brand" && (
          <div className="text-center py-8">
            <h2 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
              OpsOpera
            </h2>
            <p className="text-white/50 text-lg italic" style={{ fontFamily: "Georgia, serif" }}>
              AI-powered automation that orchestrates your business into a harmonious symphony of efficiency. We believe operations should be beautiful.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────── */
export default function TheMosaic() {
  const audio = useAudio(0.3);
  const [expandedTile, setExpandedTile] = useState<string | null>(null);

  useEffect(() => {
    return () => audio.cleanup();
  }, []);

  const handlePianoNote = useCallback((note: string) => {
    if (!audio.ready) audio.init();
    audio.playNote(note, 0.6, "piano");
  }, [audio]);

  const handleTileClick = (tile: Tile) => {
    if (tile.type === "piano" || tile.type === "visual") return;
    if (!audio.ready) audio.init();
    audio.playNote("E5", 0.1, "musicbox");
    setExpandedTile(tile.id);
  };

  const playMelody = () => {
    if (!audio.ready) audio.init();
    audio.playMelody(MELODIES.furElise, "musicbox", 1);
  };

  const expandedData = TILES.find((t) => t.id === expandedTile) ?? null;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f8f6f1] p-2 md:p-4">
      <AudioToggle
        muted={audio.muted} ready={audio.ready}
        onToggle={audio.toggleMute} onInit={audio.init}
        activeColor="#E07A5F"
      />

      {/* The Grid */}
      <div
        className="h-full w-full grid gap-2 md:gap-3"
        style={{
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "repeat(5, 1fr)",
        }}
      >
        {TILES.map((tile) => {
          const [rowStart, colStart, rowEnd, colEnd] = tile.gridArea.split(" / ").map(Number);

          return (
            <motion.div
              key={tile.id}
              className="relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                gridRow: `${rowStart} / ${rowEnd}`,
                gridColumn: `${colStart} / ${colEnd}`,
                backgroundColor: tile.color,
              }}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleTileClick(tile)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.random() * 0.3 }}
            >
              {/* ─── Brand Tile ─── */}
              {tile.type === "brand" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h1 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
                    Ops<span className="text-[#E07A5F]">Opera</span>
                  </h1>
                  <p className="text-white/30 text-xs mt-2 tracking-widest uppercase">Click any tile to explore</p>
                  <a
                    href="/"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 left-3 text-white/20 hover:text-white/50 text-xs transition-colors"
                  >
                    ← Back
                  </a>
                </div>
              )}

              {/* ─── Tagline Tile ─── */}
              {tile.type === "tagline" && (
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <p className="text-white text-lg md:text-2xl font-bold text-center" style={{ fontFamily: "Georgia, serif" }}>
                    Make your business operations{" "}
                    <motion.span
                      className="inline-block"
                      animate={{ rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      sing ♪
                    </motion.span>
                  </p>
                </div>
              )}

              {/* ─── Feature Tile ─── */}
              {tile.type === "feature" && tile.icon && (
                <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between">
                  <tile.icon className="w-6 h-6 md:w-8 md:h-8 text-white/70" />
                  <div>
                    <h3 className="text-sm md:text-lg font-bold text-white">{tile.title}</h3>
                    <p className="text-white/40 text-[10px] md:text-xs mt-1 line-clamp-2 hidden md:block">
                      {tile.desc?.slice(0, 80)}...
                    </p>
                  </div>
                  <div className="text-white/30 text-[10px] group-hover:text-white/50 transition-colors">
                    Click to expand →
                  </div>
                </div>
              )}

              {/* ─── Stat Tile ─── */}
              {tile.type === "stat" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <motion.div
                    className="text-2xl md:text-4xl font-black text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.5 }}
                  >
                    {tile.statValue}
                  </motion.div>
                  <div className="text-white/50 text-[10px] md:text-xs mt-1">{tile.statLabel}</div>
                </div>
              )}

              {/* ─── Piano Tile ─── */}
              {tile.type === "piano" && (
                <MiniPiano onPlay={handlePianoNote} />
              )}

              {/* ─── Testimonial Tile ─── */}
              {tile.type === "testimonial" && (
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-center">
                  <p className="text-[#2C1810]/60 text-xs md:text-sm italic leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                    &ldquo;{tile.quote}&rdquo;
                  </p>
                  <p className="text-[#2C1810]/30 text-[10px] md:text-xs mt-2 font-bold">{tile.author}</p>
                </div>
              )}

              {/* ─── Melody Tile ─── */}
              {tile.type === "melody" && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center p-4"
                  onClick={(e) => { e.stopPropagation(); playMelody(); }}
                >
                  <motion.span
                    className="text-3xl md:text-4xl"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎵
                  </motion.span>
                  <span className="text-[#2C1810]/50 text-[10px] mt-2 font-bold">Play Für Elise</span>
                </div>
              )}

              {/* ─── Pricing Tile ─── */}
              {tile.type === "pricing" && (
                <div className="absolute inset-0 p-4 md:p-6 flex items-center gap-3 md:gap-4">
                  {[
                    { name: "Solo", price: "Free", color: "#fff" },
                    { name: "Ensemble", price: "$49", color: "#fff" },
                    { name: "Orchestra", price: "$199", color: "#fff" },
                  ].map((tier, i) => (
                    <div key={tier.name} className="flex-1 text-center bg-white/10 rounded-xl p-3 md:p-4">
                      <div className="text-white/50 text-[10px] md:text-xs font-bold">{tier.name}</div>
                      <div className="text-white text-base md:text-xl font-black mt-1">{tier.price}</div>
                    </div>
                  ))}
                  <div className="text-white/20 text-[10px] absolute bottom-2 right-3 group-hover:text-white/40 transition-colors">
                    Click for details →
                  </div>
                </div>
              )}

              {/* ─── CTA Tile ─── */}
              {tile.type === "cta" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-4" style={{ fontFamily: "Georgia, serif" }}>
                    Ready to make some music?
                  </h3>
                  <motion.button
                    className="px-6 py-3 bg-white text-[#FF6B6B] font-bold rounded-full text-sm hover:bg-white/90 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!audio.ready) audio.init();
                      audio.playSuccess();
                    }}
                  >
                    Start free <ArrowRight className="inline w-4 h-4 ml-1" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expandedData && (
          <ExpandedTile
            tile={expandedData}
            onClose={() => setExpandedTile(null)}
            audio={audio}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
