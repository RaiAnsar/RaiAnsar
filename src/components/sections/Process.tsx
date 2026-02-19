'use client';

import { useInView } from '@/hooks/useInView';
import { TextScramble } from '@/components/ui/TextScramble';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'Understanding Your Vision',
    description: 'I dive deep into your goals, target audience, and project requirements. This phase establishes the foundation for everything that follows.',
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

const icons = [
  <svg key="discovery" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M11 8v6M8 11h6" />
  </svg>,
  <svg key="strategy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>,
  <svg key="creation" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
  <svg key="launch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>,
];

export function Process() {
  const [containerRef, isInView] = useInView<HTMLElement>({ threshold: 0.1, once: true });

  const anim = (delay = 0, y = 50): React.CSSProperties => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'none' : `translateY(${y}px)`,
    transition: `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1)`,
  });

  const animX = (delay = 0, x = -30): React.CSSProperties => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'none' : `translateX(${x}px)`,
    transition: `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1)`,
  });

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 overflow-hidden"
      id="process"
      role="region"
      aria-label="Process section"
      style={{ background: '#0a0a0a' }}
    >
      {/* Animated ambient background — CSS float animations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, transparent 60%)',
            left: '5%',
            top: '20%',
            animation: 'floatA 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 133, 85, 0.05) 0%, transparent 60%)',
            right: '10%',
            top: '50%',
            animation: 'floatB 25s ease-in-out infinite',
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-16 md:mb-20" style={anim(0, 60)}>
          <span
            className="text-[#ff6b35] text-sm font-semibold tracking-[0.2em] uppercase"
            style={anim(0.2, 20)}
          >
            <TextScramble text="// Process" delay={0} />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-4">
            From vision to{' '}
            <span className="gradient-text">reality.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/40 max-w-2xl leading-relaxed tracking-wide">
            A proven process refined over years of delivering exceptional digital products.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* CENTER TIMELINE — grows on inView */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 md:w-1.5 hidden md:block" aria-hidden="true">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(255, 255, 255, 0.08)' }}
            />
            <div
              className="absolute top-0 left-0 right-0 rounded-full"
              style={{
                height: isInView ? '100%' : '0%',
                background: '#ff6b35',
                boxShadow: `
                  0 0 20px rgba(255, 107, 53, 0.8),
                  0 0 40px rgba(255, 107, 53, 0.5),
                  0 0 60px rgba(255, 107, 53, 0.3)
                `,
                transition: 'height 1.8s 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </div>

          {/* Mobile timeline — Left side */}
          <div className="absolute left-4 top-0 bottom-0 w-1 md:hidden" aria-hidden="true">
            <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
            <div
              className="absolute top-0 left-0 right-0 rounded-full"
              style={{
                height: isInView ? '100%' : '0%',
                background: '#ff6b35',
                boxShadow: '0 0 20px rgba(255, 107, 53, 0.8)',
                transition: 'height 1.8s 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </div>

          {/* Process steps */}
          <div className="relative space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                    isLeft ? '' : 'md:text-right'
                  }`}
                  style={anim(0.2 + index * 0.15, 50)}
                  role="listitem"
                  aria-label={`${step.title}: ${step.subtitle}`}
                >
                  {/* Content card */}
                  <div
                    className={`relative ${isLeft ? 'md:order-1 pl-12 md:pl-0' : 'md:order-2 pl-12 md:pl-0'}`}
                    style={animX(0.3 + index * 0.15, isLeft ? -30 : 30)}
                  >
                    <div
                      className={`relative p-6 md:p-8 rounded-2xl md:rounded-3xl overflow-hidden group transition-all duration-500 ${
                        isLeft ? 'md:mr-8' : 'md:ml-8'
                      }`}
                      style={{
                        background: isInView
                          ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)',
                        border: `1px solid ${isInView ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
                        boxShadow: isInView
                          ? '0 20px 60px -20px rgba(255, 107, 53, 0.2), 0 0 80px -40px rgba(255, 107, 53, 0.3)'
                          : '0 10px 40px -20px rgba(0, 0, 0, 0.5)',
                        transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
                      }}
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at ${isLeft ? '70%' : '30%'} 0%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)`,
                        }}
                      />

                      {/* Large background number */}
                      <span
                        className={`absolute -top-2 ${isLeft ? '-right-2 md:-right-4' : '-left-2 md:-left-4'} text-[5rem] md:text-[8rem] font-black leading-none pointer-events-none select-none`}
                        style={{
                          WebkitTextStroke: `1px ${isInView ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
                          color: 'transparent',
                          transition: 'all 0.5s ease',
                        }}
                        aria-hidden="true"
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
                              color: isInView ? '#ff6b35' : 'rgba(255, 255, 255, 0.4)',
                              background: isInView ? 'rgba(255, 107, 53, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                              border: `1px solid ${isInView ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                            }}
                          >
                            Phase {step.number}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 transition-colors duration-500"
                          style={{ color: isInView ? 'white' : 'rgba(255, 255, 255, 0.6)' }}
                        >
                          {step.title}
                        </h3>

                        {/* Subtitle */}
                        <p
                          className="text-base md:text-lg mb-4 transition-colors duration-500"
                          style={{ color: isInView ? '#ff6b35' : 'rgba(255, 255, 255, 0.3)' }}
                        >
                          {step.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-sm md:text-base text-white/40 leading-relaxed mb-6">
                          {step.description}
                        </p>

                        {/* Details */}
                        <div
                          className={`flex flex-wrap gap-2 ${!isLeft ? 'md:justify-end' : ''}`}
                          aria-label={`${step.title} details`}
                        >
                          {step.details.map((detail, i) => (
                            <span
                              key={detail}
                              className="flex items-center gap-1.5 text-xs text-white/50 px-2 py-1 rounded-md transition-colors hover:text-white/70"
                              style={{
                                background: isInView ? 'rgba(255, 107, 53, 0.05)' : 'rgba(255, 255, 255, 0.03)',
                                opacity: isInView ? 1 : 0,
                                transform: isInView ? 'none' : 'translateY(10px)',
                                transition: `opacity 0.5s ${0.5 + index * 0.1 + i * 0.05}s ease, transform 0.5s ${0.5 + index * 0.1 + i * 0.05}s ease`,
                              }}
                              role="listitem"
                            >
                              <span
                                className="w-1 h-1 rounded-full"
                                style={{
                                  background: isInView ? '#ff6b35' : 'rgba(255, 255, 255, 0.3)',
                                  boxShadow: isInView ? '0 0 4px #ff6b35' : 'none',
                                }}
                                aria-hidden="true"
                              />
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CENTER NODE — on timeline */}
                  <div
                    className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 w-8 h-8 md:w-16 md:h-16 flex items-center justify-center z-20"
                    aria-hidden="true"
                  >
                    {/* Glow halo */}
                    <div
                      className="absolute inset-0 md:-inset-2 rounded-full transition-all duration-500"
                      style={{
                        background: isInView ? 'radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%)' : 'transparent',
                        opacity: isInView ? 1 : 0,
                      }}
                    />
                    {/* Pulsing ring — CSS animation */}
                    {isInView && index === 0 && (
                      <div
                        className="absolute inset-0 md:-inset-1 rounded-full"
                        style={{
                          border: '2px solid #ff6b35',
                          animation: 'processPulse 2s ease-in-out infinite',
                        }}
                      />
                    )}
                    {/* Node circle */}
                    <div
                      className="relative w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center z-10 transition-all duration-500"
                      style={{
                        background: isInView
                          ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.25) 0%, rgba(255, 107, 53, 0.08) 100%)'
                          : 'rgba(20, 20, 20, 1)',
                        border: `3px solid ${isInView ? '#ff6b35' : 'rgba(255, 255, 255, 0.1)'}`,
                        boxShadow: isInView
                          ? '0 0 30px rgba(255, 107, 53, 0.5), 0 0 60px rgba(255, 107, 53, 0.3), inset 0 0 20px rgba(255, 107, 53, 0.1)'
                          : 'none',
                      }}
                    >
                      <span
                        className="hidden md:block transition-colors duration-300"
                        style={{ color: isInView ? '#ff6b35' : 'rgba(255, 255, 255, 0.3)' }}
                      >
                        {icons[index]}
                      </span>
                      <span
                        className="md:hidden text-xs font-bold"
                        style={{ color: isInView ? '#ff6b35' : 'rgba(255, 255, 255, 0.3)' }}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Empty space for other side */}
                  <div className={`hidden md:block ${isLeft ? 'md:order-2' : 'md:order-1'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 text-center" style={anim(1, 50)}>
          <div
            className="relative inline-block px-8 md:px-12 py-8 md:py-10 rounded-3xl overflow-hidden hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),0_0_120px_-40px_rgba(255,107,53,0.3)] transition-shadow duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid rgba(255, 107, 53, 0.15)',
              boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.5), 0 0 100px -50px rgba(255, 107, 53, 0.2)',
            }}
          >
            <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none" aria-hidden="true">
              <div className="absolute top-4 left-4 w-12 h-px bg-gradient-to-r from-[#ff6b35] to-transparent" />
              <div className="absolute top-4 left-4 w-px h-12 bg-gradient-to-b from-[#ff6b35] to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none" aria-hidden="true">
              <div className="absolute bottom-4 right-4 w-12 h-px bg-gradient-to-l from-[#ff6b35] to-transparent" />
              <div className="absolute bottom-4 right-4 w-px h-12 bg-gradient-to-t from-[#ff6b35] to-transparent" />
            </div>
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 107, 53, 0.15) 0%, transparent 60%)',
              }}
            />
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to start your project?
              </p>
              <p className="text-sm md:text-base text-white/50 mb-8 max-w-md mx-auto">
                Let&apos;s discuss your requirements and build something great together.
              </p>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm md:text-base font-bold rounded-full overflow-hidden hover:scale-105 active:scale-[0.98] transition-transform duration-300"
                style={{
                  background: '#ff6b35',
                  boxShadow: '0 0 30px rgba(255, 107, 53, 0.5), 0 0 60px rgba(255, 107, 53, 0.3)',
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #ff8555 100%)' }} />
                <span className="relative z-10 text-white">Start a Conversation</span>
                <svg
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
