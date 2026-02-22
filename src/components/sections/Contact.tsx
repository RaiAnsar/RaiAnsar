'use client';

import { useRef, useState, FormEvent } from 'react';
import { useInView } from '@/hooks/useInView';
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
  const [containerRef, isInView] = useInView<HTMLElement>({ threshold: 0.15, once: true });
  const formRef = useRef<HTMLFormElement>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const getInputClasses = (hasError: boolean) =>
    `w-full bg-[#111827] border ${hasError ? 'border-red-500/60' : 'border-[#374151]'} rounded-xl px-5 py-4 text-white placeholder-[#6b7280] text-sm outline-none transition-all duration-300 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]/30`;

  const anim = (delay = 0, y = 20): React.CSSProperties => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'none' : `translateY(${y}px)`,
    transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
  });

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 bg-[#030712] overflow-hidden"
      id="contact"
      role="region"
      aria-label="Contact section"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#38bdf8]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20" style={anim(0, 40)}>
          <span className="inline-block text-[#38bdf8] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            <TextScramble text="// Contact" delay={0} />
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
            <TextScramble text="Let's Work" delay={200} />
            <br />
            <span className="gradient-text">
              <TextScramble text="Together" delay={400} />
            </span>
          </h2>

          <p className="text-lg text-[#9ca3af] max-w-xl mx-auto" style={anim(0.6, 20)}>
            Have a project in mind? Let&apos;s discuss how I can help bring your vision to life.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Left Column: Form */}
          <div className="lg:col-span-3" style={anim(0.2, 30)}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm text-[#9ca3af] mb-2 tracking-wide">
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
                <label htmlFor="contact-email" className="block text-sm text-[#9ca3af] mb-2 tracking-wide">
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
                <label htmlFor="contact-message" className="block text-sm text-[#9ca3af] mb-2 tracking-wide">
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
                  <label htmlFor="contact-budget" className="block text-sm text-[#9ca3af] tracking-wide">
                    Budget Range
                  </label>
                  <span className="text-sm font-semibold text-[#38bdf8]">
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
                  className="w-full h-2 bg-[#374151] rounded-full appearance-none cursor-pointer accent-[#38bdf8] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#38bdf8] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(56,189,248,0.4)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#38bdf8] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-[#6b7280]">$500</span>
                  <span className="text-xs text-[#6b7280]">$25,000</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] hover:scale-[1.02] active:scale-[0.98] disabled:bg-[#38bdf8]/60 disabled:scale-100 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-sm tracking-wide cursor-pointer disabled:cursor-not-allowed"
              >
                {status === 'submitting' && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {status === 'idle' && 'Send Message'}
                {status === 'submitting' && 'Sending...'}
                {status === 'success' && 'Message Sent!'}
                {status === 'error' && 'Failed — Try Again'}
              </button>

              {/* Status Messages */}
              {(status === 'success' || status === 'error') && (
                <p
                  className="text-center text-sm"
                  style={{
                    color: status === 'success' ? '#4ade80' : '#f87171',
                    animation: 'fadeInUp 0.3s ease',
                  }}
                >
                  {status === 'success'
                    ? "Thanks for reaching out! I'll get back to you within 24 hours."
                    : 'Something went wrong. Please try again or reach out directly via email.'}
                </p>
              )}
            </form>
          </div>

          {/* Right Column: Info + Social */}
          <div className="lg:col-span-2 flex flex-col gap-10" style={anim(0.3, 30)}>
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Get in touch</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed">
                  Whether you need a full website, a landing page, or technical consulting, I&apos;m here to help.
                  Drop me a message and I&apos;ll respond within 24 hours.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#111827] border border-[#374151] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280] uppercase tracking-wider">Email</p>
                    <a href="mailto:hello@raiansar.com" className="text-sm text-white hover:text-[#38bdf8] transition-colors">
                      hello@raiansar.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#111827] border border-[#374151] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280] uppercase tracking-wider">Based in</p>
                    <p className="text-sm text-white">Pakistan</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#111827] border border-[#374151] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280] uppercase tracking-wider">Availability</p>
                    <p className="text-sm text-green-400">Open for projects</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#374151]" />

            {/* Social Links */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                Find me on
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 hover:border-[#38bdf8]/40 hover:-translate-y-0.5 transition-all duration-300"
                    style={anim(0.8 + index * 0.08)}
                  >
                    <Image
                      src={link.icon}
                      alt={link.name}
                      width={18}
                      height={18}
                      className="invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="text-sm text-[#9ca3af] group-hover:text-white transition-colors duration-300">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
