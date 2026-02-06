"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Check, Star } from "lucide-react";

/* ─── Ornamental Divider ─────────────────────────────────────────────── */
function OrnamentalDivider({ color = "#D4AF37" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      <svg width="60" height="12" viewBox="0 0 60 12">
        <path d="M0,6 Q15,0 30,6 Q45,12 60,6" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      </svg>
      <span style={{ color }} className="text-sm opacity-40">❧</span>
      <svg width="60" height="12" viewBox="0 0 60 12">
        <path d="M0,6 Q15,12 30,6 Q45,0 60,6" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}

/* ─── Page Card ──────────────────────────────────────────────────────── */
function PlaybillPage({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, rotateX, perspective: 1200 }}
      className={`relative mx-auto max-w-3xl ${className}`}
    >
      <div className="bg-[#FFF8E7] rounded-sm shadow-2xl shadow-black/20 border border-[#D4C5B0]/40 overflow-hidden">
        {/* Gold top edge */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        <div className="p-8 md:p-14">
          {children}
        </div>
        {/* Gold bottom edge */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
      </div>
      {/* Shadow page edges underneath */}
      <div className="absolute -bottom-1 left-2 right-2 h-2 bg-[#f0e8d0] rounded-b-sm -z-10" />
      <div className="absolute -bottom-2 left-4 right-4 h-2 bg-[#e8dfc8] rounded-b-sm -z-20" />
    </motion.div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────── */
export default function ThePlaybill() {
  const [hoveredCast, setHoveredCast] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#1a0a08] py-8 md:py-16 px-4">
      {/* Ambient texture */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22><rect width=%224%22 height=%224%22 fill=%22%23d4c5b0%22/><rect width=%221%22 height=%221%22 fill=%22%23c4b5a0%22/></svg>')" }}
      />

      {/* Back link */}
      <a href="/" className="fixed top-4 left-4 z-30 text-[#D4AF37]/30 hover:text-[#D4AF37] text-sm transition-colors" style={{ fontFamily: "Georgia, serif" }}>
        ← Lobby
      </a>

      <div className="relative z-10 space-y-8 md:space-y-12">

        {/* ─── Cover ─── */}
        <PlaybillPage index={0}>
          <div className="text-center py-8 md:py-16">
            <div className="text-[#D4AF37]/40 text-xs tracking-[0.5em] uppercase mb-6">
              The Metropolitan Opera House presents
            </div>

            <OrnamentalDivider />

            <h1 className="text-6xl md:text-8xl font-bold text-[#2C1810] my-4" style={{ fontFamily: "Georgia, serif" }}>
              OpsOpera
            </h1>

            <p className="text-xl md:text-2xl italic text-[#2C1810]/50 mb-2" style={{ fontFamily: "Georgia, serif" }}>
              &ldquo;Make Your Business Operations Sing&rdquo;
            </p>

            <OrnamentalDivider />

            <div className="mt-8 space-y-1 text-[#2C1810]/40 text-sm" style={{ fontFamily: "Georgia, serif" }}>
              <p>An AI-Powered Automation in Three Acts</p>
              <p className="text-xs">Season 2026 · World Première</p>
            </div>

            {/* Decorative border */}
            <div className="absolute inset-6 border border-[#D4AF37]/15 pointer-events-none" />
            <div className="absolute inset-8 border border-[#D4AF37]/10 pointer-events-none" />
          </div>
        </PlaybillPage>

        {/* ─── Director's Note ─── */}
        <PlaybillPage index={1}>
          <div className="max-w-lg mx-auto">
            <h2 className="text-xs tracking-[0.4em] uppercase text-[#D4AF37]/60 mb-6 text-center">
              From the Director
            </h2>

            <div className="space-y-4 text-[#2C1810]/60 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#2C1810] first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                Business operations today are a cacophony. Teams drown in manual tasks,
                tools refuse to speak to one another, and data lives in silos that
                would make even the most patient conductor weep.
              </p>
              <p>
                OpsOpera was born from a simple conviction: that every business
                deserves the beauty of perfectly orchestrated operations. Our AI
                doesn&apos;t just automate — it <em>conducts</em>. It learns the unique
                score of your business and arranges every process, every handoff,
                every decision into a harmonious performance.
              </p>
              <p>
                Tonight, we invite you to experience what your operations could sound
                like when every part is in tune.
              </p>
            </div>

            <div className="mt-8 text-right text-[#2C1810]/40" style={{ fontFamily: "Georgia, serif" }}>
              <p className="italic">— The OpsOpera Company</p>
            </div>
          </div>
        </PlaybillPage>

        {/* ─── Tonight's Cast ─── */}
        <PlaybillPage index={2}>
          <h2 className="text-xs tracking-[0.4em] uppercase text-[#D4AF37]/60 mb-8 text-center">
            Tonight&apos;s Cast
          </h2>

          <div className="space-y-0 divide-y divide-[#D4C5B0]/30">
            {[
              {
                role: "The Conductor",
                performer: "AI Orchestration Engine",
                desc: "Learns your operations. Composes optimal workflows. Adapts to every change in real-time.",
              },
              {
                role: "First Violin",
                performer: "Visual Flow Builder",
                desc: "Drag-and-drop automation that lets you see the full score. No code. No complexity.",
              },
              {
                role: "The Ensemble",
                performer: "200+ Integrations",
                desc: "Every tool in your stack — Slack, Stripe, HubSpot, Salesforce — playing in perfect unison.",
              },
              {
                role: "The Score Keeper",
                performer: "Live Analytics",
                desc: "Real-time dashboards that visualize every metric, every beat of your operations.",
              },
              {
                role: "The Prompter",
                performer: "Natural Language AI",
                desc: "Describe what you need in plain English. The AI writes the automation. You take a bow.",
              },
            ].map((member) => (
              <motion.div
                key={member.role}
                className="py-5 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-0 cursor-default"
                onMouseEnter={() => setHoveredCast(member.role)}
                onMouseLeave={() => setHoveredCast(null)}
              >
                <div className="md:w-1/3">
                  <span
                    className="text-sm font-bold transition-colors"
                    style={{
                      fontFamily: "Georgia, serif",
                      color: hoveredCast === member.role ? "#D4AF37" : "#2C1810",
                    }}
                  >
                    {member.role}
                  </span>
                </div>
                <div className="hidden md:block flex-1 border-b border-dotted border-[#D4C5B0]/40 mx-4 mb-1" />
                <div className="md:w-2/5 md:text-right">
                  <span className="text-sm text-[#2C1810]/70" style={{ fontFamily: "Georgia, serif" }}>
                    {member.performer}
                  </span>
                </div>
                {hoveredCast === member.role && (
                  <motion.p
                    className="md:absolute md:hidden text-xs text-[#2C1810]/40 mt-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {member.desc}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </PlaybillPage>

        {/* ─── Synopsis ─── */}
        <PlaybillPage index={3}>
          <h2 className="text-xs tracking-[0.4em] uppercase text-[#D4AF37]/60 mb-8 text-center">
            Synopsis
          </h2>

          <div className="space-y-10">
            {[
              {
                act: "Act I — Describe",
                text: "The curtain rises on your operations. You describe what you need in plain language — no technical jargon, no flowcharts. Just tell the AI conductor what the business requires.",
              },
              {
                act: "Act II — Compose",
                text: "The AI studies your tools, your data flows, your team's patterns. It composes the perfect automation — a score tailored precisely to your business. You refine it with our visual builder until every note is right.",
              },
              {
                act: "Act III — Perform",
                text: "Hit play. Your automation runs 24/7, handling the work that used to consume your team's days. Real-time analytics let you watch the performance unfold. Your operations finally sing.",
              },
            ].map((act, i) => (
              <motion.div
                key={act.act}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <h3 className="text-lg font-bold text-[#2C1810] mb-2" style={{ fontFamily: "Georgia, serif" }}>
                  {act.act}
                </h3>
                <p className="text-[#2C1810]/50 leading-relaxed text-sm" style={{ fontFamily: "Georgia, serif" }}>
                  {act.text}
                </p>
              </motion.div>
            ))}
          </div>
        </PlaybillPage>

        {/* ─── Reviews ─── */}
        <PlaybillPage index={4}>
          <h2 className="text-xs tracking-[0.4em] uppercase text-[#D4AF37]/60 mb-8 text-center">
            Press Reviews
          </h2>

          <div className="space-y-8">
            {[
              {
                quote: "A revelation. OpsOpera transformed our operations from a chaotic rehearsal into a polished performance.",
                source: "Sarah Chen, VP of Operations, TechScale",
                stars: 5,
              },
              {
                quote: "We saved 40 hours per week. But more than that — our team actually enjoys building automations now.",
                source: "James Park, Head of Ops, Runway",
                stars: 5,
              },
              {
                quote: "The AI doesn't just automate. It truly orchestrates. Nothing else in the market comes close.",
                source: "Aisha Patel, CTO, ModalAI",
                stars: 5,
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="flex justify-center gap-0.5 mb-3">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <Star key={s} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <blockquote
                  className="text-[#2C1810]/70 italic leading-relaxed max-w-md mx-auto"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <p className="text-[#2C1810]/30 text-xs mt-2" style={{ fontFamily: "Georgia, serif" }}>
                  — {review.source}
                </p>
                {i < 2 && <OrnamentalDivider />}
              </motion.div>
            ))}
          </div>
        </PlaybillPage>

        {/* ─── Tickets ─── */}
        <PlaybillPage index={5}>
          <h2 className="text-xs tracking-[0.4em] uppercase text-[#D4AF37]/60 mb-8 text-center">
            Tickets
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Gallery", price: "Free", desc: "For first-time attendees",
                items: ["5 automations", "1,000 runs/mo", "Community support", "Core integrations"] },
              { name: "Stalls", price: "$49", desc: "The finest view in the house", popular: true,
                items: ["Unlimited automations", "50K runs/mo", "Priority support", "Advanced analytics", "Team features", "All integrations"] },
              { name: "Royal Box", price: "$199", desc: "The ultimate private experience",
                items: ["Everything in Stalls", "Unlimited runs", "Dedicated concierge", "SLA guarantee", "Custom AI training", "White-glove onboarding"] },
            ].map((tier, i) => (
              <motion.div
                key={tier.name}
                className={`p-6 rounded-sm text-center ${
                  tier.popular
                    ? "border-2 border-[#D4AF37]/40 bg-[#D4AF37]/[0.03]"
                    : "border border-[#D4C5B0]/30"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                {tier.popular && (
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#D4AF37]">Recommended</span>
                )}
                <h3 className="text-lg font-bold text-[#2C1810] mt-1" style={{ fontFamily: "Georgia, serif" }}>
                  {tier.name}
                </h3>
                <p className="text-[#2C1810]/30 text-xs italic" style={{ fontFamily: "Georgia, serif" }}>
                  {tier.desc}
                </p>
                <div className="my-3">
                  <span className="text-3xl font-bold text-[#2C1810]">{tier.price}</span>
                  {tier.price !== "Free" && <span className="text-[#2C1810]/30 text-xs">/month</span>}
                </div>
                <ul className="space-y-1.5 mb-4 text-left">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-[#2C1810]/50">
                      <Check className="w-3 h-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-sm text-xs font-bold transition-all ${
                    tier.popular
                      ? "bg-[#D4AF37] text-[#2C1810] hover:bg-[#F0D060]"
                      : "border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  }`}
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Reserve
                </button>
              </motion.div>
            ))}
          </div>
        </PlaybillPage>

        {/* ─── Back Cover ─── */}
        <PlaybillPage index={6} className="mb-0">
          <div className="text-center py-12 md:py-20">
            <OrnamentalDivider />

            <p className="text-[#2C1810]/50 italic text-lg mb-6" style={{ fontFamily: "Georgia, serif" }}>
              The performance begins the moment you step inside.
            </p>

            <motion.a
              href="/concept11/dashboard"
              className="inline-flex items-center px-10 py-4 bg-[#D4AF37] text-[#2C1810] font-bold text-lg rounded-sm hover:bg-[#F0D060] transition-all"
              style={{ fontFamily: "Georgia, serif" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Enter the Opera House <ArrowRight className="inline ml-2 w-5 h-5" />
            </motion.a>

            <OrnamentalDivider />

            <div className="mt-8 text-[#2C1810]/20 text-[10px] space-y-1" style={{ fontFamily: "Georgia, serif" }}>
              <p>OpsOpera, Inc. · Est. 2026</p>
              <p>Photography and recording are strictly prohibited during the performance.</p>
              <p>Please silence all manual processes before the curtain rises.</p>
            </div>
          </div>
        </PlaybillPage>
      </div>
    </div>
  );
}
