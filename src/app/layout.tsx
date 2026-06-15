import type { Metadata } from "next";
import localFont from "next/font/local";
import { intro } from "@/lib/content";
import "./globals.css";

const grotesk = localFont({
  src: "../fonts/OverusedGrotesk-VF.woff2",
  variable: "--font-grotesk",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Friday Foundry",
  description: intro.body,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${grotesk.variable} antialiased`}>
      <body className="min-h-screen bg-ff-gray text-ff-ink font-grotesk">
        {children}
      </body>
    </html>
  );
}
