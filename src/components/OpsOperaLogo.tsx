"use client";

import { motion } from "framer-motion";

export function OpsOperaLogo({
  variant = "opera",
  size = "md",
}: {
  variant?: "opera" | "jazz" | "sheet";
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl md:text-6xl",
  };

  if (variant === "opera") {
    return (
      <motion.div
        className={`font-bold tracking-tight ${sizeClasses[size]}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="gold-shimmer" style={{ fontFamily: "Georgia, serif" }}>
          Ops
        </span>
        <span
          className="text-opera-gold"
          style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          Opera
        </span>
      </motion.div>
    );
  }

  if (variant === "jazz") {
    return (
      <motion.div
        className={`font-black tracking-tighter ${sizeClasses[size]}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <span className="text-jazz-neon-blue">Ops</span>
        <span className="text-jazz-neon-pink">Opera</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`font-bold tracking-wide ${sizeClasses[size]}`}
      style={{ fontFamily: "'Georgia', serif" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <span className="text-sheet-ink">Ops</span>
      <span className="text-sheet-accent">Opera</span>
      <motion.span
        className="inline-block ml-1 text-sheet-teal"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        ♪
      </motion.span>
    </motion.div>
  );
}
