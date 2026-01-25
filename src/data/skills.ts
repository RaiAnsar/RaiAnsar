export interface Skill {
  name: string;
  percentage: number;
}

export const skills: Skill[] = [
  { name: 'WordPress Development', percentage: 95 },
  { name: 'WordPress Plugin Rebuilding/Updating', percentage: 92 },
  { name: 'Server Management', percentage: 90 },
  { name: 'PHP Development', percentage: 85 },
  { name: 'React + Vite', percentage: 88 },
  { name: 'WooCommerce', percentage: 90 },
  { name: 'Security & Optimization', percentage: 95 },
  { name: 'cPanel/WHM/WHMCS', percentage: 95 }
];

export const skillsDescription = {
  title: 'Technical expertise developed over 8+ years of solving complex challenges',
  paragraphs: [
    'With a focus on WordPress, server management, and custom development, I\'ve cultivated a diverse set of technical skills that allow me to tackle even the most challenging projects. My expertise spans from front-end optimization to back-end server configuration, allowing me to provide comprehensive solutions for all your web needs.',
    'I continuously update my skills to stay current with the latest technologies and best practices in web development, security, and performance optimization. This commitment ensures that my clients receive cutting-edge solutions that are both reliable and future-proof.'
  ]
};
