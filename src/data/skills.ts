export interface Skill {
  name: string;
  percentage: number;
}

export const skills: Skill[] = [
  { name: 'React / Next.js', percentage: 95 },
  { name: 'TypeScript', percentage: 92 },
  { name: 'WordPress Development', percentage: 95 },
  { name: 'Node.js / Express', percentage: 88 },
  { name: 'WooCommerce / E-Commerce', percentage: 90 },
  { name: 'DevOps / CI/CD', percentage: 85 },
  { name: 'PostgreSQL / Redis', percentage: 85 },
  { name: 'Docker / Cloud (AWS)', percentage: 82 },
];

export const skillsDescription = {
  title: 'Technical expertise developed over 10+ years of solving complex challenges',
  paragraphs: [
    'I work across the full stack — from pixel-perfect React frontends to scalable Node.js APIs and reliable cloud infrastructure. WordPress and WooCommerce remain core strengths, alongside modern frameworks like Next.js and TypeScript.',
    'I prioritize tools that ship reliable products: strong typing, automated testing, containerized deployments, and clean architecture that other developers can actually maintain.'
  ]
};
