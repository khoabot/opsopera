"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { OpsOperaLogo } from "@/components/OpsOperaLogo";
import { FloatingNotes, MusicWaveform } from "@/components/MusicNotes";
import {
  Sparkles,
  Zap,
  BarChart3,
  Bot,
  ArrowRight,
  Check,
  Play,
  ChevronDown,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Conductor",
    description:
      "Our AI orchestrates your workflows like a maestro commands an orchestra — every operation perfectly timed.",
  },
  {
    icon: Zap,
    title: "Instant Overtures",
    description:
      "Launch automations in seconds. What once took days of setup now begins with a single command.",
  },
  {
    icon: BarChart3,
    title: "Performance Scores",
    description:
      "Real-time analytics that read like a musical score — every metric, every beat, perfectly composed.",
  },
  {
    icon: Sparkles,
    title: "Harmonized Integrations",
    description:
      "Connect your tools into one seamless symphony. 200+ integrations that play in perfect harmony.",
  },
];

const workflowSteps = [
  { label: "Trigger", note: "𝄞", desc: "An event starts the composition" },
  { label: "Orchestrate", note: "♪", desc: "AI arranges the perfect workflow" },
  { label: "Execute", note: "♫", desc: "Actions perform in harmony" },
  { label: "Crescendo", note: "♬", desc: "Results amplify your success" },
];

const pricingTiers = [
  {
    name: "Overture",
    price: "Free",
    desc: "For soloists getting started",
    features: ["5 automations", "1,000 runs/month", "Community support", "Basic analytics"],
  },
  {
    name: "Symphony",
    price: "$49",
    desc: "For growing ensembles",
    features: [
      "Unlimited automations",
      "50,000 runs/month",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "Team collaboration",
    ],
    popular: true,
  },
  {
    name: "Grand Opera",
    price: "$199",
    desc: "For the full orchestra",
    features: [
      "Everything in Symphony",
      "Unlimited runs",
      "Dedicated conductor (CSM)",
      "SLA guarantee",
      "Custom AI training",
      "White-glove onboarding",
    ],
  },
];

function CurtainReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const leftX = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const rightX = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 w-1/2 h-full z-10"
        style={{
          x: leftX,
          background: "linear-gradient(90deg, #4A0020 0%, #8B0000 100%)",
        }}
      />
      <motion.div
        className="absolute right-0 top-0 w-1/2 h-full z-10"
        style={{
          x: rightX,
          background: "linear-gradient(270deg, #4A0020 0%, #8B0000 100%)",
        }}
      />
      {children}
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <div className="h-px w-24 bg-gradient-to-r from-transparent to-opera-gold" />
      <span className="text-opera-gold text-xl">𝄞</span>
      <div className="h-px w-24 bg-gradient-to-l from-transparent to-opera-gold" />
    </div>
  );
}

