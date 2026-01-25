'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { skills, skillsDescription } from '@/data/skills';

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="skills" className="py-24 overflow-hidden bg-background relative z-10" ref={ref}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          My Skills
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text Block */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              {skillsDescription.title}
            </h3>
            {skillsDescription.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-muted text-lg leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Skills Bars */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({
  skill,
  index,
  inView
}: {
  skill: { name: string; percentage: number };
  index: number;
  inView: boolean;
}) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && progressRef.current) {
      setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.width = `${skill.percentage}%`;
        }
      }, 100 + index * 100);
    }
  }, [inView, skill.percentage, index]);

  return (
    <div
      className={`transition-all duration-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
      style={{ transitionDelay: `${400 + index * 100}ms` }}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-foreground">{skill.name}</h4>
        <span className="text-sm font-semibold text-accent">{skill.percentage}%</span>
      </div>
      <div className="h-2 bg-default rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all duration-1000 ease-out"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
}
