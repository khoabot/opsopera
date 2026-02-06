"use client";
import DashboardMinimal from "@/components/DashboardMinimal";
import { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "Prima Donna",
  conceptNum: 12,
  bg: "#0a0808",
  bgSecondary: "#111010",
  bgCard: "#161414",
  accent: "#D4AF37",
  accentMuted: "#D4AF3780",
  text: "#FFF8E7",
  textMuted: "#FFF8E7A0",
  textFaint: "#FFF8E750",
  border: "#D4AF3712",
  sidebarBg: "#080606",
  fontFamily: "Georgia, serif",
  cardStyle: "sharp",
  showCurtainAccent: true,
  glowColor: "#D4AF37",
};

export default function Concept12Dashboard() {
  return <DashboardMinimal theme={theme} />;
}