export default function GrandOpera() {
  const [activeStep, setActiveStep] = useState(0);
  const [loadingDemo, setLoadingDemo] = useState(false);

  const handleDemoClick = () => {
    setLoadingDemo(true);
    setActiveStep(0);
    const steps = [0, 1, 2, 3];
    steps.forEach((step, i) => {
      setTimeout(() => {
        setActiveStep(step);
        if (i === steps.length - 1) {
          setTimeout(() => setLoadingDemo(false), 1000);
        }
      }, i * 800);
    });
  };

  return (
    <div className="min-h-screen bg-opera-velvet text-opera-cream opera-scroll overflow-x-hidden">
      <FloatingNotes
        colors={["#D4AF37", "#F0D060", "#8B0000"]}
        maxNotes={4}
        interval={3000}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-opera-velvet/80 border-b border-opera-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <OpsOperaLogo variant="opera" size="sm" />
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ fontFamily: "Georgia, serif" }}>
            <a href="#features" className="text-opera-cream/70 hover:text-opera-gold transition-colors">
              Features
            </a>
            <a href="#workflow" className="text-opera-cream/70 hover:text-opera-gold transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-opera-cream/70 hover:text-opera-gold transition-colors">
              Pricing
            </a>
            <button className="px-5 py-2 bg-opera-gold text-opera-velvet font-semibold rounded hover:bg-opera-gold-light transition-colors">
              Request a Seat
            </button>
          </div>
          <a href="/" className="text-opera-cream/50 hover:text-opera-gold text-sm transition-colors">
            ← Concepts
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Ornamental top border */}
        <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-opera-gold to-transparent opacity-40" />

        {/* Decorative curtain drapes at top corners */}
        <div className="absolute top-0 left-0 w-32 h-64 bg-gradient-to-br from-opera-crimson/40 to-transparent rounded-br-[100px]" />
        <div className="absolute top-0 right-0 w-32 h-64 bg-gradient-to-bl from-opera-crimson/40 to-transparent rounded-bl-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative z-10"
        >
          <OpsOperaLogo variant="opera" size="lg" />

          <motion.p
            className="mt-6 text-xl md:text-2xl text-opera-gold/80 max-w-2xl mx-auto"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Make Your Business Operations Sing
          </motion.p>

          <motion.p
            className="mt-4 text-lg text-opera-cream/60 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            AI-powered automation that orchestrates every part of your business
            into a grand, harmonious performance.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <button className="group px-8 py-4 bg-opera-gold text-opera-velvet font-bold text-lg rounded hover:bg-opera-gold-light transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Begin the Overture
              <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-opera-gold/40 text-opera-gold rounded hover:border-opera-gold hover:bg-opera-gold/10 transition-all"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <Play className="inline mr-2 w-5 h-5" />
              Watch the Performance
            </button>
          </motion.div>

          {/* Waveform decoration */}
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <MusicWaveform color="#D4AF37" barCount={40} />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-opera-gold/50" />
        </motion.div>
      </section>

      <GoldDivider />

      {/* Features Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold gold-shimmer"
            style={{ fontFamily: "Georgia, serif" }}
          >
            The Grand Repertoire
          </h2>
          <p className="mt-4 text-opera-cream/60 text-lg max-w-2xl mx-auto">
            Every feature composed to perfection, every capability designed to
            make your operations a masterpiece.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group relative p-8 rounded-lg border border-opera-gold/20 bg-gradient-to-br from-opera-burgundy/30 to-transparent hover:border-opera-gold/50 transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="absolute top-0 right-0 p-4 text-2xl text-opera-gold/20 group-hover:text-opera-gold/40 transition-colors">
                ♪
              </div>
              <feature.icon className="w-10 h-10 text-opera-gold mb-4" />
              <h3
                className="text-2xl font-bold text-opera-cream mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {feature.title}
              </h3>
              <p className="text-opera-cream/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* Workflow / How It Works */}
      <section id="workflow" className="py-24 px-6 max-w-5xl mx-auto">
        <CurtainReveal>
          <div className="py-20 px-6 text-center">
            <h2
              className="text-4xl md:text-5xl font-bold gold-shimmer mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              The Four Acts
            </h2>
            <p className="text-opera-cream/60 text-lg mb-12 max-w-xl mx-auto">
              Every great opera unfolds in acts. So does every great automation.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  className={`p-6 rounded-lg border cursor-pointer transition-all ${
                    activeStep === i
                      ? "border-opera-gold bg-opera-gold/10 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                      : "border-opera-gold/20 hover:border-opera-gold/40"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveStep(i)}
                >
                  <motion.span
                    className="text-4xl block mb-3"
                    animate={
                      activeStep === i
                        ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }
                        : {}
                    }
                    transition={{ duration: 0.6 }}
                  >
                    {step.note}
                  </motion.span>
                  <div
                    className="text-sm text-opera-gold/60 mb-1"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Act {i + 1}
                  </div>
                  <h4
                    className="text-lg font-bold text-opera-cream"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {step.label}
                  </h4>
                  <p className="text-sm text-opera-cream/50 mt-2">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleDemoClick}
              disabled={loadingDemo}
              className="px-8 py-4 bg-opera-gold text-opera-velvet font-bold rounded hover:bg-opera-gold-light transition-all disabled:opacity-50"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {loadingDemo ? (
                <span className="flex items-center gap-2">
                  <MusicWaveform color="#1A0011" barCount={12} />
                  Performing...
                </span>
              ) : (
                "▶ Watch the Performance"
              )}
            </button>
          </div>
        </CurtainReveal>
      </section>

      <GoldDivider />

      {/* Social Proof */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 text-opera-gold fill-opera-gold" />
            ))}
          </div>
          <blockquote
            className="text-2xl md:text-3xl text-opera-cream/80 italic max-w-3xl mx-auto"
            style={{ fontFamily: "Georgia, serif" }}
          >
            &ldquo;OpsOpera turned our chaotic operations into a symphony. We saved 40 hours
            per week and our team actually enjoys their workflows now.&rdquo;
          </blockquote>
          <div className="mt-6 text-opera-gold">
            <div className="font-bold" style={{ fontFamily: "Georgia, serif" }}>
              Sarah Chen
            </div>
            <div className="text-opera-cream/50 text-sm">VP of Operations, TechScale Inc.</div>
          </div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold gold-shimmer"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Choose Your Score
          </h2>
          <p className="mt-4 text-opera-cream/60 text-lg">
            From solo performances to full orchestral productions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`relative p-8 rounded-lg border ${
                tier.popular
                  ? "border-opera-gold bg-gradient-to-b from-opera-burgundy/50 to-opera-velvet shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                  : "border-opera-gold/20 bg-opera-burgundy/20"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-opera-gold text-opera-velvet text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3
                className="text-2xl font-bold text-opera-cream mb-1"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {tier.name}
              </h3>
              <p className="text-opera-cream/50 text-sm mb-4">{tier.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-opera-gold">{tier.price}</span>
                {tier.price !== "Free" && (
                  <span className="text-opera-cream/40 text-sm">/month</span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-opera-cream/70">
                    <Check className="w-4 h-4 text-opera-gold mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded font-semibold transition-all ${
                  tier.popular
                    ? "bg-opera-gold text-opera-velvet hover:bg-opera-gold-light"
                    : "border border-opera-gold/40 text-opera-gold hover:bg-opera-gold/10"
                }`}
                style={{ fontFamily: "Georgia, serif" }}
              >
                {tier.price === "Free" ? "Start Free" : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2
            className="text-4xl md:text-5xl font-bold gold-shimmer mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ready for the Standing Ovation?
          </h2>
          <p className="text-opera-cream/60 text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of businesses whose operations have earned
            rave reviews since switching to OpsOpera.
          </p>
          <a href="/concept1/dashboard" className="group inline-flex items-center px-10 py-5 bg-opera-gold text-opera-velvet font-bold text-xl rounded hover:bg-opera-gold-light transition-all hover:shadow-[0_0_50px_rgba(212,175,55,0.3)]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Take Center Stage
            <ArrowRight className="inline ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-opera-gold/20 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <OpsOperaLogo variant="opera" size="sm" />
          <p className="text-opera-cream/40 text-sm" style={{ fontFamily: "Georgia, serif" }}>
            &copy; 2026 OpsOpera. All rights reserved. Make your business operations sing.
          </p>
          <div className="flex gap-4 text-opera-cream/40 text-2xl">
            <span>♩</span>
            <span>♪</span>
            <span>♫</span>
            <span>♬</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
