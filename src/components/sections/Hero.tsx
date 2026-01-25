'use client';

import { useState, useEffect } from 'react';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container">
        <div
          className={`transition-all duration-1000 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          {/* Eyebrow */}
          <p
            className="hero-eyebrow"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
              transitionDelay: '0.3s',
            }}
          >
            Senior Full-Stack Developer
          </p>

          {/* Main Title */}
          <h1
            className="hero-title"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
              transitionDelay: '0.5s',
            }}
          >
            I build things
            <br />
            for the <span className="text-accent">web</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-subtitle"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
              transitionDelay: '0.7s',
            }}
          >
            Six years crafting digital experiences. From custom applications
            to cloud infrastructure, I turn complex problems into elegant solutions.
          </p>

          {/* CTA */}
          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
              transitionDelay: '0.9s',
            }}
          >
            <a href="#contact" className="btn btn-primary">
              Start a Project
            </a>
            <a href="#services" className="btn btn-secondary">
              View Services
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="scroll-indicator hidden md:flex"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1s ease',
            transitionDelay: '1.5s',
          }}
        >
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
