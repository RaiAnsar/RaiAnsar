import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ReviewSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Review({
  name,
  quote,
}: {
  name: string
  quote: string
}) {
  return (
    <Card as="article">
      <Card.Title as="h3">{name}</Card.Title>
      <Card.Description>{quote}</Card.Description>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'Real feedback from clients across Upwork and Fiverr.',
}

export default function Reviews() {
  return (
    <SimpleLayout
      title="Real feedback from clients who've worked with me."
      intro="I've been fortunate to work with clients worldwide across Upwork and Fiverr. Here's what they had to say."
    >
      <div className="space-y-20">
        <ReviewSection title="Upwork">
          <Review
            name="Dee, Owner at MediaTronixs"
            quote="One of the best freelances that have done work for me."
          />
          <Review
            name="Michael, CEO of Click"
            quote="Pleasure to work with. Excellent communication and excellent quality of work."
          />
          <Review
            name="Mary via Upwork"
            quote="Rai is fast and efficient with great communication. Will hire again."
          />
          <Review
            name="Joy Mallard, CEO at digitalonlineservices.co.uk"
            quote="Thank you so much. Once again you have been really helpful in the tasks I need completing. Not only have you done them quickly for me but also you have taken your time in ensuring I understand everything that has been done, you have answered all my questions I had without making me feel silly and also recommend some great things for the future. I will keep using your services for anything to do with websites/hosting in the future."
          />
          <Review
            name="Yolanda Soto via Upwork"
            quote="Great experience and very professional!"
          />
          <Review
            name="Joy Mallard via Upwork"
            quote="As always Rai has gone above and beyond in this task. Delivering on time to a high standard"
          />
          <Review
            name="Joy, CEO at digitalonlineservices.co.uk"
            quote="I have used Rai for a long time now. He helped me sort out an issue I couldn't do myself in a very quick time frame. Thank you"
          />
          <Review
            name="Wassiam Al Hadaad"
            quote="Expert, reliable, fast! Highly recommended"
          />
          <Review
            name="David from servantsofjesus.org"
            quote="Fantastic to work with! I had an urgent server issue that needed fixing and Rai started immediately and continued to work until it was resolved. Highly recommend"
          />
          <Review
            name="Juliens via Upwork"
            quote="Rai is a REAL PROFESSIONAL, he went above and beyond what it was requested. Highly recommended collaborator on Upwork."
          />
          <Review
            name="Leif Mulican via Upwork"
            quote="This dude is legit. Quick, knows what he's doing, communicates well. I already have him working on my next project."
          />
        </ReviewSection>
        <ReviewSection title="Fiverr">
          <Review
            name="hadjei"
            quote="Rai's work ethics is second to none.You will always get him to fix your website even when he is sick or going through serious relationship issues. I will always re-hire him. He is simply great. Numero uno."
          />
          <Review
            name="autocarspeciali"
            quote="Amazing , Delivered on time, knew exacly what i wanted, one of the best i have dealth with on five 100 percent recommeded !!"
          />
          <Review
            name="eimearmccormack"
            quote="Absolutely excellent as always. Great guy to work with and easy to contact."
          />
          <Review
            name="jayc75"
            quote="I always have a quick, efficient, friendly service. I recommend it!"
          />
          <Review
            name="alex_emmerson"
            quote="FANTASTIC experience. I wish there were more sellers on Fiver like this guy. Super polite and helpful, went above and beyond and I will definitely use him again!"
          />
          <Review
            name="chaunceyphil675"
            quote="fast, efficient, good communication. thank you"
          />
          <Review
            name="azingrid"
            quote="what an efficient seller. Very pleased with his services."
          />
          <Review
            name="caroledc4cable"
            quote="Great experience! Raiansar was very professional and work was done quickly and exactly as I requested. I would highly recommend."
          />
          <Review
            name="eimearmccormack"
            quote="Working with this Developer is a breeze. I've worked with him on continuous projects for months. I highly recommend. Top class at what he does!"
          />
          <Review
            name="clouis8"
            quote="Raiansar is the most caring , patience, kind, genius, intelligent technician I work here in Fiverr. He always on top of the problem & delivered timely manners. He works days and nights with you . He makes sure u are satisfied. Take time to teach u. He is awesome. From now on, This is my personal to go person. Thank u for outstanding services."
          />
          <Review
            name="eimearmccormack"
            quote="I've worked with Raiansar on my recent projects. He is very attentive and excellent at what he does. He's also very responsive with messages. I trust him fully and it's hard to find someone like that on Fiverr. Highly recommend."
          />
          <Review
            name="andreakollova"
            quote="I am extremely satisfied with raiansar's delivery!!! He is a true expert. Great communication, high quality work. If you're looking for an experienced web specialist, no need to look any further! Highly recommend and will use his service again in the future."
          />
          <Review
            name="andreakollova"
            quote="Thank you very much ! I was greatly satisfied with the delivery. Highly recommend raiansar!!!"
          />
          <Review
            name="abfrempong"
            quote="Patient and diligent. I will definitely recommend."
          />
          <Review
            name="giferrazborges"
            quote="Amazing person! Could solve my problem very fast and with the most patience ever!"
          />
          <Review
            name="mundhiralkiyumi"
            quote="I am happy with my order, He was very professional and knowledgeable"
          />
        </ReviewSection>
      </div>
    </SimpleLayout>
  )
}
