import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Schema } from "@/components/Schema";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://raiansar.com"),
  title: "Rai Ansar | WordPress & React Developer, Server Expert",
  description: "Freelance WordPress & React developer with 6+ years experience. Expert in custom development, security, optimization & server management. 500+ projects completed.",
  keywords: [
    "WordPress developer",
    "WordPress expert",
    "server management",
    "cPanel expert",
    "WHM specialist",
    "WordPress security",
    "malware removal",
    "WordPress optimization",
    "WooCommerce developer",
    "PHP developer",
    "React developer",
    "website maintenance",
    "WordPress debugging",
    "server migration",
    "VPS management",
    "WordPress freelancer",
  ],
  authors: [{ name: "Rai Ansar", url: "https://raiansar.com" }],
  creator: "Rai Ansar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raiansar.com",
    siteName: "Rai Ansar",
    title: "Rai Ansar - WordPress & Server Specialist",
    description: "Expert WordPress developer and server specialist. 6+ years experience, 500+ projects. Specializing in custom development, security, and optimization.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1792,
        height: 1024,
        alt: "Rai Ansar - WordPress Developer | React Specialist | Server Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rai Ansar - WordPress & Server Specialist",
    description: "Expert WordPress developer and server specialist. 6+ years experience, 500+ projects. Specializing in custom development, security, and optimization.",
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
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.emailjs.com" />
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
        <Schema />
      </head>
      <body className={`${manrope.variable} font-sans bg-background text-foreground antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
