"use client";
import DashboardSplit from "@/components/DashboardSplit";
import { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "The Playbill",
  conceptNum: 11,
  bg: "#FFF8E7",
  bgSecondary: "#FFF3D9",
  bgCard: "#FFFDF5",
  accent: "#D4AF37",
  accentMuted: "#D4AF3780",
  text: "#1a0a08",
  textMuted: "#1a0a08A0",
  textFaint: "#1a0a0850",
  border: "#D4AF3725",
  sidebarBg: "#FFF5DC",
  fontFamily: "Georgia, 'Palatino Linotype', serif",
  cardStyle: "sharp",
  showMusicNotes: true,
};

export default function Concept11Dashboard() {
  return <DashboardSplit theme={theme} />;
}
