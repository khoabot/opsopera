"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard, Workflow, BarChart3, Settings, Bell,
  Plus, Play, Pause, CheckCircle2, AlertTriangle, ArrowUpRight,
  ArrowDownRight, Zap, Users, Activity, ArrowLeft, Sparkles,
  Eye, EyeOff,
} from "lucide-react";
import { DashboardTheme } from "./DashboardShell";

/* ─── Mock Data ────────────────────────────────────────────────────── */
const STATS = [
  { label: "Workflows", value: "24", change: "+3", up: true },
  { label: "Today's Runs", value: "1,847", change: "+12%", up: true },
  { label: "Team", value: "8", change: "+1", up: true },
  { label: "Uptime", value: "99.9%", change: "-0.01%", up: false },
];

const WORKFLOWS = [
  { name: "Customer Onboarding", status: "active", runs: 342, success: 98.5, category: "Sales" },
  { name: "Invoice Processing", status: "active", runs: 1205, success: 99.1, category: "Finance" },
  { name: "Lead Scoring Pipeline", status: "active", runs: 89, success: 97.2, category: "Marketing" },
  { name: "Support Ticket Router", status: "paused", runs: 567, success: 95.8, category: "Support" },
  { name: "Weekly Report Generator", status: "active", runs: 52, success: 100, category: "Analytics" },
  { name: "Inventory Sync", status: "error", runs: 203, success: 89.4, category: "Operations" },
  { name: "Email Campaign Trigger", status: "active", runs: 431, success: 96.7, category: "Marketing" },
];

const RECENT_RUNS = [
  { workflow: "Invoice Processing", id: "#1205", duration: "1.2s", status: "success" },
  { workflow: "Customer Onboarding", id: "#342", duration: "3.4s", status: "success" },
  { workflow: "Inventory Sync", id: "#203", duration: "0.8s", status: "error" },
  { workflow: "Lead Scoring", id: "#89", duration: "5.1s", status: "success" },
  { workflow: "Email Campaign", id: "#431", duration: "0.4s", status: "success" },
];

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Workflow, label: "Workflows" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

