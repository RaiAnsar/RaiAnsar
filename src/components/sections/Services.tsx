'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AmbientOrbs, FloatingParticles } from '@/components/ui/AmbientOrbs';

// Service type with size for bento grid
type ServiceSize = 'featured' | 'large' | 'standard';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  icon: React.ReactNode;
  gradient: string;
  glow: string;
  glowRGB: string;
  size: ServiceSize;
}

const services: Service[] = [
  {
    id: 'frontend',
    name: 'FRONTEND',
    category: 'Digital Experience',
    description: 'Crafting immersive digital journeys that captivate and convert. Pixel-perfect interfaces with fluid animations and seamless interactions that users love.',
    stack: ['React / Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Three.js'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l3 3-3 3M12 14h5" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-[#00fff0] to-[#00a8ff]',
    glow: '#00fff0',
    glowRGB: '0, 255, 240',
    size: 'featured',
  },
  {
    id: 'backend',
    name: 'BACKEND',
    category: 'System Architecture',
    description: 'Building robust, scalable server-side solutions. Secure APIs and microservices engineered for performance at any scale.',
    stack: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'GraphQL'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
        <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
      </svg>
    ),
    gradient: 'from-[#9945ff] to-[#6366f1]',
    glow: '#9945ff',
    glowRGB: '153, 69, 255',
    size: 'large',
  },
  {
    id: 'wordpress',
    name: 'WORDPRESS',
    category: 'CMS Expertise',
    description: 'Complete WordPress solutions from hosting to custom development. Migrations, theme design, custom plugins, and expert debugging.',
    stack: ['Hosting', 'Migrations', 'Theme Design', 'Custom Plugins', 'Debugging'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M2.5 12h3l2.5 8L12 6l3 10 2-4h4.5" />
      </svg>
    ),
    gradient: 'from-[#21759b] to-[#464646]',
    glow: '#21759b',
    glowRGB: '33, 117, 155',
    size: 'standard',
  },
  {
    id: 'ai',
    name: 'AI',
    category: 'Intelligent Solutions',
    description: 'Integrating cutting-edge AI to automate and enhance. LLMs and predictive models for smarter applications.',
    stack: ['OpenAI', 'LangChain', 'Python', 'ML Models'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    gradient: 'from-[#ff2d92] to-[#ec4899]',
    glow: '#ff2d92',
    glowRGB: '255, 45, 146',
    size: 'standard',
  },
  {
    id: 'devops',
    name: 'DEVOPS',
    category: 'Cloud Infrastructure',
    description: 'Automating deployment pipelines. Container orchestration ensuring your software runs smoothly.',
    stack: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="9" strokeDasharray="4 2" />
      </svg>
    ),
    gradient: 'from-[#22c55e] to-[#10b981]',
    glow: '#22c55e',
    glowRGB: '34, 197, 94',
    size: 'standard',
  },
];

// Size classes for bento grid
const sizeClasses: Record<ServiceSize, string> = {
  featured: 'col-span-12 lg:col-span-7 row-span-2',
  large: 'col-span-12 md:col-span-6 lg:col-span-5 row-span-2',
  standard: 'col-span-12 md:col-span-6 lg:col-span-4',
};

