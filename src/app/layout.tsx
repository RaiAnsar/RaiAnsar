import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://raiansar.com"),
  title: "Rai Ansar | Full Stack Developer & Software Architect",
  description: "Crafting efficient, scalable solutions in software & web. Full-stack engineer with 10+ years of experience turning complex problems into elegant digital experiences.",
  keywords: [
    "full-stack developer",
    "software architect",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Node.js",
    "WordPress",
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
    title: "Rai Ansar | Full Stack Developer & Software Architect",
    description: "Crafting efficient, scalable solutions in software & web. Full-stack engineer with 10+ years of experience.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1792,
        height: 1024,
        alt: "Rai Ansar - Full Stack Developer & Software Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rai Ansar | Full Stack Developer & Software Architect",
    description: "Crafting efficient, scalable solutions in software & web. Full-stack engineer with 10+ years of experience.",
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
    <html lang="en" className="scroll-smooth">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`} style={{ fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
