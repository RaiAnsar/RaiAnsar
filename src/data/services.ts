export interface Service {
  icon: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: 'wordpress-dev',
    title: 'WordPress Development',
    description: 'Custom WordPress development including themes, plugins, and complex functionality. Expertise in plugin rebuilding/updating, Elementor, WooCommerce, and custom post types.'
  },
  {
    icon: 'wordpress-maintenance',
    title: 'WordPress Maintenance',
    description: 'Comprehensive WordPress maintenance including debugging, security hardening, malware removal, speed optimization, and regular updates to ensure your site runs smoothly.'
  },
  {
    icon: 'server',
    title: 'Server Specialist',
    description: 'Expert server management including VPS deployment, cPanel/WHM/WHMCS configuration, performance optimization, and security hardening for maximum reliability.'
  },
  {
    icon: 'ecommerce',
    title: 'E-Commerce Solutions',
    description: 'Complete WooCommerce development including custom product configurations, payment gateway integration, shipping setup, and store performance optimization.'
  },
  {
    icon: 'custom-dev',
    title: 'Custom Development',
    description: 'Specialized PHP development, React + Vite applications, Xenforo customization, custom API development, database optimization, and third-party integrations for unique requirements.'
  },
  {
    icon: 'security',
    title: 'Web Security',
    description: 'Comprehensive website security services including security audits, malware removal, firewall configuration, SSL implementation, and ongoing security monitoring.'
  }
];

export const serviceOptions: Record<string, string[]> = {
  'WordPress Development': [
    'Custom Theme Development',
    'Plugin Development',
    'Website Migration',
    'Performance Optimization',
    'Other WordPress Development'
  ],
  'WooCommerce': [
    'Store Setup',
    'Payment Gateway Integration',
    'Custom Functionality',
    'Performance Optimization',
    'Other WooCommerce'
  ],
  'Technical WordPress': [
    'Bug Fixes & Troubleshooting',
    'Security & Malware Removal',
    'Server Issues',
    'Database Optimization',
    'Other Technical Issues'
  ],
  'Server Management': [
    'VPS Setup & Configuration',
    'cPanel/WHM Management',
    'Server Migration',
    'Performance & Security',
    'Other Server Management'
  ],
  'Consulting': [
    'Technical Consultation',
    'Performance Audit',
    'Security Audit',
    'Architecture Planning',
    'Other Consulting'
  ]
};
