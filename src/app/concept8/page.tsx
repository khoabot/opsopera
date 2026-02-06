"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useAudio, AudioToggle, MELODIES } from "@/components/AudioEngine";
import { ArrowRight, Check } from "lucide-react";

/* ─── Measure Data ───────────────────────────────────────────────────── */
const MEASURES = [
  {
    id: "intro",
    number: 1,
    timeSignature: "4/4",
    title: "OpsOpera",
    subtitle: "Make Your Business Operations Sing",
    content: "An AI-powered automation platform that orchestrates your entire business into one harmonious performance.",
    annotation: "Andante con moto",
    color: "#2C1810",
    notes: [
      { pitch: 3, type: "whole" },
    ],
  },
  {
    id: "problem",
    number: 2,
    title: "The Dissonance",
    subtitle: "Your ops are out of tune",
    content: "Teams drown in manual tasks. Tools don't talk to each other. Data lives in silos. Every day is a cacophony of context-switching and copy-pasting. Your business deserves better than noise.",
    annotation: "Agitato",
    color: "#8B0000",
    notes: [
      { pitch: 1, type: "quarter" },
      { pitch: 4, type: "quarter" },
      { pitch: 0, type: "quarter" },
      { pitch: 3, type: "quarter" },
    ],
  },
  {
    id: "solution",
    number: 3,
    title: "The Resolution",
    subtitle: "AI finds the harmony",
    content: "OpsOpera's AI conductor analyzes your workflows, finds the patterns, and composes automations that bring everything into tune. Describe what you need. The AI writes the score. You hit play.",
    annotation: "Dolce",
    color: "#3D9B8F",
    notes: [
      { pitch: 2, type: "half" },
      { pitch: 3, type: "quarter" },
      { pitch: 4, type: "quarter" },
    ],
  },
  {
    id: "features",
    number: 4,
    title: "The Movements",
    subtitle: "Every capability, composed",
    content: null,
    annotation: "Allegro vivace",
    color: "#6B21A8",
    features: [
      { name: "AI Conductor", desc: "Learns and optimizes your workflows automatically" },
      { name: "Flow Builder", desc: "Drag-and-drop visual automation — no code needed" },
      { name: "200+ Integrations", desc: "Connects to every tool in your stack" },
      { name: "Live Analytics", desc: "Real-time dashboards for every metric" },
    ],
    notes: [
      { pitch: 1, type: "eighth" },
      { pitch: 2, type: "eighth" },
      { pitch: 3, type: "eighth" },
      { pitch: 4, type: "eighth" },
      { pitch: 3, type: "eighth" },
      { pitch: 2, type: "eighth" },
      { pitch: 1, type: "eighth" },
      { pitch: 2, type: "eighth" },
    ],
  },
  {
    id: "pricing",
    number: 5,
    title: "The Score",
    subtitle: "Simple pricing, perfect pitch",
    content: null,
    annotation: "Moderato",
    color: "#D4AF37",
    pricing: [
      { name: "Solo", price: "Free", items: ["5 automations", "1K runs/mo"] },
      { name: "Ensemble", price: "$49/mo", items: ["Unlimited", "50K runs", "Team"] },
      { name: "Orchestra", price: "$199/mo", items: ["Everything", "Unlimited", "Dedicated"] },
    ],
    notes: [
      { pitch: 2, type: "half" },
      { pitch: 3, type: "half" },
    ],
  },
  {
    id: "finale",
    number: 6,
    title: "Finale",
    subtitle: "Standing ovation awaits",
    content: "Join thousands of teams whose operations are singing. Start free. No credit card required. The performance begins now.",
    annotation: "Grandioso",
    color: "#E07A5F",
    notes: [
      { pitch: 1, type: "quarter" },
      { pitch: 2, type: "quarter" },
      { pitch: 3, type: "quarter" },
      { pitch: 4, type: "whole" },
    ],
  },
];

const STAFF_Y = [72, 60, 48, 36, 24]; // staff line positions (bottom to top)

