"use client";
import DashboardTopNav from "@/components/DashboardTopNav";
import { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "Synthwave Conductor",
  conceptNum: 4,
  bg: "#0a0015",
  bgSecondary: "#0f0020",
  bgCard: "#150028",
  accent: "#FF2D95",
  accentMuted: "#FF2D9580",
  text: "#FFE4F0",
  textMuted: "#FFE4F0A0",
  textFaint: "#FFE4F050",
  border: "#FF2D9518",
  sidebarBg: "#08001a",
  headerBg: "#0a0015e0",
  fontFamily: "'Courier New', monospace",
  cardStyle: "sharp",
  showScanlines: true,
  glowColor: "#FF2D95",
};

export default function Concept4Dashboard() {
  return <DashboardTopNav theme={theme} />;
}
