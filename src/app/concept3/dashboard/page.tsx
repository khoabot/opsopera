"use client";
import DashboardSplit from "@/components/DashboardSplit";
import { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "Sheet Music",
  conceptNum: 3,
  bg: "#FFF8EC",
  bgSecondary: "#FFF3DD",
  bgCard: "#FFFFFF",
  accent: "#8B4513",
  accentMuted: "#8B451380",
  text: "#2C1810",
  textMuted: "#2C1810A0",
  textFaint: "#2C181060",
  border: "#8B451320",
  sidebarBg: "#FFF5E4",
  fontFamily: "Georgia, 'Palatino', serif",
  cardStyle: "rounded",
  showMusicNotes: true,
};

export default function Concept3Dashboard() {
  return <DashboardSplit theme={theme} />;
}
