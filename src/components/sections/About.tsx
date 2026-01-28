'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'WordPress', level: 92 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 88 },
  { name: 'AWS / Cloud', level: 85 },
  { name: 'Python', level: 80 },
];

const experiences = [
  { year: '2024', role: 'Founder', company: 'Acefina', type: 'current' },
  { year: '2025', role: 'Full-Stack Developer', company: 'The DWCO', type: 'current' },
  { year: '2024', role: 'Full-Stack Developer', company: 'Mount5 & Mediatronixs', type: 'current' },
  { year: '2023', role: 'Top Rated Freelancer', company: 'Upwork', type: 'current' },
  { year: '2021', role: 'Senior Developer', company: 'bDifferent LTD', type: 'past' },
  { year: '2019', role: 'Level 2 Seller', company: 'Fiverr', type: 'past' },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-white/80">{name}</span>
        <span className="text-sm font-mono text-[#00fff0]">{level}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #00fff0 0%, #9945ff 50%, #ff2d92 100%)',
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.19, 1, 0.22, 1] }}
        />
      </div>
    </div>
  );
}

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section ref={containerRef} className="section relative" id="about">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(153, 69, 255, 0.15) 0%, transparent 70%)',
            left: '-10%',
            top: '20%',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 240, 0.1) 0%, transparent 70%)',
            right: '-5%',
            bottom: '10%',
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="section-label">My Story</span>
          <h2 className="section-title max-w-4xl">
            Building products with{' '}
            <span className="gradient-text">clarity</span>, speed, and taste.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-8">
                From freelance platforms to leading development teams, I&apos;ve built a career
                as a <span className="text-white">full-stack architect</span> who transforms
                complex challenges into elegant, scalable solutions.
              </p>
              <p className="text-lg text-white/50 leading-relaxed mb-12">
                My journey spans Fiverr, Upwork, and direct client partnerships—working with
                agencies, startups, and enterprises worldwide. I believe the best code isn&apos;t
                just functional—it&apos;s a craft built on clean architecture and thoughtful design.
              </p>
            </motion.div>

            {/* Experience timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-6">
                Experience
              </h3>
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 group p-4 -mx-4 rounded-xl transition-all duration-300"
                  style={{
                    background: exp.type === 'current' ? 'linear-gradient(135deg, rgba(0,255,240,0.05) 0%, transparent 100%)' : 'transparent',
                  }}
                >
                  <span
                    className={`font-mono text-sm ${exp.type === 'current' ? 'text-[#00fff0]' : 'text-white/30'}`}
                    style={exp.type === 'current' ? { textShadow: '0 0 20px rgba(0,255,240,0.5)' } : {}}
                  >
                    {exp.year}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white group-hover:text-[#00fff0] transition-colors">
                        {exp.role}
                      </h4>
                      {exp.type === 'current' && (
                        <span
                          className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#030303] bg-[#00fff0] rounded-full"
                          style={{ boxShadow: '0 0 15px rgba(0,255,240,0.5)' }}
                        >
                          Now
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/40">{exp.company}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Skills + 3D Card */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative p-8 mb-8 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-4 left-4 w-8 h-px bg-gradient-to-r from-[#00fff0] to-transparent" />
                <div className="absolute top-4 left-4 w-px h-8 bg-gradient-to-b from-[#00fff0] to-transparent" />
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute bottom-4 right-4 w-8 h-px bg-gradient-to-l from-[#9945ff] to-transparent" />
                <div className="absolute bottom-4 right-4 w-px h-8 bg-gradient-to-t from-[#9945ff] to-transparent" />
              </div>
              <h3 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-8">
                Technical Skills
              </h3>
              {skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.5 + index * 0.1}
                />
              ))}
            </motion.div>

            {/* Code block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(20,20,20,0.8) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 0 60px rgba(153,69,255,0.03)',
              }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: 'rgba(0,0,0,0.3)' }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" style={{ boxShadow: '0 0 10px rgba(255,95,86,0.5)' }} />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" style={{ boxShadow: '0 0 10px rgba(255,189,46,0.5)' }} />
                  <div className="w-3 h-3 rounded-full bg-[#27ca40]" style={{ boxShadow: '0 0 10px rgba(39,202,64,0.5)' }} />
                </div>
                <span className="ml-2 text-xs text-white/30 font-mono">developer.ts</span>
              </div>
              <pre className="p-6 text-sm font-mono leading-loose overflow-x-auto">
                <code>
                  <span className="text-[#ff79c6]">const</span>{' '}
                  <span className="text-[#8be9fd]">developer</span>{' '}
                  <span className="text-[#ff79c6]">=</span> {'{'}
                  {'\n'}
                  {'  '}<span className="text-[#50fa7b]">name</span>:{' '}
                  <span className="text-[#f1fa8c]">&quot;Rai Ansar&quot;</span>,
                  {'\n'}
                  {'  '}<span className="text-[#50fa7b]">role</span>:{' '}
                  <span className="text-[#f1fa8c]">&quot;Full-Stack Engineer&quot;</span>,
                  {'\n'}
                  {'  '}<span className="text-[#50fa7b]">passion</span>:{' '}
                  <span className="text-[#bd93f9]">Infinity</span>,
                  {'\n'}
                  {'  '}<span className="text-[#50fa7b]">coffee</span>:{' '}
                  <span className="text-[#ff79c6]">true</span>,
                  {'\n'}
                  {'  '}<span className="text-[#8be9fd]">build</span>:{' '}
                  <span className="text-[#ff79c6]">()</span>{' '}
                  <span className="text-[#ff79c6]">=&gt;</span>{' '}
                  <span className="text-[#f1fa8c]">&quot;amazing things&quot;</span>
                  {'\n'}
                  {'}'};
                </code>
              </pre>
            </motion.div>
          </div>
        </div>

        {/* Large text marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-32 overflow-hidden"
        >
          <div className="marquee">
            <div className="marquee-content">
              {[...Array(2)].map((_, i) => (
                <span
                  key={i}
                  className="text-[8rem] md:text-[12rem] font-black text-transparent whitespace-nowrap"
                  style={{
                    WebkitTextStroke: '1px rgba(255,255,255,0.25)',
                  }}
                >
                  CREATIVE • DEVELOPER • DESIGNER • ENGINEER •{' '}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
