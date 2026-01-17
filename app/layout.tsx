import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const sora = Sora({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MedTrack Pro - Symptom Intelligence Dashboard",
  description: "Track symptoms with weather correlation and AI-powered clinical summaries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={sora.variable}>
        <body className="font-sans">{children}</body>
      </html>
    </ClerkProvider>
  );
}