/* ─── Icon-only sidebar + Bento grid dashboard ────────────────────── */
export default function DashboardMinimal({ theme }: { theme: DashboardTheme }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [expandSidebar, setExpandSidebar] = useState(false);
  const ff = theme.fontFamily || "system-ui, sans-serif";
  const cardBr = theme.cardStyle === "pill" ? "16px" : theme.cardStyle === "sharp" ? "2px" : "8px";

  return (
    <div className="min-h-screen flex" style={{ background: theme.bg, color: theme.text, fontFamily: ff }}>
      {theme.showCurtainAccent && (
        <div className="fixed top-0 left-0 right-0 h-0.5 z-50" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />
      )}

      {/* ─── ICON SIDEBAR ─── */}
      <motion.aside
        className="hidden md:flex flex-col items-center py-6 border-r z-40"
        style={{ background: theme.sidebarBg || theme.bgSecondary, borderColor: theme.border }}
        animate={{ width: expandSidebar ? 200 : 64 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setExpandSidebar(true)}
        onMouseLeave={() => setExpandSidebar(false)}
      >
        <a href={`/concept${theme.conceptNum}`} className="mb-6 flex items-center gap-2 group" style={{ color: theme.textMuted }}>
          <ArrowLeft className="w-4 h-4" />
          <AnimatePresence>
            {expandSidebar && (
              <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 0.6, width: "auto" }} exit={{ opacity: 0, width: 0 }}
                className="text-[10px] uppercase tracking-wider whitespace-nowrap overflow-hidden">Back</motion.span>
            )}
          </AnimatePresence>
        </a>

        <div className="w-9 h-9 flex items-center justify-center mb-8" style={{ background: theme.accent, borderRadius: cardBr }}>
          <span className="text-sm font-bold" style={{ color: theme.bg }}>O</span>
        </div>

        <nav className="flex-1 flex flex-col gap-2 w-full px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === activeNav;
            return (
              <button key={item.label} onClick={() => setActiveNav(item.label)}
                className="flex items-center gap-3 px-3 py-2.5 transition-all whitespace-nowrap overflow-hidden"
                style={{
                  borderRadius: cardBr,
                  background: isActive ? `${theme.accent}15` : "transparent",
                  color: isActive ? theme.accent : theme.textMuted,
                }}>
                <item.icon className="w-5 h-5 shrink-0" />
                <AnimatePresence>
                  {expandSidebar && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-sm">{item.label}</motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>

        <div className="w-8 h-8 flex items-center justify-center text-xs font-bold"
          style={{ background: `${theme.accent}20`, color: theme.accent, borderRadius: "50%" }}>JD</div>
      </motion.aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 overflow-x-hidden">
        {/* Minimal header */}
        <header className="px-4 md:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">{activeNav}</h1>
            <p className="text-xs mt-0.5" style={{ color: theme.textFaint }}>Welcome back, Jane</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2" style={{ color: theme.textMuted }}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: theme.accent }} />
            </button>
            <motion.button className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
              style={{ background: theme.accent, color: theme.bg, borderRadius: cardBr }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Plus className="w-4 h-4" /> New
            </motion.button>
          </div>
        </header>

        {/* Bento Grid */}
        <main className="px-4 md:px-8 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-[100px]">
            {/* Stats - 4 small tiles */}
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} className="border p-4 flex flex-col justify-between"
                style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                <span className="text-[9px] uppercase tracking-wider" style={{ color: theme.textFaint }}>{stat.label}</span>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className={`text-[10px] flex items-center ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{stat.change}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Chart - spans 2 cols, 2 rows */}
            <motion.div className="col-span-2 row-span-2 border p-4"
              style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold">Throughput</span>
                <span className="text-[10px]" style={{ color: theme.textFaint }}>12 months</span>
              </div>
              <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-[calc(100%-24px)]">
                <defs>
                  <linearGradient id="bento-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.accent} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[35, 52, 41, 68, 59, 73, 62, 81, 70, 88, 75, 92].map((v, j, arr) => {
                  const x = (j / (arr.length - 1)) * 200;
                  const y = 80 - (v / 100) * 80;
                  return <circle key={j} cx={x} cy={y} r="2" fill={theme.accent} opacity="0.6" />;
                })}
                <polyline fill="none" stroke={theme.accent} strokeWidth="1.5" vectorEffect="non-scaling-stroke"
                  points={[35, 52, 41, 68, 59, 73, 62, 81, 70, 88, 75, 92].map((v, j, arr) => `${(j / (arr.length - 1)) * 200},${80 - (v / 100) * 80}`).join(" ")} />
                <polygon fill="url(#bento-grad)"
                  points={`0,80 ${[35, 52, 41, 68, 59, 73, 62, 81, 70, 88, 75, 92].map((v, j, arr) => `${(j / (arr.length - 1)) * 200},${80 - (v / 100) * 80}`).join(" ")} 200,80`} />
              </svg>
            </motion.div>

            {/* AI Insight tile */}
            <motion.div className="col-span-2 row-span-2 border p-4 flex flex-col"
              style={{ background: `${theme.accent}08`, borderColor: `${theme.accent}30`, borderRadius: cardBr }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4" style={{ color: theme.accent }} />
                <span className="text-xs font-semibold" style={{ color: theme.accent }}>AI Insights</span>
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                  Your <strong style={{ color: theme.text }}>Invoice Processing</strong> workflow could save 2.3 hours/week with parallel execution.
                </p>
                <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                  <strong style={{ color: theme.text }}>Inventory Sync</strong> error rate increased 40% — consider adding a retry step.
                </p>
              </div>
              <button className="text-[10px] font-medium mt-2 self-start" style={{ color: theme.accent }}>View all suggestions →</button>
            </motion.div>

            {/* Recent Runs - spans 2 cols, 3 rows */}
            <motion.div className="col-span-2 row-span-3 border p-4 overflow-hidden"
              style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              <h3 className="text-xs font-semibold mb-3">Recent Runs</h3>
              <div className="space-y-2.5">
                {RECENT_RUNS.map((run, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    {run.status === "success" ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> :
                     <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                    <span className="truncate flex-1" style={{ color: theme.textMuted }}>{run.workflow}</span>
                    <span style={{ color: theme.textFaint }}>{run.id}</span>
                    <span className="font-mono text-[10px]" style={{ color: theme.textFaint }}>{run.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Workflow list - spans 4 cols, 3 rows */}
            <motion.div className="col-span-2 md:col-span-4 row-span-3 border p-4 overflow-hidden"
              style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold">Workflows</h3>
                <button className="text-[10px]" style={{ color: theme.accent }}>View all →</button>
              </div>
              <div className="space-y-1">
                {WORKFLOWS.map((wf, i) => {
                  const statusColors: Record<string, string> = { active: "#22c55e", paused: "#eab308", error: "#ef4444" };
                  return (
                    <div key={wf.name} className="flex items-center gap-3 px-2 py-2 -mx-2 transition-colors cursor-pointer"
                      style={{ borderRadius: cardBr }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = `${theme.accent}08`)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: statusColors[wf.status] }} />
                      <span className="text-sm flex-1 truncate" style={{ color: theme.text }}>{wf.name}</span>
                      <span className="text-[10px] px-2 py-0.5" style={{ color: theme.accentMuted, background: `${theme.accent}10`, borderRadius: "999px" }}>{wf.category}</span>
                      <span className="text-xs tabular-nums" style={{ color: theme.textMuted }}>{wf.runs.toLocaleString()}</span>
                      <span className="text-xs tabular-nums w-12 text-right" style={{ color: wf.success > 95 ? "#22c55e" : "#eab308" }}>{wf.success}%</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </main>

        <footer className="px-8 py-4 text-center">
          <p className="text-[10px] tracking-wider" style={{ color: theme.textFaint }}>OpsOpera · {theme.name} Theme</p>
        </footer>
      </div>
    </div>
  );
}
