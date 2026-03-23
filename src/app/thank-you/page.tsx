import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Message sent',
  description: 'Thanks for reaching out.',
}

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Thanks for reaching out."
      intro="I'll review your message and get back to you within 24 hours. In the meantime, feel free to check out my projects or connect with me on social media."
    />
  )
}
