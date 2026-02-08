'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { TextScramble } from '@/components/ui/TextScramble';
import { Magnetic } from '@/components/ui/Magnetic';

type Post = {
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  tags: string[];
  href: string;
};

const posts: Post[] = [
  {
    title: 'Stop guessing: a practical website performance checklist',
    excerpt: 'A simple, repeatable process to improve Core Web Vitals without breaking your UI.',
    date: 'Jan 2026',
    readMinutes: 4,
    tags: ['performance', 'nextjs'],
    href: 'https://dev.to/',
  },
  {
    title: 'WordPress security hardening that actually works',
    excerpt: 'The exact steps I use to clean, lock down, and keep a production WordPress site stable.',
    date: 'Dec 2025',
    readMinutes: 5,
    tags: ['wordpress', 'security'],
    href: 'https://dev.to/',
  },
  {
    title: 'Architecture notes: clean APIs, fewer incidents',
    excerpt: 'How to design APIs for change, scale, and clarity (with real-world tradeoffs).',
    date: 'Nov 2025',
    readMinutes: 6,
    tags: ['backend', 'apis'],
    href: 'https://dev.to/',
  },
];

function PostCard({ post, index }: { post: Post; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Magnetic strength={0.05}>
      <motion.a
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
        className="group block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Read article: ${post.title}`}
      >
        <div 
          className="relative p-6 rounded-2xl border transition-all duration-500 h-full overflow-hidden"
          style={{
            background: isHovered ? 'rgba(255,107,53,0.03)' : 'rgba(255,255,255,0.02)',
            borderColor: isHovered ? 'rgba(255,107,53,0.3)' : 'rgba(255,255,255,0.06)',
          }}
        >
          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(300px circle at 50% 0%, rgba(255,107,53,0.1), transparent 50%)',
            }}
          />
          
          <div className="relative z-10">
            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-[#505050] mb-4">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-[#505050]" />
              <span>{post.readMinutes} min read</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#ff6b35] transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-[#606060] text-sm leading-relaxed mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 text-xs rounded-full border border-white/10 text-[#707070] group-hover:border-[#ff6b35]/30 group-hover:text-[#ff6b35] transition-colors duration-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            {/* Read more indicator */}
            <div className="mt-4 flex items-center gap-2 text-sm text-[#ff6b35] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Read article</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </motion.a>
    </Magnetic>
  );
}

export function Posts() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      id="posts"
      className="relative py-32 md:py-40 bg-[#0a0a0a]"
      role="region"
      aria-label="Posts section"
    >
      {/* Solid background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-[#ff6b35] text-sm font-semibold tracking-[0.2em] uppercase mb-6"
          >
            <TextScramble text="// Blog" delay={0} />
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            <TextScramble text="Latest insights" delay={200} />
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-[#606060] max-w-xl"
          >
            Thoughts on performance, architecture, and building better products.
          </motion.p>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PostCard key={post.title} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
