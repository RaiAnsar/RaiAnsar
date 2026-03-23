import { type Metadata } from 'next'
import Script from 'next/script'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

const GA_ID = 'G-CS3DHX5C7C'

export const metadata: Metadata = {
  metadataBase: new URL('https://raiansar.com'),
  title: {
    template: '%s - Rai Ansar',
    default:
      'Rai Ansar - Full-Stack Developer & DevOps Expert',
  },
  description:
    'Full-stack developer & DevOps expert in Islamabad. I build fast websites, fix servers, and turn technical debt into scalable systems. 6+ years experience.',
  keywords: [
    'full-stack developer',
    'DevOps engineer',
    'software architect',
    'React developer',
    'Next.js developer',
    'TypeScript',
    'Node.js',
    'WordPress',
    'cloud infrastructure',
    'web performance',
    'freelance developer',
    'site optimization',
  ],
  authors: [{ name: 'Rai Ansar', url: 'https://raiansar.com' }],
  creator: 'Rai Ansar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://raiansar.com',
    siteName: 'Rai Ansar',
    title: 'Rai Ansar | Full-Stack Developer & DevOps Expert',
    description:
      'Full-stack developer & DevOps expert. I build fast websites, fix servers, and turn technical debt into scalable systems.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1792,
        height: 1024,
        alt: 'Rai Ansar - Full-Stack Developer & DevOps Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rai Ansar | Full-Stack Developer & DevOps Expert',
    description:
      'Full-stack developer & DevOps expert. I build fast websites, fix servers, and turn technical debt into scalable systems.',
    creator: '@raiansar',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://raiansar.com',
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
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
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rai Ansar',
    url: 'https://raiansar.com',
    image: 'https://raiansar.com/images/hero-rai.jpg',
    jobTitle: 'Full-Stack Developer & DevOps Expert',
    description:
      'Full-stack developer and DevOps expert based in Islamabad, Pakistan with 6+ years of experience and 300+ projects delivered.',
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
  }

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
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
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
