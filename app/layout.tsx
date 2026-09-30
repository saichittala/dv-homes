import type { Metadata } from "next";
import "@fontsource/manrope/300.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "DV HOMES | Premium Interior Design & Turnkey Execution Hyderabad",
  description: "Complete end-to-end responsibility from initial design to final handover. Advance planning, transparent budgeting, premium materials & regular site updates to make your dream home interior journey stress-free – DV HOMES.",
  keywords: [
    "DV HOMES",
    "DV HOMES Hyderabad",
    "DV HOMES interior design",
    "interior design Hyderabad",
    "Hyderabad 2BHK 3BHK villa interiors",
    "modular kitchen Hyderabad",
    "turnkey execution Hyderabad",
    "Arige Praveenkumar interior designer",
    "transparent interior budget Hyderabad",
    "complete home interiors Hyderabad"
  ],
  authors: [{ name: "DV HOMES - Arige Praveenkumar" }],
  openGraph: {
    title: "DV HOMES | Premium Interior Design & Turnkey Execution Services",
    description: "Complete end-to-end responsibility from initial design to final handover. Advance planning, transparent budgeting, premium materials & regular site updates to complete your dream home stress-free.",
    url: "https://dvhomes.in",
    siteName: "DV HOMES",
    images: [
      {
        url: "/assets/logo.png",
        width: 1024,
        height: 360,
        alt: "DV HOMES - Premium Interior Design & Turnkey Execution",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/assets/favicon.png", type: "image/png" }
    ],
    apple: "/assets/favicon.png"
  }
};

import ScrollRevealProvider from "./components/ScrollRevealProvider";
import Header from "./components/Header";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import TimedLeadModal from "./components/TimedLeadModal";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="antialiased">
        <ScrollRevealProvider>
          <Header />
          {children}
          <FloatingWhatsApp />
          <TimedLeadModal />
        </ScrollRevealProvider>
      </body>
    </html>
  );
}