"use client";
import DashboardMinimal from "@/components/DashboardMinimal";
import { DashboardTheme } from "@/components/DashboardShell";

const theme: DashboardTheme = {
  name: "The Mosaic",
  conceptNum: 9,
  bg: "#0f0f0f",
  bgSecondary: "#171717",
  bgCard: "#1f1f1f",
  accent: "#A78BFA",
  accentMuted: "#A78BFA80",
  text: "#F5F5F5",
  textMuted: "#F5F5F5A0",
  textFaint: "#F5F5F550",
  border: "#A78BFA18",
  sidebarBg: "#0d0d0d",
  fontFamily: "system-ui, -apple-system, sans-serif",
  cardStyle: "rounded",
  glowColor: "#A78BFA",
};

export default function Concept9Dashboard() {
  return <DashboardMinimal theme={theme} />;
}
