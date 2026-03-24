import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import Script from 'next/script'

const GA_ID = 'G-CS3DHX5C7C'

export const metadata: Metadata = {
  metadataBase: new URL('https://raiansar.com'),
  title: {
    template: '%s - Rai Ansar',
    default: 'Rai Ansar - Full-Stack Engineer & Founder',
  },
  description:
    'Full-stack engineer and founder based in Islamabad. I build AI-powered products, scalable web platforms, and automated content systems. 6+ years shipping.',
  keywords: [
    'full-stack engineer',
    'founder',
    'AI products',
    'Next.js developer',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Docker',
    'Claude Code',
    'AI agents',
    'LLM integrations',
    'freelance developer',
  ],
  authors: [{ name: 'Rai Ansar', url: 'https://raiansar.com' }],
  creator: 'Rai Ansar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://raiansar.com',
    siteName: 'Rai Ansar',
    title: 'Rai Ansar | Full-Stack Engineer & Founder',
    description:
      'I build AI-powered products, scalable web platforms, and automated content systems — then self-host and run them profitably.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1792,
        height: 1024,
        alt: 'Rai Ansar - Full-Stack Engineer & Founder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rai Ansar | Full-Stack Engineer & Founder',
    description:
      'I build AI-powered products, scalable web platforms, and automated content systems.',
    creator: '@iraiansar',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://raiansar.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rai Ansar',
    url: 'https://raiansar.com',
    image: 'https://raiansar.com/images/hero-rai.jpg',
    jobTitle: 'Full-Stack Engineer & Founder',
    description:
      'Full-stack engineer and founder based in Islamabad, Pakistan. Builds AI-powered products, scalable web platforms, and automated content systems. 6+ years, 300+ projects.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    sameAs: [
      'https://github.com/RaiAnsar',
      'https://linkedin.com/in/raiansar',
      'https://x.com/iraiansar',
    ],
    knowsAbout: [
      'Full-Stack Development',
      'AI/ML Integrations',
      'Claude Code',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Docker',
    ],
  }

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&display=swap"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="gjastYNKOtl/ihbW4MSPPw"
          strategy="afterInteractive"
        />
      </head>
      <body className="text-gray-950 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
