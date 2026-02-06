"use client";
import DashboardShell, { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "The Concert Hall",
  conceptNum: 5,
  bg: "#050510",
  bgSecondary: "#0a0a1a",
  bgCard: "#0e0e22",
  accent: "#FFD700",
  accentMuted: "#FFD70080",
  text: "#FFFFF0",
  textMuted: "#FFFFF0A0",
  textFaint: "#FFFFF050",
  border: "#FFD70015",
  sidebarBg: "#04040e",
  fontFamily: "Georgia, 'Times New Roman', serif",
  cardStyle: "rounded",
  showMusicNotes: true,
  showCurtainAccent: true,
  glowColor: "#FFD700",
};

export default function Concept5Dashboard() {
  return <DashboardShell theme={theme} />;
}
