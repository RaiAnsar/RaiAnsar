import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'Real feedback from clients across Upwork and Fiverr.',
}

const upworkReviews = [
  {
    name: 'Dee, Owner at MediaTronixs',
    quote: 'One of the best freelances that have done work for me.',
  },
  {
    name: 'Michael, CEO of Click',
    quote:
      'Pleasure to work with. Excellent communication and excellent quality of work.',
  },
  {
    name: 'Mary via Upwork',
    quote:
      'Rai is fast and efficient with great communication. Will hire again.',
  },
  {
    name: 'Joy Mallard, CEO at digitalonlineservices.co.uk',
    quote:
      "Thank you so much. Once again you have been really helpful in the tasks I need completing. Not only have you done them quickly for me but also you have taken your time in ensuring I understand everything that has been done, you have answered all my questions I had without making me feel silly and also recommend some great things for the future.",
  },
  {
    name: 'Yolanda Soto via Upwork',
    quote: 'Great experience and very professional!',
  },
  {
    name: 'Joy Mallard via Upwork',
    quote:
      'As always Rai has gone above and beyond in this task. Delivering on time to a high standard',
  },
  {
    name: 'Joy, CEO at digitalonlineservices.co.uk',
    quote:
      "I have used Rai for a long time now. He helped me sort out an issue I couldn't do myself in a very quick time frame. Thank you",
  },
  {
    name: 'Wassiam Al Hadaad',
    quote: 'Expert, reliable, fast! Highly recommended',
  },
  {
    name: 'David from servantsofjesus.org',
    quote:
      'Fantastic to work with! I had an urgent server issue that needed fixing and Rai started immediately and continued to work until it was resolved. Highly recommend',
  },
  {
    name: 'Juliens via Upwork',
    quote:
      'Rai is a REAL PROFESSIONAL, he went above and beyond what it was requested. Highly recommended collaborator on Upwork.',
  },
  {
    name: 'Leif Mulican via Upwork',
    quote:
      "This dude is legit. Quick, knows what he's doing, communicates well. I already have him working on my next project.",
  },
]

const fiverrReviews = [
  {
    name: 'hadjei',
    quote:
      "Rai's work ethics is second to none. You will always get him to fix your website even when he is sick or going through serious relationship issues. I will always re-hire him. He is simply great. Numero uno.",
  },
  {
    name: 'autocarspeciali',
    quote:
      'Amazing, Delivered on time, knew exactly what I wanted, one of the best I have dealt with on Fiverr. 100 percent recommended!',
  },
  {
    name: 'eimearmccormack',
    quote:
      'Absolutely excellent as always. Great guy to work with and easy to contact.',
  },
  {
    name: 'jayc75',
    quote:
      'I always have a quick, efficient, friendly service. I recommend it!',
  },
  {
    name: 'alex_emmerson',
    quote:
      'FANTASTIC experience. I wish there were more sellers on Fiverr like this guy. Super polite and helpful, went above and beyond and I will definitely use him again!',
  },
  {
    name: 'chaunceyphil675',
    quote: 'fast, efficient, good communication. thank you',
  },
  {
    name: 'azingrid',
    quote: 'what an efficient seller. Very pleased with his services.',
  },
  {
    name: 'caroledc4cable',
    quote:
      'Great experience! Raiansar was very professional and work was done quickly and exactly as I requested. I would highly recommend.',
  },
  {
    name: 'eimearmccormack',
    quote:
      "Working with this Developer is a breeze. I've worked with him on continuous projects for months. I highly recommend. Top class at what he does!",
  },
  {
    name: 'clouis8',
    quote:
      "Raiansar is the most caring, patient, kind, genius, intelligent technician I've worked with on Fiverr. He always on top of the problem and delivers in a timely manner. He works days and nights with you. He makes sure you are satisfied. He is awesome.",
  },
  {
    name: 'eimearmccormack',
    quote:
      "I've worked with Raiansar on my recent projects. He is very attentive and excellent at what he does. He's also very responsive with messages. I trust him fully. Highly recommend.",
  },
  {
    name: 'andreakollova',
    quote:
      "I am extremely satisfied with raiansar's delivery! He is a true expert. Great communication, high quality work. If you're looking for an experienced web specialist, no need to look any further!",
  },
  {
    name: 'andreakollova',
    quote:
      'Thank you very much! I was greatly satisfied with the delivery. Highly recommend raiansar!',
  },
  {
    name: 'abfrempong',
    quote: 'Patient and diligent. I will definitely recommend.',
  },
  {
    name: 'giferrazborges',
    quote:
      'Amazing person! Could solve my problem very fast and with the most patience ever!',
  },
  {
    name: 'mundhiralkiyumi',
    quote:
      'I am happy with my order, He was very professional and knowledgeable',
  },
]

function ReviewCard({ name, quote }: { name: string; quote: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xs">
      <p className="text-sm/6 text-gray-600">&ldquo;{quote}&rdquo;</p>
      <p className="mt-4 text-sm font-semibold text-gray-950">{name}</p>
    </div>
  )
}

export default function Reviews() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Container className="mt-16 mb-32">
        <Heading as="h1">Real feedback from clients.</Heading>
        <Lead className="mt-6 max-w-3xl">
          I've been fortunate to work with clients worldwide across Upwork and
          Fiverr. Here's what they had to say.
        </Lead>

        <section className="mt-16">
          <Subheading>Upwork</Subheading>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upworkReviews.map((review, i) => (
              <ReviewCard key={i} {...review} />
            ))}
          </div>
        </section>

        <section className="mt-24">
          <Subheading>Fiverr</Subheading>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fiverrReviews.map((review, i) => (
              <ReviewCard key={i} {...review} />
            ))}
          </div>
        </section>
      </Container>
      <Footer />
    </main>
  )
}
