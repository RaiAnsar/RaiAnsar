import dynamic from 'next/dynamic';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { DeferredEffects } from '@/components/ui/DeferredEffects';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { BackToTop } from '@/components/ui/BackToTop';
import { SkipLink } from '@/components/ui/SkipLink';
import { LiquidBlob } from '@/components/ui/LiquidBlob';
import { CustomCursor } from '@/components/ui/CustomCursor';

// Lazy load below-fold components for better LCP
const About = dynamic(() => import('@/components/sections/About').then(mod => ({ default: mod.About })), {
  loading: () => <div className="min-h-[600px]" />,
});

const Process = dynamic(() => import('@/components/sections/Process').then(mod => ({ default: mod.Process })), {
  loading: () => <div className="min-h-[400px]" />,
});

const CodeMarquee = dynamic(() => import('@/components/sections/CodeMarquee').then(mod => ({ default: mod.CodeMarquee })), {
  loading: () => <div className="min-h-[300px]" />,
});

const Services = dynamic(() => import('@/components/sections/Services').then(mod => ({ default: mod.Services })), {
  loading: () => <div className="min-h-[500px]" />,
});

const Posts = dynamic(() => import('@/components/sections/Posts').then(mod => ({ default: mod.Posts })), {
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
      {/* Skip to main content link for accessibility */}
      <SkipLink />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Liquid blob backgrounds */}
      <LiquidBlob />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Back to top button */}
      <BackToTop />

      {/* Defer non-essential effects until the browser is idle */}
      <DeferredEffects />

      {/* Noise overlay for texture */}
      <div className="noise" aria-hidden="true" />

      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Process />
        <CodeMarquee />
        <Services />
        <Posts />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
