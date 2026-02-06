"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard, Workflow, BarChart3, Settings, Bell, Search,
  Plus, Play, Pause, CheckCircle2, Clock, AlertTriangle, ArrowUpRight,
  ArrowDownRight, Zap, Users, Activity, ArrowLeft, ChevronRight,
  GripVertical, ArrowRight,
} from "lucide-react";
import { DashboardTheme } from "./DashboardShell";

/* ─── Mock Data ────────────────────────────────────────────────────── */
const FEATURED_WORKFLOW = {
  name: "Customer Onboarding",
  description: "Automates the full customer journey from signup to first value moment",
  status: "active",
  runs: 342,
  success: 98.5,
  steps: [
    { name: "New Signup Detected", type: "trigger", done: true },
    { name: "Enrich Profile (Clearbit)", type: "action", done: true },
    { name: "Create CRM Contact", type: "action", done: true },
    { name: "Send Welcome Email", type: "action", done: true },
    { name: "Wait 24 hours", type: "delay", done: false },
    { name: "Check Activation", type: "condition", done: false },
    { name: "Assign to CSM", type: "action", done: false },
  ],
};

const WORKFLOWS = [
  { name: "Invoice Processing", status: "active", runs: 1205, lastRun: "5m ago" },
  { name: "Lead Scoring Pipeline", status: "active", runs: 89, lastRun: "12m ago" },
  { name: "Support Ticket Router", status: "paused", runs: 567, lastRun: "1h ago" },
  { name: "Weekly Report Generator", status: "active", runs: 52, lastRun: "3h ago" },
  { name: "Inventory Sync", status: "error", runs: 203, lastRun: "30m ago" },
];

const STATS = [
  { label: "Active", value: "24", icon: Workflow, color: "#22c55e" },
  { label: "Runs Today", value: "1.8K", icon: Zap, color: "#3b82f6" },
  { label: "Team", value: "8", icon: Users, color: "#a855f7" },
  { label: "Uptime", value: "99.9%", icon: Activity, color: "#f59e0b" },
];

const ACTIVITY = [
  { text: "Invoice Processing completed run #1205", time: "5m ago", type: "success" },
  { text: "New team member Alex joined", time: "1h ago", type: "info" },
  { text: "Inventory Sync failed — retrying", time: "30m ago", type: "error" },
  { text: "Weekly Report delivered", time: "3h ago", type: "success" },
  { text: "Lead Scoring model retrained", time: "5h ago", type: "info" },
];

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Workflows", icon: Workflow },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

