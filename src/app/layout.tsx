import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const grotesk = localFont({
  src: "../fonts/OverusedGrotesk-VF.woff2",
  variable: "--font-grotesk",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Friday Foundry",
  description:
    "Friday Foundry is a series of live, recurring events designed to bring together established creative professionals with students and people at the beginning of their careers.",
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
