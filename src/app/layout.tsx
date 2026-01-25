import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Schema } from "@/components/Schema";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: true,
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://raiansar.com"),
  title: "Rai Ansar | Senior Full-Stack Developer",
  description: "Senior full-stack developer with 6+ years experience. Expert in React, Next.js, WordPress, and cloud infrastructure. 500+ projects delivered.",
  keywords: [
    "full-stack developer",
    "React developer",
    "Next.js developer",
    "WordPress expert",
    "server management",
    "cloud infrastructure",
    "web development",
    "freelance developer",
  ],
  authors: [{ name: "Rai Ansar", url: "https://raiansar.com" }],
  creator: "Rai Ansar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raiansar.com",
    siteName: "Rai Ansar",
    title: "Rai Ansar - Senior Full-Stack Developer",
    description: "Senior full-stack developer with 6+ years experience. Building scalable web applications and cloud infrastructure.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1792,
        height: 1024,
        alt: "Rai Ansar - Senior Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rai Ansar - Senior Full-Stack Developer",
    description: "Senior full-stack developer with 6+ years experience. Building scalable web applications and cloud infrastructure.",
    creator: "@raiansar",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.emailjs.com" />
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
        <Schema />
      </head>
      <body className={`${instrumentSerif.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
