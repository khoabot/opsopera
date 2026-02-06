"use client";
import DashboardMinimal from "@/components/DashboardMinimal";
import { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "The Score",
  conceptNum: 8,
  bg: "#FDFBF5",
  bgSecondary: "#F8F4EA",
  bgCard: "#FFFFFF",
  accent: "#1a1a1a",
  accentMuted: "#1a1a1a80",
  text: "#1a1a1a",
  textMuted: "#1a1a1aA0",
  textFaint: "#1a1a1a50",
  border: "#1a1a1a15",
  sidebarBg: "#F5F1E5",
  fontFamily: "'Times New Roman', 'Palatino Linotype', serif",
  cardStyle: "sharp",
  showMusicNotes: true,
};

export default function Concept8Dashboard() {
  return <DashboardMinimal theme={theme} />;
}
