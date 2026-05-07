import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyCast - Modern Weather Forecasts",
  description:
    "A modern, high-performance weather application powered by OpenWeatherMap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-blue-500 h-full m-0 p-0 overflow-x-hidden antialiased`}
      suppressHydrationWarning
    >
      <body className="m-0 p-0 h-full flex flex-col overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
