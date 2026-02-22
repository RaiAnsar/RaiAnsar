'use client';

import { useInView } from '@/hooks/useInView';
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
  const [footerRef, isInView] = useInView<HTMLElement>({ threshold: 0.3, once: true });
  const currentYear = new Date().getFullYear();

  const anim = (delay = 0, y = 30): React.CSSProperties => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'none' : `translateY(${y}px)`,
    transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
  });

  return (
    <footer ref={footerRef} className="relative py-10 bg-[#030712] border-t border-white/[0.06]" role="contentinfo" aria-label="Footer">
      <div className="container relative z-10">
        {/* Main footer — single compact row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8" style={anim(0)}>
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Magnetic strength={0.1}>
              <a href="#home" className="inline-block">
                <span className="text-xl font-bold tracking-tight text-white">
                  Rai<span className="text-[#38bdf8]">.</span>
                </span>
              </a>
            </Magnetic>
            <span className="hidden md:inline text-[#374151]">|</span>
            <span className="hidden md:inline text-sm text-[#374151]">Full-Stack Developer & DevOps Expert</span>
          </div>

          {/* Navigation links — horizontal */}
          <nav className="flex flex-wrap items-center gap-5" style={anim(0.1)} aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#6b7280] hover:text-[#38bdf8] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social + status */}
          <div className="flex items-center gap-3" style={anim(0.2)}>
            {socialLinks.map((link) => (
              <Magnetic key={link.name} strength={0.3}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${link.name} profile`}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#111827] border border-white/[0.06] text-[#6b7280] hover:text-white hover:border-[#38bdf8]/30 transition-all duration-300"
                >
                  {link.icon}
                </a>
              </Magnetic>
            ))}
            <div className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38bdf8]" />
              </span>
              <span className="text-xs font-medium text-[#38bdf8]">Available</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.06]" style={anim(0.3)}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#374151]">
              &copy; {currentYear} Rai Ansar. All rights reserved.
            </p>
            <a
              href="mailto:hello@raiansar.com"
              className="text-xs text-[#374151] hover:text-[#38bdf8] transition-colors"
            >
              hello@raiansar.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
