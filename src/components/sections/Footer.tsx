'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Magnetic } from '@/components/ui/Magnetic';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/RaiAnsar',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/raiansar/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/raiansar',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Upwork',
    href: 'https://www.upwork.com/freelancers/iraiansar',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
      </svg>
    ),
  },
];

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });
  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="relative py-16 bg-[#0a0a0a] border-t border-white/[0.06]" role="contentinfo" aria-label="Footer">
      <div className="container relative z-10">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Magnetic strength={0.1}>
              <a href="#home" className="inline-block mb-6">
                <span className="text-2xl font-bold tracking-tight text-white">
                  Rai<span className="text-[#ff6b35]">.</span>
                </span>
              </a>
            </Magnetic>
            <p className="text-[#505050] leading-relaxed max-w-md mb-6">
              Full-stack developer specializing in high-performance web apps, WordPress solutions,
              and scalable infrastructure. 10+ years turning ideas into production-ready products.
            </p>
            <Magnetic strength={0.2}>
              <motion.a
                href="mailto:hello@raiansar.com"
                className="inline-flex items-center gap-2 text-[#ff6b35] hover:text-[#ff8555] transition-colors"
                whileHover={{ x: 5 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                <span className="font-medium">hello@raiansar.com</span>
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* Navigation column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#404040] mb-6">
              Navigation
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <Magnetic strength={0.15}>
                    <a
                      href={link.href}
                      className="text-[#707070] hover:text-[#ff6b35] transition-colors inline-flex items-center gap-2 group cursor-pointer"
                    >
                      <span className="w-0 h-px bg-[#ff6b35] group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </a>
                  </Magnetic>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#404040] mb-6">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Magnetic strength={0.3}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${link.name} profile`}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#161616] border border-white/[0.06] text-[#707070] hover:text-white hover:border-[#ff6b35]/30 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      {link.icon}
                    </a>
                  </Magnetic>
                </motion.div>
              ))}
            </div>

            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b35] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b35]" />
              </span>
              <span className="text-xs font-medium text-[#ff6b35]">
                Available for hire
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-white/[0.06]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#404040]">
              &copy; {currentYear} Rai Ansar. All rights reserved.
            </p>
            <p className="text-sm text-[#404040]">
              Crafted with precision & passion
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
