export interface Testimonial {
  name: string;
  quote: string;
  platform: 'Upwork' | 'Fiverr';
}

const upworkData = [
  { name: "Dee Owner at MediaTronixs", quote: "One of the best freelances that have done work for me." },
  { name: "Michael CEO of Click", quote: "Pleasure to work with. Excellent communication and excellent quality of work." },
  { name: "Mary Via Upwork", quote: "Rai is fast and efficient with great communication. Will hire again." },
  { name: "Joy Mallard CEO at digitalonlineservices.co.uk", quote: "Thank you so much. Once again you have been really helpful in the tasks I need completing. Not only have you done them quickly for me but also you have taken your time in ensuring I understand everything that has been done, you have answered all my questions I had without making me feel silly and also recommend some great things for the future. I will keep using your services for anything to do with websites/hosting in the future." },
  { name: "Yolanda Soto via Upwork", quote: "Great experience and very professional!" },
  { name: "Joy Mallard via Upwork", quote: "As always Rai has gone above and beyond in this task. Delivering on time to a high standard" },
  { name: "Joy CEO at digitalonlineservices.co.uk", quote: "I have used Rai for a long time now. He helped me sort out an issue I couldn't do myself in a very quick time frame. Thank you" },
  { name: "Wassiam Al Hadaad", quote: "Expert, reliable, fast! Highly recommended" },
  { name: "David from servantsofjesus.org", quote: "Fantastic to work with! I had an urgent server issue that needed fixing and Rai started immediately and continued to work until it was resolved. Highly recommend" },
  { name: "Juliens via Upwork", quote: "Rai is a REAL PROFESSIONAL, he went above and beyond what it was requested. Highly recommended collaborator on Upwork." },
  { name: "Leif Mulican via Upwork", quote: "This dude is legit. Quick, knows what he's doing, communicates well. I already have him working on my next project." }
];

const fiverrData = [
  { name: "hadjei", quote: "Rai's work ethics is second to none.You will always get him to fix your website even when he is sick or going through serious relationship issues. I will always re-hire him. He is simply great. Numero uno." },
  { name: "autocarspeciali", quote: "Amazing , Delivered on time, knew exacly what i wanted, one of the best i have dealth with on five 100 percent recommeded !!" },
  { name: "eimearmccormack", quote: "Absolutely excellent as always. Great guy to work with and easy to contact." },
  { name: "jayc75", quote: "I always have a quick, efficient, friendly service. I recommend it!" },
  { name: "alex_emmerson", quote: "FANTASTIC experience. I wish there were more sellers on Fiver like this guy. Super polite and helpful, went above and beyond and I will definitely use him again!" },
  { name: "chaunceyphil675", quote: "fast, efficient, good communication. thank you" },
  { name: "azingrid", quote: "what an efficient seller. Very pleased with his services." },
  { name: "caroledc4cable", quote: "Great experience! Raiansar was very professional and work was done quickly and exactly as I requested. I would highly recommend." },
  { name: "eimearmccormack", quote: "Working with this Developer is a breeze. I've worked with him on continuous projects for months. I highly recommend. Top class at what he does!" },
  { name: "clouis8", quote: "Raiansar is the most caring , patience, kind, genius, intelligent technician I work here in Fiverr. He always on top of the problem & delivered timely manners. He works days and nights with you . He makes sure u are satisfied. Take time to teach u. He is awesome. From now on, This is my personal to go person. Thank u for outstanding services." },
  { name: "eimearmccormack", quote: "I've worked with Raiansar on my recent projects. He is very attentive and excellent at what he does. He's also very responsive with messages. I trust him fully and it's hard to find someone like that on Fiverr. Highly recommend." },
  { name: "andreakollova", quote: "I am extremely satisfied with raiansar's delivery!!! He is a true expert. Great communication, high quality work. If you're looking for an experienced web specialist, no need to look any further! Highly recommend and will use his service again in the future." },
  { name: "andreakollova", quote: "Thank you very much ! I was greatly satisfied with the delivery. Highly recommend raiansar!!!" },
  { name: "abfrempong", quote: "Patient and diligent. I will definitely recommend." },
  { name: "giferrazborges", quote: "Amazing person! Could solve my problem very fast and with the most patience ever!" },
  { name: "mundhiralkiyumi", quote: "I am happy with my order, He was very professional and knowledgeable" }
];

export const allTestimonials: Testimonial[] = [
  ...upworkData.map(item => ({ ...item, platform: 'Upwork' as const })),
  ...fiverrData.map(item => ({ ...item, platform: 'Fiverr' as const }))
];

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
