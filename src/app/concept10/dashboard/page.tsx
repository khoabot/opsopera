"use client";
import DashboardShell, { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "Opening Night",
  conceptNum: 10,
  bg: "#0a0205",
  bgSecondary: "#12050a",
  bgCard: "#180810",
  accent: "#C9A84C",
  accentMuted: "#C9A84C80",
  text: "#FFF5E0",
  textMuted: "#FFF5E0A0",
  textFaint: "#FFF5E050",
  border: "#C9A84C18",
  sidebarBg: "#080104",
  fontFamily: "Georgia, 'Palatino Linotype', serif",
  cardStyle: "sharp",
  showCurtainAccent: true,
  showMusicNotes: true,
  glowColor: "#C9A84C",
};

export default function Concept10Dashboard() {
  return <DashboardShell theme={theme} />;
}
