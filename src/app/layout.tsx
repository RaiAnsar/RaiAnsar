import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "optional",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "optional",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://raiansar.com"),
  title: "Rai Ansar | Full-Stack Developer & DevOps Expert",
  description: "Full-stack developer & DevOps expert based in Islamabad, Pakistan. I build fast websites, fix broken servers, and turn technical debt into clean, scalable systems. 6+ years, 300+ projects delivered.",
  keywords: [
    "full-stack developer",
    "DevOps engineer",
    "software architect",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Node.js",
    "WordPress",
    "cloud infrastructure",
    "web performance",
    "freelance developer",
    "site optimization",
  ],
  authors: [{ name: "Rai Ansar", url: "https://raiansar.com" }],
  creator: "Rai Ansar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raiansar.com",
    siteName: "Rai Ansar",
    title: "Rai Ansar | Full-Stack Developer & DevOps Expert",
    description: "DevOps, infrastructure & speed experts. We turn slow, crashing sites into sub-2-second machines that convert.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1792,
        height: 1024,
        alt: "Rai Ansar - Full-Stack Developer & DevOps Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rai Ansar | Full-Stack Developer & DevOps Expert",
    description: "DevOps, infrastructure & speed experts. We turn slow, crashing sites into sub-2-second machines that convert.",
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rai Ansar',
    url: 'https://raiansar.com',
    image: 'https://raiansar.com/images/hero-rai.jpg',
    jobTitle: 'Full-Stack Developer & DevOps Expert',
    description: 'Full-stack developer and DevOps expert based in Islamabad, Pakistan with 6+ years of experience and 300+ projects delivered.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    sameAs: [
      'https://github.com/RaiAnsar',
      'https://www.linkedin.com/in/raiansar/',
      'https://x.com/raiansar',
      'https://www.upwork.com/freelancers/iraiansar',
    ],
    knowsAbout: [
      'Full-Stack Development',
      'DevOps',
      'React',
      'Next.js',
      'WordPress',
      'Node.js',
      'TypeScript',
      'Cloud Infrastructure',
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${ibmPlexMono.variable} antialiased`} style={{ fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