function ServiceCard({
  service,
  isActive,
  onClick,
  index,
}: {
  service: Service;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 90 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 90 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / rect.width - 0.5;
      const yPct = mouseY / rect.height - 0.5;
      x.set(xPct);
      y.set(yPct);

      // Update CSS variables for spotlight
      cardRef.current.style.setProperty('--mouse-x', `${(mouseX / rect.width) * 100}%`);
      cardRef.current.style.setProperty('--mouse-y', `${(mouseY / rect.height) * 100}%`);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const isFeatured = service.size === 'featured';
  const isLarge = service.size === 'large';

  return (
    <motion.div
      ref={cardRef}
      className={`${sizeClasses[service.size]} relative`}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.1 * index,
        ease: [0.19, 1, 0.22, 1],
      }}
      style={{
        perspective: '1000px',
      }}
    >
      {/* Animated gradient border wrapper */}
      <motion.div
        className="gradient-border-animated h-full"
        style={
          {
            '--border-color-1': service.glow,
            '--border-color-2': service.glow,
            '--border-color-3': 'transparent',
          } as React.CSSProperties
        }
      >
        {/* Main card */}
        <motion.div
          className="service-card h-full cursor-pointer group"
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: 'preserve-3d',
            ['--card-glow' as string]: `rgba(${service.glowRGB}, 0.1)`,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          {/* Subtle glow layer - reduced opacity */}
          <div
            className="service-card-glow"
            style={{ ['--glow-color' as string]: `rgba(${service.glowRGB}, 0.08)` }}
          />

          {/* Ambient orbs - pushed further back with lower opacity */}
          <div className="absolute inset-0 opacity-40">
            <AmbientOrbs
              color={service.glow}
              count={isFeatured ? 3 : isLarge ? 2 : 1}
              minSize={isFeatured ? 60 : 40}
              maxSize={isFeatured ? 120 : 80}
            />
          </div>

          {/* Floating particles - more subtle */}
          {(isFeatured || isLarge) && (
            <div className="absolute inset-0 opacity-50">
              <FloatingParticles color={service.glow} count={isFeatured ? 4 : 3} />
            </div>
          )}

          {/* Corner accent lines */}
          <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-4 left-4 w-8 h-[1px]"
              style={{ background: `linear-gradient(90deg, ${service.glow}, transparent)` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute top-4 left-4 w-[1px] h-8"
              style={{ background: `linear-gradient(180deg, ${service.glow}, transparent)` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute bottom-4 right-4 w-8 h-[1px]"
              style={{ background: `linear-gradient(-90deg, ${service.glow}, transparent)` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute bottom-4 right-4 w-[1px] h-8"
              style={{ background: `linear-gradient(0deg, ${service.glow}, transparent)` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Glassmorphism content panel - THIS FIXES READABILITY */}
          <div
            className={`absolute inset-3 rounded-xl z-[5] pointer-events-none`}
            style={{
              background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.7) 0%, rgba(10, 10, 10, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.03)',
            }}
          />

          {/* Content wrapper with depth */}
          <div
            className={`relative z-10 h-full ${isFeatured ? 'p-10' : 'p-8'}`}
            style={{ transform: 'translateZ(20px)' }}
          >
            {/* Service number - repositioned */}
            <motion.span
              className="absolute -top-2 -right-2 text-[6rem] lg:text-[8rem] font-black leading-none pointer-events-none select-none"
              style={{
                background: `linear-gradient(135deg, rgba(${service.glowRGB}, 0.12) 0%, transparent 60%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>

            {/* 3D Icon with enhanced glow */}
            <div className="icon-3d-container mb-8 relative">
              {/* Icon glow ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `radial-gradient(circle, rgba(${service.glowRGB}, 0.3) 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                }}
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                  opacity: isHovered ? [0.5, 0.8, 0.5] : 0.3,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className={`icon-3d ${isFeatured ? 'w-20 h-20' : 'w-[72px] h-[72px]'} relative`}
                style={{
                  background: `linear-gradient(135deg, ${service.glow}, ${service.gradient.includes('to-[') ? service.gradient.split('to-[')[1].replace(']', '') : service.glow})`,
                  ['--icon-glow' as string]: `rgba(${service.glowRGB}, 0.5)`,
                }}
                whileHover={{ scale: 1.15, rotateY: 15, rotateX: -5 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
              >
                <motion.span
                  className="text-white relative z-10"
                  animate={{
                    filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' : 'none'
                  }}
                >
                  {service.icon}
                </motion.span>
              </motion.div>
            </div>

            {/* Category label with glow */}
            <motion.span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase mb-4"
              style={{
                color: service.glow,
                textShadow: `0 0 20px rgba(${service.glowRGB}, 0.5)`,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: service.glow, boxShadow: `0 0 10px ${service.glow}` }}
              />
              {service.category}
            </motion.span>

            {/* Service name with text shadow for contrast */}
            <motion.h3
              className={`font-black tracking-tight mb-4 ${
                isFeatured ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'
              } text-white`}
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              }}
              whileHover={{
                textShadow: `0 0 30px rgba(${service.glowRGB}, 0.3)`,
              }}
            >
              {service.name}
            </motion.h3>

            {/* Description with better contrast */}
            <p
              className={`text-white/60 leading-relaxed mb-8 ${
                isFeatured ? 'text-base lg:text-lg max-w-xl' : 'text-sm'
              }`}
              style={{
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              }}
            >
              {service.description}
            </p>

            {/* Tech stack with enhanced styling */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {service.stack.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="relative px-4 py-2 text-xs font-medium rounded-full cursor-default overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.1 + i * 0.05,
                  }}
                  whileHover={{
                    background: `rgba(${service.glowRGB}, 0.15)`,
                    borderColor: `rgba(${service.glowRGB}, 0.4)`,
                    color: '#ffffff',
                    scale: 1.05,
                    y: -2,
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.span
                    className="absolute inset-0 -translate-x-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    }}
                    animate={{ x: ['0%', '200%'] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                  <span className="relative z-10">{tech}</span>
                </motion.span>
              ))}
            </div>

            {/* Active indicator */}
            {isActive && (
              <motion.div
                className="absolute top-6 right-6 flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="text-xs font-medium uppercase tracking-widest" style={{ color: service.glow }}>
                  Active
                </span>
                <motion.div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: service.glow }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            )}
          </div>

          {/* Hover border glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              border: `1px solid rgba(${service.glowRGB}, 0.2)`,
              boxShadow: `inset 0 0 30px rgba(${service.glowRGB}, 0.05)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const [activeService, setActiveService] = useState('frontend');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for section spotlight
  const handleSectionMouseMove = useCallback((e: React.MouseEvent) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gridRef.current.style.setProperty('--spotlight-x', `${x}px`);
    gridRef.current.style.setProperty('--spotlight-y', `${y}px`);
  }, []);

  return (
    <section
      ref={containerRef}
      className="section relative overflow-hidden"
      id="services"
      onMouseMove={handleSectionMouseMove}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(153, 69, 255, 0.12) 0%, transparent 60%)',
            right: '-25%',
            top: '0%',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 240, 0.08) 0%, transparent 60%)',
            left: '-15%',
            bottom: '0%',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 45, 146, 0.06) 0%, transparent 60%)',
            right: '20%',
            bottom: '-10%',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container relative z-10" ref={ref}>
        {/* Section header with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mb-20"
        >
          <motion.span
            className="section-label"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What I Do
          </motion.span>
          <h2 className="section-title max-w-4xl">
            Expertise that delivers{' '}
            <span className="gradient-text">exceptional results.</span>
          </h2>
          <motion.p
            className="text-xl text-white/50 max-w-2xl mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From concept to deployment, I bring your ideas to life with cutting-edge technology
            and meticulous attention to detail.
          </motion.p>
        </motion.div>

        {/* Service filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-3 mb-16 overflow-x-auto pb-4 scrollbar-hide"
        >
          {services.map((service, i) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`relative px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                activeService === service.id
                  ? 'text-[#030303]'
                  : 'text-white/90 hover:text-white bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              {activeService === service.id && (
                <motion.div
                  layoutId="activeServiceTab"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${service.glow}, ${service.gradient.includes('to-[') ? service.gradient.split('to-[')[1].replace(']', '') : service.glow})`,
                    boxShadow: `0 0 30px ${service.glow}60`,
                  }}
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{service.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Bento grid with spotlight container */}
        <div
          ref={gridRef}
          className="spotlight-container"
          style={{ ['--spotlight-color' as string]: 'rgba(0, 255, 240, 0.04)' }}
        >
          <div className="grid grid-cols-12 auto-rows-[minmax(280px,auto)] gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                isActive={activeService === service.id}
                onClick={() => setActiveService(service.id)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <motion.p
            className="text-white/40 mb-8 text-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
          >
            Ready to start your project?
          </motion.p>
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-4 px-10 py-5 text-lg font-bold text-[#030303] bg-[#00fff0] rounded-full overflow-hidden"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#00fff0] via-[#9945ff] to-[#ff2d92]"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white" style={{ color: '#030303' }}>
              Let&apos;s Build Something Amazing
            </span>
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#030303"
              strokeWidth="2.5"
              className="relative z-10 transition-colors duration-300 group-hover:stroke-white"
              style={{ color: '#030303' }}
              whileHover={{ x: 5 }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: '0 0 60px rgba(0, 255, 240, 0.5)',
              }}
              initial={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
