'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TextScramble } from '@/components/ui/TextScramble';

const codeSnippets = [
  { code: "npm install universe", color: "#ff6b35" },
  { code: "const coffee = () => '☕'.repeat(10)", color: "#ff8555" },
  { code: "if (bug) fixIt(); else celebrate();", color: "#ff6b35" },
  { code: "git commit -m 'it works!'", color: "#707070" },
  { code: "return <Awesome />", color: "#ff6b35" },
  { code: "sudo make me a sandwich", color: "#ff8555" },
  { code: "while (alive) code();", color: "#ff6b35" },
  { code: "404: Sleep not found", color: "#505050" },
  { code: "const dev = { passion: Infinity }", color: "#ff6b35" },
  { code: "console.log('Hello World')", color: "#ff8555" },
  { code: "deploy --production --yolo", color: "#ff6b35" },
  { code: "// TODO: Take over the world", color: "#505050" },
];

export function CodeMarquee() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const row1Snippets = [...codeSnippets, ...codeSnippets, ...codeSnippets];
  const row2Snippets = [...codeSnippets.slice().reverse(), ...codeSnippets.slice().reverse(), ...codeSnippets.slice().reverse()];

  return (
    <section 
      ref={containerRef}
      className="relative py-24 bg-[#0a0a0a] overflow-hidden"
      aria-hidden="true"
    >
      {/* Solid background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      {/* Big text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-6"
      >
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
          <span className="text-white">
            <TextScramble text="CODE." delay={0} />
          </span>
          <br />
          <span className="gradient-text">
            <TextScramble text="CREATE." delay={200} />
          </span>
          <br />
          <span className="text-white">
            <TextScramble text="CONQUER." delay={400} />
          </span>
        </h2>
      </motion.div>

      {/* Code marquees */}
      <div className="space-y-4">
        {/* Row 1 - Left to Right */}
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-4"
            animate={{ x: [0, -1920] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: 'linear',
            }}
          >
            {row1Snippets.map((snippet, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-5 py-3 bg-[#111] border border-white/[0.06] rounded-lg font-mono text-sm whitespace-nowrap hover:border-[#ff6b35]/30 transition-colors duration-300"
              >
                <span style={{ color: snippet.color }}>$</span>
                <span className="text-[#909090] ml-2">{snippet.code}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-4"
            animate={{ x: [-1920, 0] }}
            transition={{ 
              duration: 35, 
              repeat: Infinity, 
              ease: 'linear',
            }}
          >
            {row2Snippets.map((snippet, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-5 py-3 bg-[#111] border border-white/[0.06] rounded-lg font-mono text-sm whitespace-nowrap hover:border-[#ff6b35]/30 transition-colors duration-300"
              >
                <span style={{ color: snippet.color }}>$</span>
                <span className="text-[#909090] ml-2">{snippet.code}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
