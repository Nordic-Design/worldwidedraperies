import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { TransitionProvider } from "./providers";
import TopBar from "./components/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Worldwide Draperies",
  description: "Custom drapery and bedding solutions for hospitality & cruise lines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--brand-ink)]`}>
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-dvh w-full">
          <Sidebar />
          <div>
            <TopBar />
            <TransitionProvider>
              {children}
            </TransitionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
