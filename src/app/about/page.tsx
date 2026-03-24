import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Full-stack engineer and founder based in Islamabad, Pakistan.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Full-stack engineer and founder.</Heading>
      <Lead className="mt-6 max-w-3xl">
        I build AI-powered products, scalable web platforms, and automated
        content systems — then self-host and run them profitably.
      </Lead>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          <h2 className="text-2xl font-medium tracking-tight">My story</h2>
          <p className="mt-6 text-sm/6 text-gray-600">
            I've been building for the web since I was a teenager — starting with
            WordPress sites and gradually moving into full-stack development,
            cloud infrastructure, and AI integrations. What began as curiosity
            turned into a career spanning 6+ years and 300+ projects.
          </p>
          <p className="mt-4 text-sm/6 text-gray-600">
            My core stack is Next.js, TypeScript, Node.js, PostgreSQL, and
            Docker. I obsess over performance, SEO, and shipping fast. I'm
            equally comfortable building a landing page or architecting a
            distributed system.
          </p>
          <p className="mt-4 text-sm/6 text-gray-600">
            Today I build and run my own products — AIToolRanked, Visual
            Sentinel, Acefina, and PrimeTime Anime — while taking on select
            client projects. I have deep expertise in Claude Code, AI agents, and
            LLM integrations.
          </p>
        </div>
        <div className="max-w-lg pt-10 lg:pt-0">
          <h2 className="text-2xl font-medium tracking-tight">
            By the numbers
          </h2>
          <hr className="mt-6 border-t border-dotted border-gray-200" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Years of experience</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                6<span className="text-[#38bdf8]">+</span>
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Projects delivered</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                300<span className="text-[#38bdf8]">+</span>
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Products launched</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                4
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Client satisfaction</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                95<span className="text-[#38bdf8]">%</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </Container>
  )
}

export default function About() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <Footer />
    </main>
  )
}
