"use client";
import DashboardTopNav from "@/components/DashboardTopNav";
import { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "Jazz Lounge",
  conceptNum: 2,
  bg: "#0a0a14",
  bgSecondary: "#0e0e1c",
  bgCard: "#12122a",
  accent: "#00F0FF",
  accentMuted: "#00F0FF80",
  text: "#E8E8FF",
  textMuted: "#E8E8FFA0",
  textFaint: "#E8E8FF50",
  border: "#00F0FF15",
  sidebarBg: "#08081a",
  headerBg: "#0a0a14e0",
  fontFamily: "'Courier New', monospace",
  cardStyle: "rounded",
  glowColor: "#00F0FF",
};

export default function Concept2Dashboard() {
  return <DashboardTopNav theme={theme} />;
}
