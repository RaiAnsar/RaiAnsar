'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'Understanding Your Vision',
    description: 'We dive deep into your goals, target audience, and project requirements. This phase establishes the foundation for everything that follows.',
    details: ['Requirements gathering', 'Market research', 'Technical feasibility', 'Project scope definition'],
  },
  {
    number: '02',
    title: 'Strategy',
    subtitle: 'Planning the Path',
    description: 'Creating a detailed roadmap with clear milestones. Every decision is backed by data and aligned with your business objectives.',
    details: ['Architecture design', 'Technology selection', 'Timeline planning', 'Risk assessment'],
  },
  {
    number: '03',
    title: 'Creation',
    subtitle: 'Building Excellence',
    description: 'Where ideas transform into reality. Clean code, elegant design, and relentless attention to detail at every step.',
    details: ['Iterative development', 'Regular updates', 'Quality assurance', 'Performance optimization'],
  },
  {
    number: '04',
    title: 'Launch',
    subtitle: 'Going Live',
    description: 'Rigorous testing, seamless deployment, and ongoing support. Your project is launched with confidence and precision.',
    details: ['Final testing', 'Deployment', 'Performance monitoring', 'Ongoing support'],
  },
];

// Icons for each step
const icons = [
  <svg key="discovery" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M11 8v6M8 11h6" />
  </svg>,
  <svg key="strategy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>,
  <svg key="creation" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
  <svg key="launch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>,
];

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeStep, setActiveStep] = useState(0);

  // Main scroll progress for the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.2', 'end 0.8'],
  });

  // Smooth spring animation for the progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform progress to percentage for the line fill
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Update active step based on scroll
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const newStep = Math.min(Math.floor(latest * steps.length), steps.length - 1);
      setActiveStep(Math.max(0, newStep));
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Background parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden"
      id="process"
      style={{ background: '#030303' }}
    >
      {/* Animated ambient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute w-[1200px] h-[1200px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 240, 0.08) 0%, transparent 50%)',
            left: '50%',
            top: '20%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 240, 0.05) 0%, transparent 60%)',
            left: '10%',
            top: '30%',
          }}
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 240, 0.04) 0%, transparent 60%)',
            right: '15%',
            top: '60%',
          }}
          animate={{ y: [0, 40, 0], x: [0, -25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24 md:mb-32"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-[0.2em] uppercase rounded-full"
            style={{
              color: '#00fff0',
              background: 'rgba(0, 255, 240, 0.1)',
              border: '1px solid rgba(0, 255, 240, 0.2)',
            }}
          >
            How I Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            From vision to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00fff0 0%, #00d4c8 50%, #00fff0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              reality.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            A proven process refined over years of delivering exceptional digital products.
          </p>
        </motion.div>

        {/* Timeline with alternating layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* CENTER TIMELINE - Fat glowing cyan line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 md:w-1.5 hidden md:block">
            {/* Background track */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(255, 255, 255, 0.08)' }}
            />

            {/* Glowing progress fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full"
              style={{
                height: lineHeight,
                background: '#00fff0',
                boxShadow: `
                  0 0 20px rgba(0, 255, 240, 0.8),
                  0 0 40px rgba(0, 255, 240, 0.5),
                  0 0 60px rgba(0, 255, 240, 0.3),
                  0 0 80px rgba(0, 255, 240, 0.2)
                `,
              }}
            />

            {/* Traveling pulse at the end of the line */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
              style={{
                background: '#00fff0',
                boxShadow: `
                  0 0 20px #00fff0,
                  0 0 40px #00fff0,
                  0 0 60px rgba(0, 255, 240, 0.8)
                `,
                top: lineHeight,
              }}
            />
          </div>

          {/* Mobile timeline - Left side */}
          <div className="absolute left-4 top-0 bottom-0 w-1 md:hidden">
            <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full"
              style={{
                height: lineHeight,
                background: '#00fff0',
                boxShadow: '0 0 20px rgba(0, 255, 240, 0.8), 0 0 40px rgba(0, 255, 240, 0.5)',
              }}
            />
          </div>

          {/* Process steps - Alternating left/right */}
          <div className="relative space-y-20 md:space-y-32">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;
              const isLeft = index % 2 === 0; // Even indices on left, odd on right

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                  className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                    isLeft ? '' : 'md:text-right'
                  }`}
                >
                  {/* Content card */}
                  <motion.div
                    className={`relative ${isLeft ? 'md:order-1 pl-12 md:pl-0' : 'md:order-2 pl-12 md:pl-0'}`}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                  >
                    <div
                      className={`relative p-6 md:p-8 rounded-2xl md:rounded-3xl overflow-hidden group transition-all duration-500 ${
                        isLeft ? 'md:mr-8' : 'md:ml-8'
                      }`}
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(0, 255, 240, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)',
                        border: `1px solid ${isActive ? 'rgba(0, 255, 240, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
                        boxShadow: isActive
                          ? '0 20px 60px -20px rgba(0, 255, 240, 0.2), 0 0 80px -40px rgba(0, 255, 240, 0.3)'
                          : '0 10px 40px -20px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at ${isLeft ? '70%' : '30%'} 0%, rgba(0, 255, 240, 0.1) 0%, transparent 50%)`,
                        }}
                      />

                      {/* Large background number */}
                      <span
                        className={`absolute -top-2 ${isLeft ? '-right-2 md:-right-4' : '-left-2 md:-left-4'} text-[5rem] md:text-[8rem] font-black leading-none pointer-events-none select-none transition-all duration-500`}
                        style={{
                          WebkitTextStroke: `1px ${isActive ? 'rgba(0, 255, 240, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
                          color: 'transparent',
                        }}
                      >
                        {step.number}
                      </span>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Phase badge */}
                        <div className={`flex items-center gap-3 mb-4 ${!isLeft ? 'md:justify-end' : ''}`}>
                          <span
                            className="px-3 py-1 text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase rounded-full transition-all duration-500"
                            style={{
                              color: isActive ? '#00fff0' : 'rgba(255, 255, 255, 0.4)',
                              background: isActive ? 'rgba(0, 255, 240, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                              border: `1px solid ${isActive ? 'rgba(0, 255, 240, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                            }}
                          >
                            Phase {step.number}
                          </span>
                          {isCurrent && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-semibold rounded-full"
                              style={{
                                background: 'rgba(0, 255, 240, 0.15)',
                                color: '#00fff0',
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                style={{ background: '#00fff0', boxShadow: '0 0 6px #00fff0' }}
                              />
                              Current
                            </motion.span>
                          )}
                        </div>

                        {/* Title */}
                        <h3
                          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 transition-colors duration-500"
                          style={{ color: isActive ? 'white' : 'rgba(255, 255, 255, 0.6)' }}
                        >
                          {step.title}
                        </h3>

                        {/* Subtitle */}
                        <p
                          className="text-base md:text-lg mb-4 transition-colors duration-500"
                          style={{ color: isActive ? '#00fff0' : 'rgba(255, 255, 255, 0.3)' }}
                        >
                          {step.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-sm md:text-base text-white/40 leading-relaxed mb-6">
                          {step.description}
                        </p>

                        {/* Details */}
                        <div className={`flex flex-wrap gap-2 ${!isLeft ? 'md:justify-end' : ''}`}>
                          {step.details.map((detail, i) => (
                            <motion.span
                              key={detail}
                              initial={{ opacity: 0, y: 10 }}
                              animate={isInView ? { opacity: 1, y: 0 } : {}}
                              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 + i * 0.05 }}
                              className="flex items-center gap-1.5 text-xs text-white/50 px-2 py-1 rounded-md transition-colors hover:text-white/70"
                              style={{
                                background: isActive ? 'rgba(0, 255, 240, 0.05)' : 'rgba(255, 255, 255, 0.03)',
                              }}
                            >
                              <span
                                className="w-1 h-1 rounded-full"
                                style={{
                                  background: isActive ? '#00fff0' : 'rgba(255, 255, 255, 0.3)',
                                  boxShadow: isActive ? '0 0 4px #00fff0' : 'none',
                                }}
                              />
                              {detail}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* CENTER NODE - On the timeline */}
                  <div
                    className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 w-8 h-8 md:w-16 md:h-16 flex items-center justify-center z-20`}
                  >
                    {/* Outer glow ring */}
                    <motion.div
                      className="absolute inset-0 md:-inset-2 rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        background: 'radial-gradient(circle, rgba(0, 255, 240, 0.3) 0%, transparent 70%)',
                      }}
                    />

                    {/* Pulsing ring when current */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 md:-inset-1 rounded-full"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ border: '2px solid #00fff0' }}
                      />
                    )}

                    {/* Main node */}
                    <motion.div
                      className="relative w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center z-10"
                      animate={{
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(0, 255, 240, 0.25) 0%, rgba(0, 255, 240, 0.08) 100%)'
                          : 'rgba(20, 20, 20, 1)',
                        borderColor: isActive ? '#00fff0' : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: isActive
                          ? '0 0 30px rgba(0, 255, 240, 0.5), 0 0 60px rgba(0, 255, 240, 0.3), inset 0 0 20px rgba(0, 255, 240, 0.1)'
                          : '0 0 0 rgba(0, 0, 0, 0)',
                      }}
                      transition={{ duration: 0.5 }}
                      style={{ border: '3px solid' }}
                    >
                      <motion.span
                        className="hidden md:block"
                        animate={{
                          color: isActive ? '#00fff0' : 'rgba(255, 255, 255, 0.3)',
                          scale: isCurrent ? [1, 1.15, 1] : 1,
                        }}
                        transition={{ color: { duration: 0.3 }, scale: { duration: 2, repeat: Infinity } }}
                      >
                        {icons[index]}
                      </motion.span>
                      {/* Mobile: show number instead of icon */}
                      <span
                        className="md:hidden text-xs font-bold"
                        style={{ color: isActive ? '#00fff0' : 'rgba(255, 255, 255, 0.3)' }}
                      >
                        {step.number}
                      </span>
                    </motion.div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className={`hidden md:block ${isLeft ? 'md:order-2' : 'md:order-1'}`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 md:mt-32 text-center"
        >
          <motion.div
            className="relative inline-block px-10 md:px-16 py-10 md:py-12 rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 240, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid rgba(0, 255, 240, 0.15)',
              boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.5), 0 0 100px -50px rgba(0, 255, 240, 0.2)',
            }}
            whileHover={{
              boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.6), 0 0 120px -40px rgba(0, 255, 240, 0.3)',
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
              <div className="absolute top-4 left-4 w-12 h-px bg-gradient-to-r from-[#00fff0] to-transparent" />
              <div className="absolute top-4 left-4 w-px h-12 bg-gradient-to-b from-[#00fff0] to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
              <div className="absolute bottom-4 right-4 w-12 h-px bg-gradient-to-l from-[#00fff0] to-transparent" />
              <div className="absolute bottom-4 right-4 w-px h-12 bg-gradient-to-t from-[#00fff0] to-transparent" />
            </div>

            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 255, 240, 0.15) 0%, transparent 60%)',
              }}
            />

            <div className="relative z-10">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to start your journey?
              </p>
              <p className="text-sm md:text-base text-white/50 mb-8 max-w-md mx-auto">
                Let&apos;s discuss your project and create something extraordinary together.
              </p>
              <motion.a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm md:text-base text-[#030303] font-bold rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'linear-gradient(135deg, #00fff0 0%, #00d4c8 100%)',
                  boxShadow: '0 0 30px rgba(0, 255, 240, 0.5), 0 0 60px rgba(0, 255, 240, 0.3)',
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #00fff0 0%, #9945ff 100%)' }}
                />
                <span className="relative z-10" style={{ color: '#030303' }}>Start a Conversation</span>
                <svg
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#030303"
                  strokeWidth="2.5"
                  style={{ color: '#030303' }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
