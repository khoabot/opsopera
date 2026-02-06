"use client";
import DashboardSplit from "@/components/DashboardSplit";
import { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "Playful Overture",
  conceptNum: 6,
  bg: "#FFFBF5",
  bgSecondary: "#FFF5E8",
  bgCard: "#FFFFFF",
  accent: "#FF6B35",
  accentMuted: "#FF6B3580",
  text: "#1A1A2E",
  textMuted: "#1A1A2EA0",
  textFaint: "#1A1A2E50",
  border: "#FF6B3520",
  sidebarBg: "#FFF8EE",
  fontFamily: "system-ui, -apple-system, sans-serif",
  cardStyle: "pill",
  showMusicNotes: true,
};

export default function Concept6Dashboard() {
  return <DashboardSplit theme={theme} />;
}
