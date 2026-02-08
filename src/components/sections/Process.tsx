'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { TextScramble } from '@/components/ui/TextScramble';
import { Magnetic } from '@/components/ui/Magnetic';

const steps = [
  {
    number: '01',
    title: 'Contact',
    subtitle: 'Understanding Your Vision',
    description: 'We discuss your idea, requirements, and goals to understand the vision.',
  },
  {
    number: '02',
    title: 'Plan',
    subtitle: 'Creating the Roadmap',
    description: 'I create a detailed roadmap and technical architecture for your project.',
  },
  {
    number: '03',
    title: 'Develop',
    subtitle: 'Building Excellence',
    description: 'Writing clean, efficient code with regular updates and feedback loops.',
  },
  {
    number: '04',
    title: 'Deploy',
    subtitle: 'Launch & Beyond',
    description: 'Launching your product to the world with proper testing and optimization.',
  },
];

function ProcessCard({ step, index, isActive }: { step: typeof steps[0]; index: number; isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Magnetic strength={0.08}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card with glow effect */}
        <div 
          className="relative p-8 rounded-2xl border transition-all duration-500 overflow-hidden group cursor-default"
          style={{
            background: isHovered ? 'rgba(255,107,53,0.05)' : 'rgba(255,255,255,0.02)',
            borderColor: isHovered ? 'rgba(255,107,53,0.3)' : 'rgba(255,255,255,0.06)',
          }}
        >
          {/* Animated background gradient on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(400px circle at 50% 0%, rgba(255,107,53,0.15), transparent 50%)',
            }}
          />
          
          <div className="relative z-10">
            {/* Number */}
            <div className="text-[#ff6b35] text-sm font-bold tracking-widest mb-4">
              <TextScramble text={`// ${step.number}`} delay={index * 100} />
            </div>
            
            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#ff6b35] transition-colors duration-300">
              {step.title}
            </h3>
            
            {/* Subtitle */}
            <p className="text-[#ff8555] text-sm font-medium mb-4">{step.subtitle}</p>
            
            {/* Description */}
            <p className="text-[#707070] leading-relaxed">{step.description}</p>
          </div>
          
          {/* Corner accent */}
          <div 
            className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, transparent 50%)',
            }}
          />
        </div>
      </motion.div>
    </Magnetic>
  );
}

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const smoothY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden"
      id="process"
      role="region"
      aria-label="Process section"
    >
      {/* Solid background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* Subtle animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: smoothY }}
        aria-hidden="true"
      >
        <div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, transparent 60%)',
            left: '-10%',
            top: '10%',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-[#ff6b35] text-sm font-semibold tracking-[0.2em] uppercase mb-6"
          >
            <TextScramble text="// Process" delay={0} />
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            <TextScramble text="How we work" delay={200} />
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-[#606060] max-w-xl mx-auto"
          >
            Simple. Transparent. Effective.
          </motion.p>
        </div>

        {/* Process steps grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <ProcessCard key={step.number} step={step} index={index} isActive={true} />
          ))}
        </div>
        
        {/* Animated connecting line for desktop */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 w-px h-[60%] bg-gradient-to-b from-transparent via-[#ff6b35]/20 to-transparent origin-top"
        />
      </div>
    </section>
  );
}
