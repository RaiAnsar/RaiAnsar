import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch — I respond within 24 hours.',
}

export default function Contact() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Container className="mt-16 mb-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <Heading as="h1">Let's work together.</Heading>
            <Lead className="mt-6">
              Have a project in mind? Drop me a message and I'll get back to you
              within 24 hours.
            </Lead>
            <dl className="mt-10 grid grid-cols-1 gap-6 text-sm/6">
              <div>
                <dt className="font-semibold text-gray-950">Email</dt>
                <dd className="mt-1 text-gray-600">
                  <Link
                    href="mailto:hello@raiansar.com"
                    className="text-gray-600 hover:text-gray-950"
                  >
                    hello@raiansar.com
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-950">Location</dt>
                <dd className="mt-1 text-gray-600">Islamabad, Pakistan</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-950">Availability</dt>
                <dd className="mt-1 text-gray-600">
                  Open for projects — typical response under 24h
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-950">Connect</dt>
                <dd className="mt-1 flex gap-4 text-gray-600">
                  <Link
                    href="https://github.com/RaiAnsar"
                    target="_blank"
                    className="hover:text-gray-950"
                  >
                    GitHub
                  </Link>
                  <Link
                    href="https://linkedin.com/in/raiansar"
                    target="_blank"
                    className="hover:text-gray-950"
                  >
                    LinkedIn
                  </Link>
                  <Link
                    href="https://x.com/iraiansar"
                    target="_blank"
                    className="hover:text-gray-950"
                  >
                    X
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <form
              action="/thank-you"
              className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-black/5"
            >
              <h2 className="text-lg font-semibold text-gray-950">
                Send a message
              </h2>
              <div className="mt-6 flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-950 outline-none focus:border-gray-400 focus:ring-0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-950 outline-none focus:border-gray-400 focus:ring-0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-950 outline-none focus:border-gray-400 focus:ring-0"
                  />
                </div>
                <Button type="submit" className="mt-2 w-full">
                  Send message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  )
}
