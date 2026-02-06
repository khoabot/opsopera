import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpsOpera — Make Your Business Operations Sing",
  description:
    "AI-powered automation that orchestrates your business operations into a harmonious symphony of efficiency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
