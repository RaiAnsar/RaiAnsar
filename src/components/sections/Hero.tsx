'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/RaiAnsar', icon: '/images/svg/github.svg' },
  { name: 'X', href: 'https://x.com/raiansar', icon: '/images/svg/x.svg' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/raiansar/', icon: '/images/svg/linkedin.svg' },
  { name: 'Upwork', href: 'https://www.upwork.com/freelancers/iraiansar', icon: '/images/svg/upwork.svg' },
  { name: 'Fiverr', href: 'https://www.fiverr.com/raiansar', icon: '/images/svg/fiverr.svg' }
];

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center max-w-4xl mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              Rai Ansar
            </span>
            {' '}- Freelance WordPress Developer & Server Specialist
          </h1>

          <p
            className={`text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            I am a WordPress, React & Server Specialist. I specialize in solving complex technical challenges.
            <br className="hidden md:block" />
            Expert in debugging, security & optimization with 6+ years of experience.
          </p>

          <div
            className={`flex items-center justify-center gap-4 flex-wrap transition-all duration-700 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-xl bg-surface flex items-center justify-center shadow-surface hover:bg-accent/10 hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
                aria-label={`${link.name} Profile`}
              >
                <Image
                  src={link.icon}
                  alt={link.name}
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
