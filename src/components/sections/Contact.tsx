'use client';

import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { TextScramble } from '@/components/ui/TextScramble';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/RaiAnsar', icon: '/images/svg/github.svg' },
  { name: 'X', href: 'https://x.com/raiansar', icon: '/images/svg/x.svg' },
  { name: 'Upwork', href: 'https://www.upwork.com/freelancers/iraiansar', icon: '/images/svg/upwork.svg' },
  { name: 'Fiverr', href: 'https://www.fiverr.com/raiansar', icon: '/images/svg/fiverr.svg' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/raiansar/', icon: '/images/svg/linkedin.svg' },
];

function formatBudget(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  }
  return `$${value}`;
}

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget: 5000,
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'budget' ? Number(value) : value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      await Promise.race([
        emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            budget: formatBudget(formData.budget),
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        ),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), 10000)
        ),
      ]);

      setStatus('success');
      setFormData({ name: '', email: '', message: '', budget: 5000 });

      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const getInputClasses = (hasError: boolean) =>
    `w-full bg-[#161616] border ${hasError ? 'border-red-500/60' : 'border-[#2a2a2a]'} rounded-xl px-5 py-4 text-white placeholder-[#6b6b6b] text-sm outline-none transition-all duration-300 focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/30`;

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden"
      id="contact"
      role="region"
      aria-label="Contact section"
    >
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ff6b35]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-[#ff6b35] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            <TextScramble text="// Contact" delay={0} />
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <TextScramble text="Let's Work" delay={200} />
            <br />
            <span className="gradient-text">
              <TextScramble text="Together" delay={400} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-[#a0a0a0] max-w-xl mx-auto"
          >
            Have a project in mind? Let&apos;s discuss how I can help bring your
            vision to life.
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-5xl mx-auto"
        >
          {/* Left Column: Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm text-[#a0a0a0] mb-2 tracking-wide"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={getInputClasses(!!errors.name)}
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm text-[#a0a0a0] mb-2 tracking-wide"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={getInputClasses(!!errors.email)}
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm text-[#a0a0a0] mb-2 tracking-wide"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`${getInputClasses(!!errors.message)} resize-none`}
                />
                {errors.message && (
                  <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Budget Range */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="contact-budget"
                    className="block text-sm text-[#a0a0a0] tracking-wide"
                  >
                    Budget Range
                  </label>
                  <span className="text-sm font-semibold text-[#ff6b35]">
                    {formatBudget(formData.budget)}
                  </span>
                </div>
                <input
                  id="contact-budget"
                  type="range"
                  name="budget"
                  min={500}
                  max={25000}
                  step={500}
                  value={formData.budget}
                  onChange={handleChange}
                  aria-valuemin={500}
                  aria-valuemax={25000}
                  aria-valuenow={formData.budget}
                  aria-valuetext={formatBudget(formData.budget)}
                  className="w-full h-2 bg-[#2a2a2a] rounded-full appearance-none cursor-pointer accent-[#ff6b35] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff6b35] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,107,53,0.4)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#ff6b35] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-[#6b6b6b]">$500</span>
                  <span className="text-xs text-[#6b6b6b]">$25,000</span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#ff6b35] hover:bg-[#e55a28] disabled:bg-[#ff6b35]/60 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-300 flex items-center justify-center gap-3 text-sm tracking-wide uppercase cursor-pointer disabled:cursor-not-allowed"
                whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
              >
                {status === 'submitting' && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {status === 'idle' && 'Send Message'}
                {status === 'submitting' && 'Sending...'}
                {status === 'success' && 'Message Sent!'}
                {status === 'error' && 'Failed — Try Again'}
              </motion.button>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-green-400"
                >
                  Thanks for reaching out! I&apos;ll get back to you within 24
                  hours.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-red-400"
                >
                  Something went wrong. Please try again or reach out directly
                  via email.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Right Column: Info + Social */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 flex flex-col gap-10"
          >
            {/* Quick Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Get in touch
                </h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">
                  Whether you need a full website, a landing page, or technical
                  consulting, I&apos;m here to help. Drop me a message and
                  I&apos;ll respond within 24 hours.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#161616] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-[#ff6b35]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b6b6b] uppercase tracking-wider">
                      Email
                    </p>
                    <a
                      href="mailto:hello@raiansar.com"
                      className="text-sm text-white hover:text-[#ff6b35] transition-colors"
                    >
                      hello@raiansar.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#161616] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-[#ff6b35]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b6b6b] uppercase tracking-wider">
                      Based in
                    </p>
                    <p className="text-sm text-white">Pakistan</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#161616] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-[#ff6b35]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b6b6b] uppercase tracking-wider">
                      Availability
                    </p>
                    <p className="text-sm text-green-400">
                      Open for projects
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#2a2a2a]" />

            {/* Social Links */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                Find me on
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-3 hover:border-[#ff6b35]/40 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.08 }}
                    whileHover={{ y: -2 }}
                  >
                    <Image
                      src={link.icon}
                      alt={link.name}
                      width={18}
                      height={18}
                      className="invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="text-sm text-[#a0a0a0] group-hover:text-white transition-colors duration-300">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
