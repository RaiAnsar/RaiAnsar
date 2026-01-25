'use client';

import { useInView } from 'react-intersection-observer';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'PHP', 'Python', 'REST APIs', 'GraphQL'],
  },
  {
    title: 'CMS',
    skills: ['WordPress', 'WooCommerce', 'Elementor', 'ACF', 'Shopify'],
  },
  {
    title: 'DevOps',
    skills: ['AWS', 'Docker', 'Linux', 'Nginx', 'CI/CD'],
  },
  {
    title: 'Servers',
    skills: ['cPanel/WHM', 'VPS', 'Cloudflare', 'DNS', 'SSL'],
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase'],
  },
];

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        {/* Section header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <span
            className="badge"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease',
            }}
          >
            Expertise
          </span>

          <h2
            className="text-title mt-6"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease',
              transitionDelay: '0.1s',
            }}
          >
            Technologies I work with
          </h2>
        </div>

        {/* Skills grid */}
        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="skill-category"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease',
                transitionDelay: `${0.2 + categoryIndex * 0.1}s`,
              }}
            >
              <h3 className="skill-category-title">
                {category.title}
              </h3>
              <div className="skill-list">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
