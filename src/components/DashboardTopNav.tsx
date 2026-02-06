"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard, Workflow, BarChart3, Settings, Bell, Search,
  Plus, Play, Pause, CheckCircle2, Clock, AlertTriangle, ArrowUpRight,
  ArrowDownRight, Zap, Users, Activity, ChevronDown, ArrowLeft,
  TrendingUp, Timer, Target,
} from "lucide-react";
import { DashboardTheme } from "./DashboardShell";

/* ─── Mock Data ────────────────────────────────────────────────────── */
const STATS = [
  { label: "Active Workflows", value: "24", change: "+3", up: true, icon: Workflow },
  { label: "Runs Today", value: "1,847", change: "+12%", up: true, icon: Zap },
  { label: "Team Members", value: "8", change: "+1", up: true, icon: Users },
  { label: "Uptime", value: "99.9%", change: "-0.01%", up: false, icon: Activity },
];

const WORKFLOWS = [
  { name: "Customer Onboarding", status: "active", runs: 342, lastRun: "2m ago", success: 98.5 },
  { name: "Invoice Processing", status: "active", runs: 1205, lastRun: "5m ago", success: 99.1 },
  { name: "Lead Scoring Pipeline", status: "active", runs: 89, lastRun: "12m ago", success: 97.2 },
  { name: "Support Ticket Router", status: "paused", runs: 567, lastRun: "1h ago", success: 95.8 },
  { name: "Weekly Report Generator", status: "active", runs: 52, lastRun: "3h ago", success: 100 },
  { name: "Inventory Sync", status: "error", runs: 203, lastRun: "30m ago", success: 89.4 },
];

const LIVE_METRICS = [
  { label: "Avg Response", value: "142ms", icon: Timer },
  { label: "Throughput", value: "847/hr", icon: TrendingUp },
  { label: "Error Rate", value: "0.3%", icon: Target },
];

const ACTIVITY = [
  { text: "Invoice Processing completed run #1205", time: "5m ago", type: "success" },
  { text: "New team member Alex joined", time: "1h ago", type: "info" },
  { text: "Inventory Sync failed — retrying", time: "30m ago", type: "error" },
  { text: "Weekly Report delivered to 12 recipients", time: "3h ago", type: "success" },
];

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Workflows", icon: Workflow },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

const CHART_DATA = [35, 52, 41, 68, 59, 73, 62, 81, 70, 88, 75, 92];