/* ─── Split Panel Dashboard ────────────────────────────────────────── */
export default function DashboardSplit({ theme }: { theme: DashboardTheme }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const ff = theme.fontFamily || "system-ui, sans-serif";
  const cardBr = theme.cardStyle === "pill" ? "16px" : theme.cardStyle === "sharp" ? "2px" : "8px";

  return (
    <div className="min-h-screen flex" style={{ background: theme.bg, color: theme.text, fontFamily: ff }}>
      {/* ─── SIDEBAR ─── */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r"
        style={{ background: theme.sidebarBg || theme.bgSecondary, borderColor: theme.border }}>
        <div className="p-5 border-b" style={{ borderColor: theme.border }}>
          <a href={`/concept${theme.conceptNum}`} className="flex items-center gap-1.5 group mb-3" style={{ color: theme.textMuted }}>
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase tracking-wider opacity-60">Back to landing</span>
          </a>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: theme.accent, borderRadius: cardBr }}>
              <span className="text-xs font-bold" style={{ color: theme.bg }}>O</span>
            </div>
            <span className="font-bold" style={{ color: theme.text }}>OpsOpera</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === activeNav;
            return (
              <button key={item.label} onClick={() => setActiveNav(item.label)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-all"
                style={{ borderRadius: cardBr, background: isActive ? `${theme.accent}15` : "transparent", color: isActive ? theme.accent : theme.textMuted }}>
                <item.icon className="w-4 h-4" />{item.label}
              </button>
            );
          })}
        </nav>

        {/* Sidebar stats */}
        <div className="p-3 border-t" style={{ borderColor: theme.border }}>
          <p className="text-[9px] uppercase tracking-wider mb-3 px-3" style={{ color: theme.textFaint }}>Quick Stats</p>
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 px-3 py-1.5">
              <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
              <span className="text-xs flex-1" style={{ color: theme.textMuted }}>{s.label}</span>
              <span className="text-xs font-bold" style={{ color: theme.text }}>{s.value}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* ─── MAIN AREA ─── */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="px-4 md:px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: theme.border }}>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: theme.textFaint }} />
              <input type="text" placeholder="Search..." className="pl-8 pr-3 py-1.5 text-xs border outline-none w-48"
                style={{ background: theme.bgSecondary, borderColor: theme.border, color: theme.text, borderRadius: cardBr }} />
            </div>
            <button className="relative p-1.5" style={{ color: theme.textMuted }}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full" style={{ background: theme.accent }} />
            </button>
            <div className="w-7 h-7 flex items-center justify-center text-xs font-bold"
              style={{ background: `${theme.accent}20`, color: theme.accent, borderRadius: "50%" }}>JD</div>
          </div>
        </header>

        {/* Split content area */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* LEFT: Featured workflow */}
          <div className="lg:w-[45%] p-4 md:p-6 border-b lg:border-b-0 lg:border-r" style={{ borderColor: theme.border }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold" style={{ color: theme.text }}>Featured Workflow</h2>
              <motion.button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium"
                style={{ background: theme.accent, color: theme.bg, borderRadius: cardBr }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Plus className="w-3 h-3" /> Create New
              </motion.button>
            </div>

            {/* Workflow hero card */}
            <div className="p-5 border mb-4" style={{ background: `${theme.accent}08`, borderColor: `${theme.accent}25`, borderRadius: cardBr }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold" style={{ color: theme.text }}>{FEATURED_WORKFLOW.name}</h3>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/15 text-emerald-400 uppercase tracking-wider"
                  style={{ borderRadius: "999px" }}>Active</span>
              </div>
              <p className="text-xs mb-4" style={{ color: theme.textMuted }}>{FEATURED_WORKFLOW.description}</p>

              {/* Visual pipeline steps */}
              <div className="space-y-1">
                {FEATURED_WORKFLOW.steps.map((step, i) => (
                  <motion.div key={step.name} className="flex items-center gap-3 py-1.5 px-2 -mx-2"
                    style={{ borderRadius: cardBr }}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                    <div className="w-5 h-5 flex items-center justify-center shrink-0"
                      style={{ background: step.done ? `${theme.accent}20` : `${theme.textFaint}15`, borderRadius: "50%" }}>
                      {step.done ? <CheckCircle2 className="w-3 h-3" style={{ color: theme.accent }} /> :
                       <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.textFaint }} />}
                    </div>
                    <span className="text-xs flex-1" style={{ color: step.done ? theme.text : theme.textFaint }}>{step.name}</span>
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5"
                      style={{ color: theme.textFaint, background: `${theme.textFaint}10`, borderRadius: "999px" }}>{step.type}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-4 pt-3 border-t" style={{ borderColor: theme.border }}>
                <span className="text-xs" style={{ color: theme.textMuted }}>{FEATURED_WORKFLOW.runs} runs</span>
                <span className="text-xs text-emerald-400">{FEATURED_WORKFLOW.success}% success</span>
              </div>
            </div>

            {/* Other workflows list */}
            <h3 className="text-xs font-semibold mb-2" style={{ color: theme.textMuted }}>Other Workflows</h3>
            <div className="space-y-1">
              {WORKFLOWS.map((wf) => {
                const statusColors: Record<string, string> = { active: "#22c55e", paused: "#eab308", error: "#ef4444" };
                return (
                  <div key={wf.name} className="flex items-center gap-2 py-2 px-2 -mx-2 cursor-pointer transition-colors"
                    style={{ borderRadius: cardBr }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = `${theme.accent}08`)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: statusColors[wf.status] }} />
                    <span className="text-sm flex-1" style={{ color: theme.text }}>{wf.name}</span>
                    <span className="text-[10px]" style={{ color: theme.textFaint }}>{wf.lastRun}</span>
                    <ChevronRight className="w-3 h-3" style={{ color: theme.textFaint }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Activity & metrics */}
          <div className="lg:w-[55%] p-4 md:p-6 space-y-5">
            {/* Stat chips */}
            <div className="flex flex-wrap gap-3">
              {STATS.map((s, i) => (
                <motion.div key={s.label} className="flex-1 min-w-[120px] p-3 border text-center"
                  style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <s.icon className="w-4 h-4 mx-auto mb-1" style={{ color: s.color }} />
                  <div className="text-lg font-bold">{s.value}</div>
                  <div className="text-[9px] uppercase tracking-wider" style={{ color: theme.textFaint }}>{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <motion.div className="p-5 border"
              style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <h3 className="text-xs font-semibold mb-4">Workflow Performance</h3>
              <div className="flex items-end gap-1.5 h-32">
                {[35, 52, 41, 68, 59, 73, 62, 81, 70, 88, 75, 92].map((v, i) => (
                  <motion.div key={i} className="flex-1"
                    style={{ background: theme.accent, borderRadius: `${cardBr} ${cardBr} 0 0`, opacity: 0.3 + (v / 100) * 0.7 }}
                    initial={{ height: 0 }} animate={{ height: `${v}%` }} transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }} />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((l) => (
                  <span key={l} className="text-[8px] flex-1 text-center" style={{ color: theme.textFaint }}>{l}</span>
                ))}
              </div>
            </motion.div>

            {/* Activity feed */}
            <motion.div className="p-5 border"
              style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <h3 className="text-xs font-semibold mb-4">Activity Feed</h3>
              <div className="space-y-3">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="mt-0.5 shrink-0">
                      {a.type === "success" ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> :
                       a.type === "error" ? <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> :
                       <Clock className="w-3.5 h-3.5" style={{ color: theme.accentMuted }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs" style={{ color: theme.textMuted }}>{a.text}</p>
                    </div>
                    <span className="text-[10px] shrink-0" style={{ color: theme.textFaint }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <footer className="px-6 py-3 border-t text-center" style={{ borderColor: theme.border }}>
          <p className="text-[10px] tracking-wider" style={{ color: theme.textFaint }}>OpsOpera · {theme.name} Theme · Dashboard Preview</p>
        </footer>
      </div>
    </div>
  );
}
