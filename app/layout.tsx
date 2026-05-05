import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paryag Guglani | Personal Portfolio",
  description: "Personal portfolio of Paryag Guglani, AI/ML and Full Stack Developer showcasing projects, skills, and experience.",
  metadataBase: new URL("https://portfolio.paryagguglani.com"),
  openGraph: {
    title: "Paryag Guglani | Personal Portfolio",
    description: "Explore my journey in AI/ML and full-stack development through interactive projects and skills.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
