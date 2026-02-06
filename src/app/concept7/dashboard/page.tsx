"use client";
import DashboardTopNav from "@/components/DashboardTopNav";
import { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "The Vinyl",
  conceptNum: 7,
  bg: "#0c0c0c",
  bgSecondary: "#141414",
  bgCard: "#1a1a1a",
  accent: "#E85D04",
  accentMuted: "#E85D0480",
  text: "#F0E6D3",
  textMuted: "#F0E6D3A0",
  textFaint: "#F0E6D350",
  border: "#E85D0418",
  sidebarBg: "#0a0a0a",
  headerBg: "#0c0c0ce0",
  fontFamily: "'Courier New', 'Lucida Console', monospace",
  cardStyle: "rounded",
  glowColor: "#E85D04",
};

export default function Concept7Dashboard() {
  return <DashboardTopNav theme={theme} />;
}