/* ─── Staff + Notes SVG for a measure ───────────────────────────────── */
function MeasureStaff({ notes, color, active }: { notes: { pitch: number; type: string }[]; color: string; active: boolean }) {
  const noteWidths: Record<string, number> = { whole: 1, half: 0.5, quarter: 0.25, eighth: 0.125 };
  let xPos = 40;

  return (
    <svg className="w-full h-24 mt-4" viewBox="0 0 400 84" preserveAspectRatio="xMidYMid meet">
      {/* Staff lines */}
      {STAFF_Y.map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#D4C5B0" strokeWidth="0.5" opacity="0.5" />
      ))}
      {/* Bar line at end */}
      <line x1="398" y1="24" x2="398" y2="72" stroke="#D4C5B0" strokeWidth="1" opacity="0.5" />

      {/* Notes */}
      {notes.map((note, i) => {
        const y = STAFF_Y[Math.min(note.pitch, 4)] ?? 36;
        const w = (noteWidths[note.type] ?? 0.25) * 300;
        const cx = xPos + w / 2;
        xPos += w + 10;

        return (
          <g key={i}>
            <motion.ellipse
              cx={cx}
              cy={y}
              rx={6}
              ry={4.5}
              fill={active ? color : `${color}60`}
              animate={active ? { scale: [1, 1.2, 1] } : {}}
              transition={{ delay: i * 0.15, duration: 0.4 }}
            />
            {note.type !== "whole" && (
              <line x1={cx + 5} y1={y} x2={cx + 5} y2={y - 24} stroke={active ? color : `${color}60`} strokeWidth="1.5" />
            )}
            {note.type === "eighth" && (
              <path d={`M${cx + 5},${y - 24} Q${cx + 15},${y - 20} ${cx + 12},${y - 16}`} fill="none" stroke={active ? color : `${color}60`} strokeWidth="1.5" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────── */
export default function TheScore() {
  const audio = useAudio(0.3);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentMeasure, setCurrentMeasure] = useState(0);

  // Map vertical scroll → horizontal movement
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(MEASURES.length - 1) * 100}%`]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.round(latest * (MEASURES.length - 1));
    if (idx !== currentMeasure) {
      setCurrentMeasure(idx);
      if (audio.ready) {
        const noteNames = ["C4", "E4", "G4", "C5", "E5"];
        audio.playNote(noteNames[idx % noteNames.length], 0.15, "musicbox");
      }
    }
  });

  useEffect(() => {
    return () => audio.cleanup();
  }, []);

  const playOde = () => {
    if (!audio.ready) audio.init();
    audio.playMelody(MELODIES.odeToJoy, "piano", 1);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[#FFFEF5]"
      style={{ height: `${MEASURES.length * 100}vh` }}
    >
      {/* Fixed viewport — the "window" that shows the score */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Parchment texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"4\" height=\"4\"><rect width=\"4\" height=\"4\" fill=\"%23d4c5b0\"/><rect width=\"1\" height=\"1\" fill=\"%23c4b5a0\"/></svg>')",
        }} />

        {/* Top nav / measure counter */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-[#FFFEF5]/90 backdrop-blur-sm border-b border-[#D4C5B0]/30 px-6 py-3 flex items-center justify-between">
          <a href="/" className="text-[#2C1810]/30 hover:text-[#E07A5F] text-sm transition-colors" style={{ fontFamily: "Georgia, serif" }}>
            ← All Concepts
          </a>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              {MEASURES.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => {
                    const scrollTo = (i / (MEASURES.length - 1)) * (containerRef.current!.scrollHeight - window.innerHeight);
                    window.scrollTo({ top: scrollTo, behavior: "smooth" });
                  }}
                  className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all border ${
                    currentMeasure === i
                      ? "border-[#E07A5F] text-[#E07A5F] bg-[#E07A5F]/10"
                      : "border-[#D4C5B0]/50 text-[#2C1810]/30 hover:text-[#2C1810]/60"
                  }`}
                >
                  {m.number}
                </button>
              ))}
            </div>
            <button
              onClick={playOde}
              className="px-3 py-1 text-xs border border-[#E07A5F]/30 text-[#E07A5F] rounded-full hover:bg-[#E07A5F]/10 transition-all"
              style={{ fontFamily: "Georgia, serif" }}
            >
              ♪ Ode to Joy
            </button>
          </div>
          <div className="text-[#2C1810]/30 text-xs font-mono">
            m. {MEASURES[currentMeasure]?.number} / {MEASURES.length}
          </div>
        </div>

        {/* The horizontal track */}
        <motion.div
          ref={trackRef}
          className="absolute inset-0 flex"
          style={{ x, width: `${MEASURES.length * 100}%` }}
        >
          {MEASURES.map((measure, mIdx) => (
            <div
              key={measure.id}
              className="relative flex-shrink-0 flex items-center justify-center px-8 md:px-16"
              style={{ width: `${100 / MEASURES.length}%` }}
            >
              {/* Bar line at left edge */}
              <div className="absolute left-0 top-[30%] bottom-[30%] w-px bg-[#D4C5B0]/40" />

              <div className="max-w-2xl w-full">
                {/* Tempo/annotation marking */}
                {measure.annotation && (
                  <motion.p
                    className="text-sm italic mb-2"
                    style={{ color: measure.color, fontFamily: "Georgia, serif", opacity: 0.6 }}
                    initial={{ opacity: 0 }}
                    animate={currentMeasure === mIdx ? { opacity: 0.6 } : { opacity: 0.2 }}
                  >
                    {measure.annotation}
                  </motion.p>
                )}

                {/* Time signature (first measure only) */}
                {measure.timeSignature && (
                  <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[#D4C5B0] text-3xl font-bold leading-none" style={{ fontFamily: "Georgia, serif" }}>
                    <div>4</div>
                    <div>4</div>
                  </div>
                )}

                {/* Measure number */}
                <span className="text-[10px] font-mono text-[#D4C5B0] tracking-widest">
                  MEASURE {measure.number}
                </span>

                {/* Title */}
                <motion.h2
                  className="text-4xl md:text-6xl font-bold mt-2 mb-2"
                  style={{ fontFamily: "Georgia, serif", color: measure.color }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={currentMeasure === mIdx ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {measure.title}
                </motion.h2>

                <motion.p
                  className="text-lg md:text-xl italic mb-6"
                  style={{ fontFamily: "Georgia, serif", color: `${measure.color}80` }}
                  initial={{ opacity: 0 }}
                  animate={currentMeasure === mIdx ? { opacity: 0.6 } : { opacity: 0.2 }}
                >
                  {measure.subtitle}
                </motion.p>

                {/* Content */}
                {measure.content && (
                  <motion.p
                    className="text-[#2C1810]/50 leading-relaxed max-w-lg"
                    initial={{ opacity: 0 }}
                    animate={currentMeasure === mIdx ? { opacity: 1 } : { opacity: 0.3 }}
                  >
                    {measure.content}
                  </motion.p>
                )}

                {/* Features list */}
                {measure.features && (
                  <div className="grid grid-cols-2 gap-4">
                    {measure.features.map((f, i) => (
                      <motion.div
                        key={f.name}
                        className="p-4 rounded-xl bg-white/50 border border-[#D4C5B0]/30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={currentMeasure === mIdx ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <h4 className="font-bold text-sm" style={{ color: measure.color }}>{f.name}</h4>
                        <p className="text-[#2C1810]/40 text-xs mt-1">{f.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pricing */}
                {measure.pricing && (
                  <div className="flex gap-4">
                    {measure.pricing.map((p, i) => (
                      <motion.div
                        key={p.name}
                        className="flex-1 p-4 rounded-xl bg-white/50 border border-[#D4C5B0]/30 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={currentMeasure === mIdx ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <h4 className="font-bold text-sm" style={{ color: measure.color }}>{p.name}</h4>
                        <div className="text-xl font-bold text-[#2C1810] my-1">{p.price}</div>
                        {p.items.map((item) => (
                          <p key={item} className="text-[#2C1810]/40 text-xs flex items-center justify-center gap-1">
                            <Check className="w-3 h-3" style={{ color: measure.color }} />{item}
                          </p>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* CTA on finale */}
                {measure.id === "finale" && (
                  <motion.button
                    className="mt-6 px-8 py-4 rounded-full font-bold text-white text-lg"
                    style={{ backgroundColor: measure.color, fontFamily: "Georgia, serif" }}
                    initial={{ opacity: 0 }}
                    animate={currentMeasure === mIdx ? { opacity: 1 } : { opacity: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { if (!audio.ready) audio.init(); audio.playSuccess(); setTimeout(() => window.location.href = '/concept8/dashboard', 500); }}
                  >
                    Begin the Performance
                    <ArrowRight className="inline ml-2 w-5 h-5" />
                  </motion.button>
                )}

                {/* Musical notation below content */}
                {measure.notes && (
                  <MeasureStaff notes={measure.notes} color={measure.color} active={currentMeasure === mIdx} />
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Continuous staff lines in background */}
        <svg className="absolute bottom-[15%] left-0 right-0 h-24 pointer-events-none opacity-20" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="0" y1={16 + i * 12} x2="100%" y2={16 + i * 12} stroke="#D4C5B0" strokeWidth="1" />
          ))}
        </svg>

        {/* Scroll hint */}
        {currentMeasure === 0 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-[#2C1810]/30 text-xs mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Scroll to read the score →
            </p>
            <motion.div
              className="w-6 h-10 rounded-full border border-[#D4C5B0]/50 mx-auto flex items-start justify-center pt-2"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-[#E07A5F]"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}

        <AudioToggle
          muted={audio.muted} ready={audio.ready}
          onToggle={audio.toggleMute} onInit={audio.init}
          activeColor="#E07A5F"
        />
      </div>
    </div>
  );
}
