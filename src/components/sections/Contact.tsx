'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TextScramble } from '@/components/ui/TextScramble';
import { Magnetic } from '@/components/ui/Magnetic';
import { GlowCard } from '@/components/ui/GlowCard';

const testimonials = [
  {
    quote: "Acefina reduced our infrastructure costs by 45% while improving performance. They delivered in 2 weeks what our team couldn't do in 6 months.",
    author: 'Sarah Chen',
    role: 'CTO, TechStart Inc',
  },
  {
    quote: "Our site went from 8 seconds to 1.2 seconds load time. Conversion rate jumped 30% the same month.",
    author: 'Marcus Rodriguez',
    role: 'CEO, GrowthLabs',
  },
  {
    quote: "No jargon, no excuses. They identified issues in our AWS setup that were costing us $4k/month unnecessarily.",
    author: 'Emily Thompson',
    role: 'Engineering Manager, CloudFlow',
  },
];

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden"
      id="contact"
      role="region"
      aria-label="Contact section"
    >
      {/* Solid background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      <div className="container relative z-10">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="inline-block text-[#ff6b35] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            <TextScramble text="// Contact" delay={0} />
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <TextScramble text="Let's build" delay={200} />
            <br />
            <span className="gradient-text">
              <TextScramble text="something great" delay={400} />
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-[#606060] max-w-xl mx-auto mb-10"
          >
            Book a free 15-minute call. No sales pitch — just honest advice on how we can help.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Magnetic strength={0.3}>
              <motion.a
                href="https://calendly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Book a Call</span>
              </motion.a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <motion.a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </motion.a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-[#505050] text-sm uppercase tracking-widest">Testimonials</span>
          </div>

          <Magnetic strength={0.03}>
            <GlowCard className="p-8 md:p-12 rounded-2xl text-center">
              <motion.p
                key={activeTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl md:text-2xl text-[#a0a0a0] leading-relaxed mb-8 italic"
              >
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </motion.p>
              <motion.div
                key={`author-${activeTestimonial}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="text-white font-semibold text-lg">{testimonials[activeTestimonial].author}</div>
                <div className="text-[#505050] text-sm">{testimonials[activeTestimonial].role}</div>
              </motion.div>
            </GlowCard>
          </Magnetic>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? 'w-8 bg-[#ff6b35]'
                    : 'bg-[#333] hover:bg-[#444]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
