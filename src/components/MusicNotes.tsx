"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const NOTE_SYMBOLS = ["♩", "♪", "♫", "♬", "𝄞", "𝄢"];

interface FloatingNote {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
}

export function FloatingNotes({
  colors = ["#D4AF37", "#F0D060", "#8B0000"],
  maxNotes = 6,
  interval = 2000,
}: {
  colors?: string[];
  maxNotes?: number;
  interval?: number;
}) {
  const [notes, setNotes] = useState<FloatingNote[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const note: FloatingNote = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: 80 + Math.random() * 20,
        symbol: NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setNotes((prev) => [...prev.slice(-maxNotes), note]);
    }, interval);
    return () => clearInterval(timer);
  }, [colors, maxNotes, interval]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      <AnimatePresence>
        {notes.map((note) => (
          <motion.span
            key={note.id}
            initial={{ x: `${note.x}vw`, y: `${note.y}vh`, opacity: 0.8, scale: 0.5 }}
            animate={{
              y: `${note.y - 60 - Math.random() * 30}vh`,
              x: `${note.x + (Math.random() - 0.5) * 10}vw`,
              rotate: (Math.random() - 0.5) * 40,
              scale: 1,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 + Math.random() * 2, ease: "easeOut" }}
            className="absolute text-2xl md:text-3xl"
            style={{ color: note.color }}
          >
            {note.symbol}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function ClickNotes({
  colors = ["#D4AF37", "#F0D060"],
}: {
  colors?: string[];
}) {
  const [bursts, setBursts] = useState<FloatingNote[]>([]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const count = 3 + Math.floor(Math.random() * 3);
      const newNotes: FloatingNote[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i + Math.random(),
        x: e.clientX,
        y: e.clientY,
        symbol: NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setBursts((prev) => [...prev.slice(-15), ...newNotes]);
    },
    [colors]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      <AnimatePresence>
        {bursts.map((note) => (
          <motion.span
            key={note.id}
            initial={{ x: note.x, y: note.y, opacity: 1, scale: 0.3 }}
            animate={{
              y: note.y - 40 - Math.random() * 60,
              x: note.x + (Math.random() - 0.5) * 80,
              rotate: (Math.random() - 0.5) * 60,
              scale: 1.2,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute text-xl"
            style={{ color: note.color }}
          >
            {note.symbol}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function MusicWaveform({ color = "#D4AF37", barCount = 24 }: { color?: string; barCount?: number }) {
  return (
    <div className="flex items-end gap-[2px] h-8">
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            height: [4, 8 + Math.random() * 20, 4],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

export function StaffLines({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-full ${className}`} height="60" viewBox="0 0 1200 60" preserveAspectRatio="none">
      {[10, 20, 30, 40, 50].map((y) => (
        <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="currentColor" strokeWidth="1" opacity="0.3" />
      ))}
    </svg>
  );
}
