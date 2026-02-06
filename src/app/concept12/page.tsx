"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useAudio, AudioToggle, MELODIES } from "@/components/AudioEngine";
import { ArrowRight, Check } from "lucide-react";

/* ─── Full-bleed cinematic section ───────────────────────────────────── */
function CinematicSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <motion.section
      ref={ref}
      className={`min-h-screen flex items-center justify-center relative ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0.1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {children}
    </motion.section>
  );
}

/* ─── The massive word reveal ────────────────────────────────────────── */
function HeroWord({
  word,
  color = "#FFF8E7",
  delay = 0,
}: {
  word: string;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.h2
        className="text-[18vw] md:text-[15vw] font-bold leading-[0.85] tracking-tighter"
        style={{ fontFamily: "Georgia, serif", color }}
        initial={{ y: "110%" }}
        animate={isInView ? { y: 0 } : { y: "110%" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {word}
      </motion.h2>
    </div>
  );
}

/* ─── Slow text reveal ───────────────────────────────────────────────── */
function SlowReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Horizontal rule with opera glass motif ─────────────────────────── */
function OperaGlassDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
        <circle cx="24" cy="8" r="6" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
        <line x1="14" y1="8" x2="18" y2="8" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────── */
export default function PrimaDonna() {
  const audio = useAudio(0.2);
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    return () => audio.cleanup();
  }, []);

  return (
    <div className="bg-[#0a0808] text-[#FFF8E7] overflow-x-hidden">
      <AudioToggle
        muted={audio.muted} ready={audio.ready}
        onToggle={audio.toggleMute} onInit={audio.init}
        activeColor="#D4AF37"
      />

      {/* Fixed minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-5 flex items-center justify-between mix-blend-difference">
        <a href="/" className="text-white/30 hover:text-white/60 text-xs tracking-widest uppercase transition-colors">
          ← Back
        </a>
        <span className="text-white/20 text-[10px] tracking-[0.5em] uppercase">OpsOpera</span>
        <button
          onClick={() => { if (!audio.ready) audio.init(); audio.playMelody(MELODIES.odeToJoy.slice(0, 8), "bell", 1); }}
          className="text-white/30 hover:text-white/60 text-xs tracking-widest uppercase transition-colors"
        >
          ♪ Listen
        </button>
      </nav>

      {/* ─── I. THE NAME ─── */}
      <CinematicSection>
        <div className="text-center px-6">
          <motion.p
            className="text-[#D4AF37]/40 text-[10px] tracking-[0.6em] uppercase mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
          >
            A New Kind of Software
          </motion.p>
          <HeroWord word="Ops" color="#FFF8E7" />
          <HeroWord word="Opera" color="#D4AF37" delay={0.3} />
        </div>
      </CinematicSection>

      {/* ─── II. THE TAGLINE ─── */}
      <CinematicSection>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SlowReveal>
            <p
              className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-[#FFF8E7]/80"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Make your business
            </p>
          </SlowReveal>
          <SlowReveal delay={0.3}>
            <p
              className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight italic text-[#D4AF37]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              operations sing.
            </p>
          </SlowReveal>
          <SlowReveal delay={0.8}>
            <OperaGlassDivider />
          </SlowReveal>
        </div>
      </CinematicSection>

      {/* ─── III. THE PROBLEM ─── */}
      <CinematicSection>
        <div className="max-w-2xl mx-auto px-6">
          <SlowReveal>
            <p
              className="text-2xl md:text-4xl font-light leading-relaxed text-[#FFF8E7]/40 text-center"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Your operations are{" "}
              <span className="text-[#8B0000] font-normal">noise.</span>
            </p>
          </SlowReveal>
          <SlowReveal delay={0.5}>
            <p
              className="text-lg md:text-xl text-[#FFF8E7]/20 text-center mt-8 leading-relaxed"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Tools that don&apos;t connect. Data trapped in silos.
              <br />
              Teams buried in manual work.
              <br />
              Every day, a discordant rehearsal
              <br />
              that never becomes a performance.
            </p>
          </SlowReveal>
        </div>
      </CinematicSection>

      {/* ─── IV. THE SOLUTION — ONE WORD ─── */}
      <CinematicSection>
        <div className="text-center px-6">
          <HeroWord word="Until" color="#FFF8E7" />
          <HeroWord word="now." color="#D4AF37" delay={0.4} />
        </div>
      </CinematicSection>

      {/* ─── V. WHAT IT IS ─── */}
      <CinematicSection>
        <div className="max-w-xl mx-auto px-6 text-center">
          <SlowReveal>
            <p className="text-[#D4AF37]/40 text-[10px] tracking-[0.5em] uppercase mb-8">
              What We Built
            </p>
          </SlowReveal>
          <SlowReveal delay={0.2}>
            <p
              className="text-xl md:text-2xl font-light leading-relaxed text-[#FFF8E7]/60"
              style={{ fontFamily: "Georgia, serif" }}
            >
              An AI conductor that studies your business,
              composes the perfect automations, and orchestrates
              every operation into a single, harmonious performance.
            </p>
          </SlowReveal>
          <SlowReveal delay={0.6}>
            <OperaGlassDivider />
          </SlowReveal>
          <SlowReveal delay={0.8}>
            <p className="text-[#FFF8E7]/20 text-sm" style={{ fontFamily: "Georgia, serif" }}>
              Describe what you need. The AI writes the score. You hit play.
            </p>
          </SlowReveal>
        </div>
      </CinematicSection>

      {/* ─── VI. THE CAPABILITIES — Minimal ─── */}
      <CinematicSection>
        <div className="max-w-3xl mx-auto px-6">
          <SlowReveal>
            <p className="text-[#D4AF37]/40 text-[10px] tracking-[0.5em] uppercase mb-12 text-center">
              The Repertoire
            </p>
          </SlowReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {[
              { title: "Conduct", desc: "AI that learns your operations and composes optimal workflows in real-time." },
              { title: "Compose", desc: "A visual builder where automations feel like arranging a score. No code." },
              { title: "Connect", desc: "200+ integrations. Every tool in your stack, playing in unison." },
              { title: "Command", desc: "Real-time analytics. Every metric. Every performance, measured." },
            ].map((item, i) => (
              <SlowReveal key={item.title} delay={i * 0.15}>
                <div>
                  <h3
                    className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-2"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#FFF8E7]/30 text-sm leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                    {item.desc}
                  </p>
                </div>
              </SlowReveal>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ─── VII. SOCIAL PROOF — Single dramatic quote ─── */}
      <CinematicSection>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SlowReveal>
            <blockquote
              className="text-2xl md:text-4xl font-light italic leading-relaxed text-[#FFF8E7]/60"
              style={{ fontFamily: "Georgia, serif" }}
            >
              &ldquo;OpsOpera turned our chaos into a symphony.
              <br />
              Forty hours saved every week.
              <br />
              Our team finally breathes.&rdquo;
            </blockquote>
          </SlowReveal>
          <SlowReveal delay={0.5}>
            <p className="mt-6 text-[#D4AF37]/60 text-sm" style={{ fontFamily: "Georgia, serif" }}>
              Sarah Chen · VP of Operations · TechScale
            </p>
          </SlowReveal>
        </div>
      </CinematicSection>

      {/* ─── VIII. PRICING — Ultra-minimal ─── */}
      <CinematicSection>
        <div className="max-w-4xl mx-auto px-6 w-full">
          <SlowReveal>
            <p className="text-[#D4AF37]/40 text-[10px] tracking-[0.5em] uppercase mb-12 text-center">
              Three Seats
            </p>
          </SlowReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Gallery", price: "Free", items: ["5 automations", "1K runs/mo", "Community"] },
              { name: "Stalls", price: "$49", items: ["Unlimited", "50K runs", "Priority", "Teams", "All integrations"], featured: true },
              { name: "Royal Box", price: "$199", items: ["Everything", "Unlimited", "Dedicated", "Custom AI", "SLA"] },
            ].map((tier, i) => (
              <SlowReveal key={tier.name} delay={i * 0.15}>
                <div className={`p-8 text-center ${
                  tier.featured ? "border border-[#D4AF37]/20" : "border border-white/5"
                }`}>
                  {tier.featured && (
                    <span className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37]/60">Recommended</span>
                  )}
                  <h3 className="text-xl font-bold text-[#FFF8E7] mt-2" style={{ fontFamily: "Georgia, serif" }}>
                    {tier.name}
                  </h3>
                  <div className="my-4">
                    <span className="text-4xl font-bold text-[#D4AF37]">{tier.price}</span>
                    {tier.price !== "Free" && <span className="text-[#FFF8E7]/20 text-xs">/mo</span>}
                  </div>
                  <ul className="space-y-2">
                    {tier.items.map((item) => (
                      <li key={item} className="text-[#FFF8E7]/30 text-xs flex items-center justify-center gap-1.5">
                        <Check className="w-3 h-3 text-[#D4AF37]/50" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SlowReveal>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ─── IX. FINALE — One massive CTA ─── */}
      <CinematicSection className="min-h-[80vh]">
        <div className="text-center px-6">
          <HeroWord word="Begin." color="#D4AF37" />
          <SlowReveal delay={0.6}>
            <p
              className="text-[#FFF8E7]/30 text-lg mt-8 mb-10 max-w-md mx-auto"
              style={{ fontFamily: "Georgia, serif" }}
            >
              The stage is set. The orchestra is tuned.
              <br />
              All that&apos;s missing is you.
            </p>
          </SlowReveal>
          <SlowReveal delay={1}>
            <motion.button
              className="px-12 py-5 bg-[#D4AF37] text-[#0a0808] font-bold text-lg hover:bg-[#F0D060] transition-all"
              style={{ fontFamily: "Georgia, serif" }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(212,175,55,0.15)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (!audio.ready) audio.init();
                audio.playChord(["C3","E3","G3","C4","E4"], 3, "pad");
                setTimeout(() => window.location.href = '/concept12/dashboard', 800);
              }}
            >
              Take Your Seat
              <ArrowRight className="inline ml-3 w-5 h-5" />
            </motion.button>
          </SlowReveal>
        </div>
      </CinematicSection>

      {/* ─── Footer — barely there ─── */}
      <footer className="py-16 text-center">
        <p className="text-[#FFF8E7]/10 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "Georgia, serif" }}>
          OpsOpera · Season 2026
        </p>
      </footer>
    </div>
  );
}
