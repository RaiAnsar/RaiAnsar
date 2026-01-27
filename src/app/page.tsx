'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Cursor } from '@/components/ui/Cursor';
import { ParticleField } from '@/components/ui/ParticleField';

// Lazy load below-fold components for better LCP
const About = dynamic(() => import('@/components/sections/About').then(mod => ({ default: mod.About })), {
  loading: () => <div className="min-h-[600px]" />,
});

const Process = dynamic(() => import('@/components/sections/Process').then(mod => ({ default: mod.Process })), {
  loading: () => <div className="min-h-[400px]" />,
});

const Services = dynamic(() => import('@/components/sections/Services').then(mod => ({ default: mod.Services })), {
  loading: () => <div className="min-h-[500px]" />,
});

const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="min-h-[600px]" />,
});

const Footer = dynamic(() => import('@/components/sections/Footer').then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="min-h-[200px]" />,
});

export default function Home() {
  return (
    <>
      {/* Custom cursor */}
      <Cursor />

      {/* Particle field background */}
      <ParticleField />

      {/* Noise overlay for texture */}
      <div className="noise" />

      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
