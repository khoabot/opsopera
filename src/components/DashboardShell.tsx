"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard, Workflow, BarChart3, Settings, Bell, Search,
  Plus, Play, Pause, CheckCircle2, Clock, AlertTriangle, ArrowUpRight,
  ArrowDownRight, Zap, Users, Activity, ChevronRight, Menu, X,
  LogOut, HelpCircle, ArrowLeft,
} from "lucide-react";

/* ─── Theme Types ──────────────────────────────────────────────────── */
export interface DashboardTheme {
  name: string;
  conceptNum: number;
  /* colors */
  bg: string;
  bgSecondary: string;
  bgCard: string;
  accent: string;
  accentMuted: string;
  text: string;
  textMuted: string;
  textFaint: string;
  border: string;
  /* optional */
  sidebarBg?: string;
  headerBg?: string;
  fontFamily?: string;
  borderRadius?: string;
  /* decorative flags */
  showMusicNotes?: boolean;
  showScanlines?: boolean;
  showCurtainAccent?: boolean;
  cardStyle?: "sharp" | "rounded" | "pill";
  glowColor?: string;
}

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
  { name: "Email Campaign Trigger", status: "active", runs: 431, lastRun: "8m ago", success: 96.7 },
];

const ACTIVITY = [
  { text: "Invoice Processing completed run #1205", time: "5m ago", type: "success" },
  { text: "New team member Alex joined", time: "1h ago", type: "info" },
  { text: "Inventory Sync failed — retrying", time: "30m ago", type: "error" },
  { text: "Weekly Report delivered to 12 recipients", time: "3h ago", type: "success" },
  { text: "Lead Scoring model retrained", time: "5h ago", type: "info" },
  { text: "Customer Onboarding: 3 new triggers added", time: "6h ago", type: "info" },
];

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Workflows", icon: Workflow },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

const CHART_DATA = [35, 52, 41, 68, 59, 73, 62, 81, 70, 88, 75, 92];
const CHART_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* ─── Helpers ──────────────────────────────────────────────────────── */
function StatusBadge({ status, theme }: { status: string; theme: DashboardTheme }) {
  const colors: Record<string, { bg: string; text: string; icon: typeof Play }> = {
    active: { bg: "bg-emerald-500/15", text: "text-emerald-400", icon: Play },
    paused: { bg: "bg-yellow-500/15", text: "text-yellow-400", icon: Pause },
    error: { bg: "bg-red-500/15", text: "text-red-400", icon: AlertTriangle },
  };
  const c = colors[status] || colors.active;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${c.bg} ${c.text}`}
      style={{ borderRadius: theme.cardStyle === "pill" ? "999px" : theme.cardStyle === "rounded" ? "6px" : "2px" }}>
      <Icon className="w-3 h-3" /> {status}
    </span>
  );
}

function MiniChart({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" points={points} />
      <polygon fill={`url(#grad-${color.replace("#", "")})`} points={`0,100 ${points} 100,100`} />
    </svg>
  );
}

