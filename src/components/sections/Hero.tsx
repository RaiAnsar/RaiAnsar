'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { TextScramble } from '@/components/ui/TextScramble';
import { Magnetic } from '@/components/ui/Magnetic';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);
  const photoY = useTransform(scrollYProgress, [0, 0.5], [0, 40]);

  const smoothContentY = useSpring(contentY, { stiffness: 100, damping: 30 });
  const smoothContentOpacity = useSpring(contentOpacity, { stiffness: 100, damping: 30 });
  const smoothPhotoY = useSpring(photoY, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
      aria-label="Hero section"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,107,53,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.2) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,53,0.05), transparent 70%)',
        }}
      />

      {/* Main content */}
      <motion.div
        className="container relative z-10"
        style={{ y: smoothContentY, opacity: smoothContentOpacity, scale: contentScale }}
      >
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-0 items-center py-24 lg:py-0">
          {/* Left: Content */}
          <div className="max-w-2xl">
            {/* Role line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="h-px w-8 bg-[#ff6b35]" />
              <span className="text-[#ff6b35] text-xs font-semibold tracking-[0.2em] uppercase">
                Full-Stack Developer &amp; DevOps
              </span>
            </motion.div>

            {/* Name — the hero moment */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-black tracking-[-0.04em] leading-[0.85] mb-8"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
            >
              <span className="text-white block">
                <TextScramble text="Rai" delay={0} />
              </span>
              <span className="gradient-text block">
                <TextScramble text="Ansar." delay={200} />
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-[#707070] leading-relaxed max-w-lg mb-10"
            >
              I build fast websites, fix broken servers, and turn technical debt
              into clean, scalable systems.{' '}
              <span className="text-[#a0a0a0]">
                6+ years of shipping code that works.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-16"
              role="navigation"
              aria-label="Hero actions"
            >
              <Magnetic strength={0.3}>
                <motion.a
                  href="#contact"
                  className="btn-primary inline-flex"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span>Start a Project</span>
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <motion.a
                  href="https://wa.me/923337626562"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="opacity-80"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp</span>
                </motion.a>
              </Magnetic>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-12 border-t border-white/[0.06] pt-8"
              role="list"
              aria-label="Statistics"
            >
              {[
                { value: '6+', label: 'Years' },
                { value: '300+', label: 'Projects' },
                { value: '<24h', label: 'Response' },
              ].map((stat, i) => (
                <Magnetic key={stat.label} strength={0.15}>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                    className="cursor-default group"
                    role="listitem"
                  >
                    <div
                      className="text-3xl md:text-4xl font-black text-white group-hover:text-[#ff6b35] transition-colors duration-300"
                      aria-label={`${stat.value} ${stat.label}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#505050] uppercase tracking-widest mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                </Magnetic>
              ))}
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            className="relative hidden lg:flex justify-center"
            style={{ y: smoothPhotoY }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Orange glow behind photo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#ff6b35]/[0.08] rounded-full blur-[120px]" />

            {/* Photo frame */}
            <div className="relative w-[340px] h-[440px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 rounded-2xl border border-white/[0.08] z-10 pointer-events-none" />

              <Image
                src="/images/hero-rai.jpg"
                alt="Rai Ansar"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 340px"
              />

              {/* Bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-50" />

              {/* Corner accents */}
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#ff6b35]/30 z-10" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#ff6b35]/30 z-10" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-hidden="true"
      >
        <span className="text-xs font-medium tracking-widest uppercase text-[#404040]">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[#ff6b35] to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
