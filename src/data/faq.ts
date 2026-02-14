export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  [key: string]: FAQItem[];
}

export const faqData: FAQData = {
  frontend: [
    {
      question: "What frontend technologies do you work with?",
      answer: "I primarily work with React and Next.js using TypeScript. For styling I use Tailwind CSS, and for animations, Framer Motion. I also build design systems and component libraries that keep codebases consistent and maintainable."
    },
    {
      question: "Do you build landing pages or full web applications?",
      answer: "Both. I build high-converting landing pages optimized for performance and SEO, as well as full-featured web applications with complex state management, authentication, and API integrations. Every project gets the same attention to UI polish and code quality."
    },
    {
      question: "How do you handle responsive design and accessibility?",
      answer: "Responsive design is built in from the start, not bolted on later. I follow mobile-first principles and test across real devices. For accessibility, I follow WCAG guidelines — proper semantic HTML, keyboard navigation, screen reader support, and sufficient color contrast."
    },
    {
      question: "Can you work with an existing design or do I need one?",
      answer: "I can work with Figma files, rough wireframes, or even just a written brief. If you have an existing design system, I'll follow it precisely. If you need design direction, I can handle the UI/UX as well based on your goals and brand."
    }
  ],
  wordpress: [
    {
      question: "What WordPress services do you offer?",
      answer: "Custom theme development, plugin development, WooCommerce stores, performance optimization, security hardening, malware removal, and migrations. Whether it's a new build or fixing an existing site, I handle the full lifecycle."
    },
    {
      question: "Can you fix issues with my existing WordPress site?",
      answer: "Yes — debugging WordPress is one of my strongest skills. Plugin conflicts, white screens, slow load times, security breaches, broken updates — I diagnose the root cause first, then fix it properly rather than applying band-aid solutions."
    },
    {
      question: "Do you build custom WordPress plugins?",
      answer: "Yes. When off-the-shelf plugins don't fit your needs or add unnecessary bloat, I build custom plugins tailored to your exact requirements. Clean code, proper WordPress coding standards, and built to work reliably with future updates."
    },
    {
      question: "How do you handle WordPress performance?",
      answer: "I optimize at every layer: database queries, caching (object cache + page cache), image optimization, lazy loading, code minification, and server-level tuning. Most sites I optimize see 2-4x speed improvements and significantly better Core Web Vitals."
    }
  ],
  ecommerce: [
    {
      question: "What e-commerce platforms do you work with?",
      answer: "WooCommerce is my primary platform, but I also build custom e-commerce solutions with Next.js and Stripe. I handle everything from product catalog setup to checkout optimization, payment integration, shipping configuration, and tax compliance."
    },
    {
      question: "Can you optimize my store's conversion rate?",
      answer: "Yes. I focus on reducing checkout friction, improving page speed, streamlining the purchase flow, and ensuring mobile checkout works flawlessly. I also set up proper analytics tracking so you can measure what's actually driving sales."
    },
    {
      question: "Do you integrate payment gateways?",
      answer: "I've integrated Stripe, PayPal, Square, and other major payment processors. I ensure PCI compliance, handle webhook configuration, and set up proper error handling so failed payments are caught and communicated clearly to customers."
    },
    {
      question: "Can you migrate my store to a new platform?",
      answer: "Yes. I handle full store migrations — products, customers, orders, and SEO redirects. I plan migrations carefully to minimize downtime and ensure nothing gets lost. Post-migration testing covers every critical flow before going live."
    }
  ],
  devops: [
    {
      question: "What DevOps services do you provide?",
      answer: "Server setup and management, Docker containerization, CI/CD pipelines, cloud deployments (AWS, DigitalOcean, Hostinger), SSL configuration, automated backups, monitoring, and security hardening. I make sure your infrastructure is reliable and easy to maintain."
    },
    {
      question: "Can you set up CI/CD for my project?",
      answer: "Yes. I set up automated pipelines using GitHub Actions or similar tools — automated testing, linting, building, and deployment on every push. This catches bugs early and makes deployments predictable instead of stressful."
    },
    {
      question: "Do you manage servers?",
      answer: "I manage Linux servers, including configuration, security updates, performance tuning, and monitoring. I work with cPanel/WHM environments as well as bare-metal setups. Proactive monitoring means issues get caught before they affect your users."
    },
    {
      question: "How do you handle security?",
      answer: "Multi-layered approach: firewall configuration, SSH hardening, regular updates, intrusion detection, malware scanning, proper file permissions, and automated backups. I also conduct security audits on existing setups to identify and close vulnerabilities."
    }
  ],
  general: [
    {
      question: "What are your rates?",
      answer: "Rates depend on project scope and complexity. I offer both fixed-price quotes for well-defined projects and hourly rates for ongoing work. After understanding your requirements, I'll provide a clear quote with no hidden costs."
    },
    {
      question: "How quickly can you start a project?",
      answer: "Typically within a few days for smaller projects. For larger builds, I'll need a brief discovery phase first to scope things properly. I respond to all inquiries within 24 hours."
    },
    {
      question: "How do you communicate during a project?",
      answer: "Clear and frequent communication. I provide regular progress updates, am available for calls when needed, and keep you informed about any decisions or blockers. No disappearing acts — you'll always know where things stand."
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer: "Yes. I offer maintenance packages that cover updates, security monitoring, performance checks, and priority support. Most clients continue working with me long-term because I know their systems inside out."
    }
  ]
};

export const faqCategories = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'wordpress', label: 'WordPress' },
  { key: 'ecommerce', label: 'E-Commerce' },
  { key: 'devops', label: 'DevOps' },
  { key: 'general', label: 'General' }
];
