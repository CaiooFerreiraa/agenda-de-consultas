import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedSchedule | Sua Saúde em Primeiro Lugar",
  description: "Plataforma moderna para agendamentos de consultas médicas.",
  icons: {
    icon: [
      { url: "/favicon-medical.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: "/favicon-medical.svg",
    shortcut: "/favicon-medical.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased selection:bg-primary selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
