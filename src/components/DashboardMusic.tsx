"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";

const NOTES = ["♩", "♪", "♫", "♬", "𝄞"];

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
}

/* ─── Hover Note Burst ─────────────────────────────────────────────
   Wrap any element — on mouseenter, spawns 2-3 tiny music notes
   that float up and fade out from the cursor position.
──────────────────────────────────────────────────────────────────── */
export function HoverNotes({
  children,
  color,
  className = "",
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const spawn = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const count = 2 + Math.floor(Math.random() * 2);
      const newP: Particle[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i + Math.random(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        symbol: NOTES[Math.floor(Math.random() * NOTES.length)],
        color,
      }));
      setParticles((prev) => [...prev.slice(-8), ...newP]);
    },
    [color]
  );

  return (
    <div ref={containerRef} className={`relative ${className}`} onMouseEnter={spawn}>
      {children}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-10">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute text-sm select-none"
              style={{ left: p.x, top: p.y, color: p.color }}
              initial={{ opacity: 0.9, scale: 0.5, y: 0 }}
              animate={{
                opacity: 0,
                scale: 1,
                y: -30 - Math.random() * 20,
                x: (Math.random() - 0.5) * 30,
                rotate: (Math.random() - 0.5) * 40,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {p.symbol}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Ambient Floating Notes ───────────────────────────────────────
   Soft, slow-moving background notes for the dashboard.
──────────────────────────────────────────────────────────────────── */
export function AmbientNotes({ color, count = 5 }: { color: string; count?: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-lg select-none"
          style={{
            color,
            left: `${8 + i * (80 / count)}%`,
            bottom: `${5 + (i % 3) * 15}%`,
            opacity: 0,
          }}
          animate={{
            y: [0, -80 - Math.random() * 60, -160],
            opacity: [0, 0.12, 0],
            rotate: [0, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "easeInOut",
          }}
        >
          {NOTES[i % NOTES.length]}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── Mini Waveform ────────────────────────────────────────────────
   A tiny animated equalizer. Perfect for headers / footers.
──────────────────────────────────────────────────────────────────── */
export function MiniWaveform({
  color,
  bars = 5,
  height = 14,
}: {
  color: string;
  bars?: number;
  height?: number;
}) {
  return (
    <div className="flex items-end gap-[1.5px]" style={{ height }}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ backgroundColor: color, width: 2 }}
          animate={{
            height: [3, height * 0.4 + Math.random() * height * 0.5, 3],
          }}
          transition={{
            duration: 0.6 + Math.random() * 0.4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Staff Line Divider ───────────────────────────────────────────
   A subtle horizontal divider styled like musical staff lines.
──────────────────────────────────────────────────────────────────── */
export function StaffDivider({ color }: { color: string }) {
  return (
    <div className="w-full py-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-full"
          style={{ height: 1, marginBottom: i < 4 ? 2 : 0, background: color, opacity: 0.08 }}
        />
      ))}
    </div>
  );
}
