export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  [key: string]: FAQItem[];
}

export const faqData: FAQData = {
  wordpress: [
    {
      question: "What WordPress services do you offer?",
      answer: "I offer a comprehensive range of WordPress services including custom theme development, plugin development, website optimization, security hardening, malware removal, WooCommerce development, and general troubleshooting. Whether you need a new website built from scratch or help fixing and optimizing your existing WordPress site, I can help."
    },
    {
      question: "How long does it take to build a WordPress website?",
      answer: "The timeline for building a WordPress website depends on the complexity of the project. A basic WordPress website can be completed in 1-2 weeks, while more complex sites with custom functionality may take 4-8 weeks. I'll provide you with a detailed timeline during our initial consultation based on your specific requirements."
    },
    {
      question: "Can you fix issues with my existing WordPress site?",
      answer: "Yes, fixing WordPress issues is one of my specialties. Whether you're experiencing plugin conflicts, performance problems, security vulnerabilities, or any other WordPress-related issues, I can diagnose and resolve them. I'll first perform a thorough site analysis to identify the root causes before implementing appropriate solutions."
    },
    {
      question: "Do you offer WordPress maintenance services?",
      answer: "Yes, I offer comprehensive WordPress maintenance services to keep your site secure, updated, and performing optimally. My maintenance packages typically include regular updates (WordPress core, themes, and plugins), security monitoring, malware scanning, performance optimization, database cleanup, and emergency support. I can customize a maintenance plan based on your specific needs."
    }
  ],
  woocommerce: [
    {
      question: "Can you set up a WooCommerce store for my business?",
      answer: "Absolutely! I specialize in creating custom WooCommerce stores that are tailored to your specific business needs. I can help with everything from initial setup and configuration to complex customizations including product display, checkout process, payment gateways, shipping options, and more. I ensure your store is not only visually appealing but also optimized for conversions."
    },
    {
      question: "How do you optimize WooCommerce stores for performance?",
      answer: "WooCommerce optimization is crucial for both user experience and conversions. My approach includes database optimization, image optimization, implementing proper caching solutions, minifying CSS/JS files, optimizing product queries, reducing server response times, and configuring CDN integration. For high-traffic stores, I also implement advanced solutions like object caching and server-level optimizations."
    },
    {
      question: "Can you integrate payment gateways with my WooCommerce store?",
      answer: "Yes, I can integrate virtually any payment gateway with your WooCommerce store. I have experience with popular payment processors like PayPal, Stripe, Square, Authorize.net, Amazon Pay, and many others. I ensure that the checkout process is secure, seamless, and optimized for conversions. I can also set up multiple payment options to give your customers flexibility in how they pay."
    },
    {
      question: "Do you develop custom WooCommerce extensions?",
      answer: "Yes, I develop custom WooCommerce extensions and plugins to add specific functionality to your online store. Whether you need custom product types, specialized checkout processes, unique shipping calculators, or integration with external systems and APIs, I can create tailored solutions that meet your exact business requirements while maintaining compatibility with the WooCommerce core."
    }
  ],
  server: [
    {
      question: "What server management services do you provide?",
      answer: "I offer comprehensive server management services including server setup and configuration, performance optimization, security hardening, backup solutions, server monitoring, troubleshooting, and migration services. I specialize in managing Linux servers, particularly those running cPanel, WHM, and WHMCS. My goal is to ensure your server environment is secure, stable, and optimized for your specific workload."
    },
    {
      question: "Can you migrate my website to a new server?",
      answer: "Yes, I specialize in seamless server migrations with zero or minimal downtime. My migration process includes comprehensive planning, full data backup, thorough testing in a staging environment, and careful execution during low-traffic periods. I handle all aspects including files, databases, email accounts, DNS configuration, and post-migration verification to ensure everything works correctly on the new server."
    },
    {
      question: "How do you secure servers against potential threats?",
      answer: "My server security approach is multi-layered and includes implementing a robust firewall (like CSF), intrusion detection systems, regular security updates, secure SSH configuration, brute force protection, malware scanning, and file integrity monitoring. I also implement proper user permissions, disable unnecessary services, secure PHP configurations, and provide detailed security reports with recommendations for ongoing protection."
    },
    {
      question: "Do you offer cPanel/WHM/WHMCS configuration services?",
      answer: "Yes, I provide expert configuration and optimization services for cPanel, WHM, and WHMCS. This includes initial setup, interface customization, user management, resource allocation, email configuration, backup setup, security hardening, and integration between these systems. I can also troubleshoot issues, upgrade systems, and implement best practices to ensure optimal performance and security."
    }
  ],
  support: [
    {
      question: "What are your service rates?",
      answer: "My service rates vary depending on project complexity, scope, and urgency. I offer both hourly rates and fixed project quotes. For ongoing support, I provide monthly retainer packages at discounted rates. I'll provide a detailed quote after understanding your specific requirements during an initial consultation. Rest assured that my rates are competitive for the level of expertise and quality of service I provide."
    },
    {
      question: "How quickly do you respond to support requests?",
      answer: "I prioritize responsive communication and typically respond to initial inquiries within 2-4 hours during business days. For existing clients with urgent issues, my response time is usually under 1 hour. For emergency situations (like site down or security breaches), I provide priority support with immediate attention. My goal is to not only respond quickly but to begin working on solutions as promptly as possible."
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer: "Yes, I provide ongoing support for all completed projects. I offer various support options including pay-as-you-go hourly support, monthly support retainers with guaranteed response times, and comprehensive maintenance packages. I believe in building long-term relationships with clients and ensuring your digital assets continue to perform optimally long after the initial project is complete."
    },
    {
      question: "What information do you need to provide a quote?",
      answer: "To provide an accurate quote, I typically need information about: 1) The scope and specific requirements of your project, 2) Current state of your website/server (if applicable), 3) Your timeline expectations, 4) Any special technical requirements or constraints, 5) Access to review your current setup (if applicable). The more details you can provide, the more accurate my quote will be. I'm happy to sign an NDA before you share sensitive information."
    }
  ]
};

export const faqCategories = [
  { key: 'wordpress', label: 'WordPress' },
  { key: 'woocommerce', label: 'WooCommerce' },
  { key: 'server', label: 'Server' },
  { key: 'support', label: 'Support & Pricing' }
];
