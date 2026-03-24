import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Message sent',
  description: 'Thanks for reaching out.',
}

export default function ThankYou() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Container className="mt-16 mb-32">
        <Heading as="h1">Thanks for reaching out.</Heading>
        <Lead className="mt-6 max-w-3xl">
          I'll review your message and get back to you within 24 hours. In the
          meantime, feel free to check out my projects or connect on social
          media.
        </Lead>
      </Container>
      <Footer />
    </main>
  )
}
