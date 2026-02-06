"use client";
import DashboardShell, { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "Grand Opera",
  conceptNum: 1,
  bg: "#0a0506",
  bgSecondary: "#120810",
  bgCard: "#160a10",
  accent: "#D4AF37",
  accentMuted: "#D4AF3780",
  text: "#FFF8E7",
  textMuted: "#FFF8E7A0",
  textFaint: "#FFF8E760",
  border: "#D4AF3718",
  sidebarBg: "#0e0609",
  fontFamily: "Georgia, 'Times New Roman', serif",
  cardStyle: "sharp",
  showMusicNotes: true,
  showCurtainAccent: true,
  glowColor: "#D4AF37",
};

export default function Concept1Dashboard() {
  return <DashboardShell theme={theme} />;
}