/* ─── Main DashboardShell ──────────────────────────────────────────── */
export default function DashboardShell({ theme }: { theme: DashboardTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const ff = theme.fontFamily || "system-ui, sans-serif";
  const br = theme.borderRadius || "8px";
  const cardBr = theme.cardStyle === "pill" ? "16px" : theme.cardStyle === "sharp" ? "2px" : br;

  return (
    <div className="min-h-screen flex" style={{ background: theme.bg, color: theme.text, fontFamily: ff }}>
      {/* Scanlines overlay */}
      {theme.showScanlines && (
        <div className="fixed inset-0 pointer-events-none z-50"
          style={{ background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px)" }} />
      )}

      {/* Curtain accent top */}
      {theme.showCurtainAccent && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />
      )}

      {/* ─── SIDEBAR (desktop) ─── */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r"
        style={{ background: theme.sidebarBg || theme.bgSecondary, borderColor: theme.border }}>
        {/* Logo area */}
        <div className="p-6 border-b" style={{ borderColor: theme.border }}>
          <a href={`/concept${theme.conceptNum}`} className="flex items-center gap-2 group" style={{ color: theme.textMuted }}>
            <ArrowLeft className="w-4 h-4 group-hover:opacity-70 transition-opacity" />
            <span className="text-xs tracking-wider uppercase opacity-60">Back to landing</span>
          </a>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: theme.accent, borderRadius: cardBr }}>
              <span className="text-sm font-bold" style={{ color: theme.bg }}>O</span>
            </div>
            <span className="font-bold text-lg" style={{ color: theme.text }}>OpsOpera</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === activeNav;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all"
                style={{
                  borderRadius: cardBr,
                  background: isActive ? `${theme.accent}15` : "transparent",
                  color: isActive ? theme.accent : theme.textMuted,
                }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t space-y-1" style={{ borderColor: theme.border }}>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm" style={{ color: theme.textMuted, borderRadius: cardBr }}>
            <HelpCircle className="w-4 h-4" /> Help
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm" style={{ color: theme.textMuted, borderRadius: cardBr }}>
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </aside>

      {/* ─── MOBILE SIDEBAR ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/50 md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)} />
            <motion.aside className="fixed left-0 top-0 bottom-0 w-64 z-50 md:hidden border-r flex flex-col"
              style={{ background: theme.sidebarBg || theme.bgSecondary, borderColor: theme.border }}
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}>
              <div className="p-4 flex justify-between items-center border-b" style={{ borderColor: theme.border }}>
                <span className="font-bold" style={{ color: theme.text }}>OpsOpera</span>
                <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" style={{ color: theme.textMuted }} /></button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = item.label === activeNav;
                  return (
                    <button key={item.label} onClick={() => { setActiveNav(item.label); setSidebarOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm"
                      style={{ borderRadius: cardBr, background: isActive ? `${theme.accent}15` : "transparent", color: isActive ? theme.accent : theme.textMuted }}>
                      <item.icon className="w-4 h-4" />{item.label}
                    </button>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b px-4 md:px-8 py-4 flex items-center gap-4"
          style={{ background: theme.headerBg || theme.bg, borderColor: theme.border, backdropFilter: "blur(12px)" }}>
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" style={{ color: theme.textMuted }} />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: theme.textFaint }} />
            <input
              type="text" placeholder="Search workflows, runs, team..."
              className="w-full max-w-md pl-10 pr-4 py-2 text-sm border outline-none"
              style={{ background: theme.bgSecondary, borderColor: theme.border, color: theme.text, borderRadius: cardBr }}
            />
          </div>
          <button className="relative p-2" style={{ color: theme.textMuted }}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: theme.accent }} />
          </button>
          <div className="w-8 h-8 flex items-center justify-center text-xs font-bold"
            style={{ background: `${theme.accent}20`, color: theme.accent, borderRadius: "50%" }}>
            JD
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 space-y-6">
          {/* Title row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: theme.text }}>
                Dashboard
              </h1>
              <p className="text-sm mt-1" style={{ color: theme.textMuted }}>
                Welcome back. Here&apos;s your operations overview.
              </p>
            </div>
            <motion.button
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
              style={{ background: theme.accent, color: theme.bg, borderRadius: cardBr }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" /> New Workflow
            </motion.button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="p-5 border"
                style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr,
                  boxShadow: theme.glowColor ? `0 0 20px ${theme.glowColor}10` : undefined }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-wider" style={{ color: theme.textMuted }}>{stat.label}</span>
                  <stat.icon className="w-4 h-4" style={{ color: theme.accentMuted }} />
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold" style={{ color: theme.text }}>{stat.value}</span>
                  <span className={`text-xs flex items-center gap-0.5 pb-1 ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart + Activity row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <motion.div className="lg:col-span-2 p-6 border"
              style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold" style={{ color: theme.text }}>Workflow Runs</h2>
                <span className="text-xs" style={{ color: theme.textMuted }}>Last 12 months</span>
              </div>
              <div className="relative">
                <MiniChart data={CHART_DATA} color={theme.accent} height={160} />
                <div className="flex justify-between mt-2">
                  {CHART_LABELS.map((l) => (
                    <span key={l} className="text-[9px]" style={{ color: theme.textFaint }}>{l}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Activity */}
            <motion.div className="p-6 border"
              style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <h2 className="text-sm font-semibold mb-4" style={{ color: theme.text }}>Recent Activity</h2>
              <div className="space-y-4">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-1 shrink-0">
                      {a.type === "success" ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> :
                       a.type === "error" ? <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> :
                       <Clock className="w-3.5 h-3.5" style={{ color: theme.accentMuted }} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>{a.text}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: theme.textFaint }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Workflows Table */}
          <motion.div className="border overflow-hidden"
            style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: theme.border }}>
              <h2 className="text-sm font-semibold" style={{ color: theme.text }}>Workflows</h2>
              <button className="text-xs flex items-center gap-1" style={{ color: theme.accent }}>
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: theme.border }}>
                    {["Name", "Status", "Runs", "Last Run", "Success Rate"].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-[10px] uppercase tracking-wider font-medium"
                        style={{ color: theme.textFaint }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {WORKFLOWS.map((wf, i) => (
                    <tr key={wf.name} className="border-b last:border-b-0 transition-colors"
                      style={{ borderColor: theme.border }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = `${theme.accent}08`)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td className="px-6 py-3.5 font-medium" style={{ color: theme.text }}>{wf.name}</td>
                      <td className="px-6 py-3.5"><StatusBadge status={wf.status} theme={theme} /></td>
                      <td className="px-6 py-3.5" style={{ color: theme.textMuted }}>{wf.runs.toLocaleString()}</td>
                      <td className="px-6 py-3.5" style={{ color: theme.textMuted }}>{wf.lastRun}</td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 overflow-hidden" style={{ background: `${theme.accent}15`, borderRadius: "999px" }}>
                            <div style={{ width: `${wf.success}%`, height: "100%", background: wf.success > 95 ? "#22c55e" : wf.success > 90 ? "#eab308" : "#ef4444", borderRadius: "999px" }} />
                          </div>
                          <span className="text-xs" style={{ color: theme.textMuted }}>{wf.success}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Create Automation", desc: "Build a new workflow from scratch or templates", icon: Plus },
              { label: "View Analytics", desc: "Deep dive into your operations performance", icon: BarChart3 },
              { label: "Invite Team", desc: "Add members and manage permissions", icon: Users },
            ].map((action, i) => (
              <motion.button
                key={action.label}
                className="p-5 border text-left group transition-colors"
                style={{ background: theme.bgCard, borderColor: theme.border, borderRadius: cardBr }}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = theme.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme.border)}
              >
                <action.icon className="w-5 h-5 mb-3" style={{ color: theme.accent }} />
                <h3 className="text-sm font-semibold mb-1" style={{ color: theme.text }}>{action.label}</h3>
                <p className="text-xs" style={{ color: theme.textFaint }}>{action.desc}</p>
              </motion.button>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="px-8 py-4 border-t text-center" style={{ borderColor: theme.border }}>
          <p className="text-[10px] tracking-wider" style={{ color: theme.textFaint }}>
            OpsOpera · {theme.name} Theme · Dashboard Preview
          </p>
        </footer>
      </div>

      {/* Music notes decoration */}
      {theme.showMusicNotes && (
        <div className="fixed bottom-4 right-4 text-2xl opacity-10 pointer-events-none" style={{ color: theme.accent }}>
          ♪ ♫ ♩
        </div>
      )}
    </div>
  );
}