/* ─── Top Nav Dashboard Layout ─────────────────────────────────────── */
export default function DashboardTopNav({ theme }: { theme: DashboardTheme }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const ff = theme.fontFamily || "system-ui, sans-serif";
  const cardBr = theme.cardStyle === "pill" ? "16px" : theme.cardStyle === "sharp" ? "2px" : "8px";

  return (
    <div className="min-h-screen" style={{ background: theme.bg, color: theme.text, fontFamily: ff }}>
      {/* Scanlines */}
      {theme.showScanlines && (
        <div className="fixed inset-0 pointer-events-none z-50"
          style={{ background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px)" }} />
      )}

      {/* ─── TOP NAV ─── */}
      <header className="sticky top-0 z-40 border-b" style={{ background: theme.headerBg || theme.bgSecondary, borderColor: theme.border, backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Top row */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-4">
              <a href={`/concept${theme.conceptNum}`} className="flex items-center gap-1.5 group" style={{ color: theme.textMuted }}>
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">Back</span>
              </a>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 flex items-center justify-center" style={{ background: theme.accent, borderRadius: cardBr }}>
                  <span className="text-xs font-bold" style={{ color: theme.bg }}>O</span>
                </div>
                <span className="font-bold" style={{ color: theme.text }}>OpsOpera</span>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: theme.textFaint }} />
              <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-1.5 text-sm border outline-none"
                style={{ background: theme.bg, borderColor: theme.border, color: theme.text, borderRadius: cardBr }} />
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-1.5" style={{ color: theme.textMuted }}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full" style={{ background: theme.accent }} />
              </button>
              <div className="flex items-center gap-2 px-2 py-1 cursor-pointer" style={{ borderRadius: cardBr }}>
                <div className="w-7 h-7 flex items-center justify-center text-xs font-bold" style={{ background: `${theme.accent}20`, color: theme.accent, borderRadius: "50%" }}>JD</div>
                <ChevronDown className="w-3 h-3" style={{ color: theme.textMuted }} />
              </div>
            </div>
          </div>

          {/* Nav tabs */}
          <nav className="flex gap-1 -mb-px">
            {NAV_ITEMS.map((item) => {
              const isActive = item.label === activeNav;
              return (
                <button key={item.label} onClick={() => setActiveNav(item.label)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 transition-colors"
                  style={{
                    borderColor: isActive ? theme.accent : "transparent",
                    color: isActive ? theme.accent : theme.textMuted,
                  }}>
                  <item.icon className="w-4 h-4" />{item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ─── CONTENT ─── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Title + CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{activeNav}</h1>
            <p className="text-sm mt-1" style={{ color: theme.textMuted }}>Real-time operations overview</p>
          </div>
          <motion.button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
            style={{ background: theme.accent, color: theme.bg, borderRadius: cardBr }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Plus className="w-4 h-4" /> New Workflow
          </motion.button>
        </div>

        {/* Live metrics bar */}
        <div className="flex flex-wrap gap-4 p-4 border" style={{ background: theme.bgSecondary, borderColor: theme.border, borderRadius: cardBr }}>
          <span className="text-xs font-medium flex items-center gap-2" style={{ color: theme.accent }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: theme.accent }} />
            LIVE
          </span>
          {LIVE_METRICS.map((m) => (
            <div key={m.label} className="flex items-center gap-2 px-3 py-1 border-l" style={{ borderColor: theme.border }}>
              <m.icon className="w-3.5 h-3.5" style={{ color: theme.accentMuted }} />
              <span className="text-xs" style={{ color: theme.textMuted }}>{m.label}</span>
              <span className="text-sm font-bold" style={{ color: theme.text }}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* Stats as horizontal cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} className="p-4 border"
              style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4" style={{ color: theme.accentMuted }} />
                <span className="text-[10px] uppercase tracking-wider" style={{ color: theme.textFaint }}>{stat.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className={`text-xs flex items-center ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Workflow cards grid (instead of table) */}
        <div>
          <h2 className="text-sm font-semibold mb-4" style={{ color: theme.text }}>Active Workflows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WORKFLOWS.map((wf, i) => {
              const statusColors: Record<string, string> = { active: "#22c55e", paused: "#eab308", error: "#ef4444" };
              return (
                <motion.div key={wf.name} className="p-4 border group cursor-pointer transition-colors"
                  style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
                  whileHover={{ y: -2 }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = theme.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme.border)}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium" style={{ color: theme.text }}>{wf.name}</h3>
                    <span className="w-2 h-2 rounded-full" style={{ background: statusColors[wf.status] || statusColors.active }} />
                  </div>
                  <div className="flex items-center gap-4 text-xs" style={{ color: theme.textMuted }}>
                    <span>{wf.runs.toLocaleString()} runs</span>
                    <span>{wf.lastRun}</span>
                    <span className="ml-auto font-medium" style={{ color: wf.success > 95 ? "#22c55e" : "#eab308" }}>{wf.success}%</span>
                  </div>
                  {/* Mini sparkline */}
                  <div className="mt-3 h-8">
                    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                      <polyline fill="none" stroke={theme.accent} strokeWidth="1.5" opacity="0.4" vectorEffect="non-scaling-stroke"
                        points={CHART_DATA.slice(0, 8).map((v, j) => `${(j / 7) * 100},${30 - (v / 100) * 30}`).join(" ")} />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Activity stream as horizontal ticker */}
        <div className="p-4 border" style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}>
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: theme.textMuted }}>Activity Stream</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex-shrink-0 flex items-start gap-2 p-3 border min-w-[250px]"
                style={{ background: theme.bgSecondary, borderColor: theme.border, borderRadius: cardBr }}>
                {a.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" /> :
                 a.type === "error" ? <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" /> :
                 <Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accentMuted }} />}
                <div>
                  <p className="text-xs" style={{ color: theme.textMuted }}>{a.text}</p>
                  <p className="text-[10px] mt-1" style={{ color: theme.textFaint }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-8 py-4 text-center">
        <p className="text-[10px] tracking-wider" style={{ color: theme.textFaint }}>OpsOpera · {theme.name} Theme · Dashboard Preview</p>
      </footer>
    </div>
  );
}
