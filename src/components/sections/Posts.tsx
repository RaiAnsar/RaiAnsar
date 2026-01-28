'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Post = {
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  tags: string[];
  href: string;
  source: string;
};

const posts: Post[] = [
  {
    title: 'Stop guessing: a practical website performance checklist',
    excerpt: 'A simple, repeatable process to improve Core Web Vitals without breaking your UI.',
    date: 'January 2026',
    readMinutes: 4,
    tags: ['performance', 'nextjs', 'webdev'],
    href: 'https://dev.to/',
    source: 'dev.to',
  },
  {
    title: 'WordPress security hardening that actually works',
    excerpt: 'The exact steps I use to clean, lock down, and keep a production WordPress site stable.',
    date: 'December 2025',
    readMinutes: 5,
    tags: ['wordpress', 'security', 'hosting'],
    href: 'https://dev.to/',
    source: 'dev.to',
  },
  {
    title: 'Architecture notes: clean APIs, fewer incidents',
    excerpt: 'How to design APIs for change, scale, and clarity (with real-world tradeoffs).',
    date: 'November 2025',
    readMinutes: 6,
    tags: ['backend', 'architecture', 'apis'],
    href: 'https://dev.to/',
    source: 'dev.to',
  },
];

export function Posts() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="posts" className="section relative" ref={ref} role="region" aria-label="Posts section">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(900px circle at 40% 10%, rgba(0,255,240,0.06), transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <span className="section-label">Posts</span>
          <h2 className="section-title max-w-4xl">
            Notes from building real products.
            <span className="block text-white/70">Performance, security, and clean architecture.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mt-6">
            Short articles with practical takeaways—written for founders, teams, and developers.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.a
              key={post.title}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read article: ${post.title}`}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className="group rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden hover:border-white/20 transition-colors"
            >
              {/* Minimal cover */}
              <div
                className="h-36"
                style={{
                  background:
                    index === 0
                      ? 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(37,99,235,0.12))'
                      : index === 1
                        ? 'linear-gradient(135deg, rgba(14,165,233,0.22), rgba(34,197,94,0.12))'
                        : 'linear-gradient(135deg, rgba(139,92,246,0.22), rgba(168,85,247,0.12))',
                }}
              />

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <span>{post.source}</span>
                  <span aria-hidden="true">•</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">•</span>
                  <span>{post.readMinutes} min read</span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-white leading-snug group-hover:text-white">
                  {post.title}
                </h3>

                <p className="mt-2 text-white/55 leading-relaxed">{post.excerpt}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs rounded-full border border-white/10 bg-black/20 text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                  Read Article
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-12"
        >
          <a href="https://dev.to/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <span>View all posts</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

