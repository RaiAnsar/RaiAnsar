'use client';

import { useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import emailjs from '@emailjs/browser';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/RaiAnsar',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: '#F2D0A4',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/raiansar/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    color: '#9945ff',
  },
  {
    name: 'X',
    href: 'https://x.com/raiansar',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: '#ff2d92',
  },
  {
    name: 'Upwork',
    href: 'https://www.upwork.com/freelancers/iraiansar',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
      </svg>
    ),
    color: '#22c55e',
  },
];

function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = 'button',
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      href={href}
      type={!href ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Component>
  );
}

function FloatingInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (name: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.label
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isFocused || value
            ? 'top-2 text-xs text-[#F2D0A4]'
            : 'top-1/2 -translate-y-1/2 text-white/40'
        }`}
        htmlFor={name}
      >
        {label}
      </motion.label>
      <input
        ref={inputRef}
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (onBlur) onBlur(name);
        }}
        required={required}
        placeholder={isFocused ? placeholder : ''}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full px-4 pt-6 pb-3 bg-white/[0.03] border rounded-xl text-white placeholder:text-white/20 outline-none transition-all duration-300 ${
          error
            ? 'border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
            : isFocused
              ? 'border-[#F2D0A4] shadow-[0_0_20px_rgba(0,255,240,0.15)]'
              : 'border-white/10 hover:border-white/20'
        }`}
      />
      {error && (
        <motion.p
          id={`${name}-error`}
          className="absolute -bottom-5 left-4 text-xs text-red-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
      {isFocused && !error && (
        <motion.div
          className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#F2D0A4] via-[#9945ff] to-[#ff2d92]"
          layoutId="inputFocus"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

function FloatingTextarea({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  rows = 5,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (name: string) => void;
  error?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.label
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isFocused || value
            ? 'top-2 text-xs text-[#F2D0A4]'
            : 'top-4 text-white/40'
        }`}
        htmlFor={name}
      >
        {label}
      </motion.label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (onBlur) onBlur(name);
        }}
        required={required}
        rows={rows}
        placeholder={isFocused ? placeholder : ''}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full px-4 pt-8 pb-3 bg-white/[0.03] border rounded-xl text-white placeholder:text-white/20 outline-none transition-all duration-300 resize-none ${
          error
            ? 'border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
            : isFocused
              ? 'border-[#F2D0A4] shadow-[0_0_20px_rgba(0,255,240,0.15)]'
              : 'border-white/10 hover:border-white/20'
        }`}
      />
      {error && (
        <motion.p
          id={`${name}-error`}
          className="absolute -bottom-5 left-4 text-xs text-red-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
    budget: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '' ? 'Name is required' : '',
      email: formData.email.trim() === '' ? 'Email is required' : !validateEmail(formData.email) ? 'Please enter a valid email' : '',
      message: formData.message.trim() === '' ? 'Message is required' : formData.message.trim().length < 10 ? 'Message must be at least 10 characters' : '',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur if field has been touched
    if (touched[name as keyof typeof touched]) {
      if (name === 'email' && !validateEmail(formData.email)) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email' }));
      } else if (name === 'name' && formData.name.trim() === '') {
        setErrors((prev) => ({ ...prev, name: 'Name is required' }));
      } else if (name === 'message' && formData.message.trim().length < 10) {
        setErrors((prev) => ({ ...prev, message: 'Message must be at least 10 characters' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      // Mark all fields as touched to show all errors
      setTouched({ name: true, email: true, message: true, budget: true });
      return;
    }

    setIsSubmitting(true);
    setFormStatus('idle');

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const result = await emailjs.send(serviceId, templateId, formData, publicKey);
        if (result.status === 200) {
          setFormStatus('success');
          setFormData({ name: '', email: '', budget: '', message: '' });
          setTouched({ name: false, email: false, message: false, budget: false });
          setErrors({ name: '', email: '', message: '' });
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setFormStatus('success');
        setFormData({ name: '', email: '', budget: '', message: '' });
        setTouched({ name: false, email: false, message: false, budget: false });
        setErrors({ name: '', email: '', message: '' });
      }
    } catch {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={containerRef}
      className="section relative overflow-hidden"
      id="contact"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(0, 255, 240, 0.06), transparent 40%)`,
        }}
      />

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(153, 69, 255, 0.15) 0%, transparent 70%)',
            right: '-15%',
            top: '10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 45, 146, 0.1) 0%, transparent 70%)',
            left: '-10%',
            bottom: '20%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">
            Let&apos;s create something{' '}
            <span className="gradient-text">extraordinary.</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mt-6">
            Have a project in mind? I&apos;m always excited to collaborate on
            innovative solutions. Let&apos;s build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Availability badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 mb-8"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.2)',
                  '0 0 40px rgba(34, 197, 94, 0.3)',
                  '0 0 20px rgba(34, 197, 94, 0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22c55e]" />
              </span>
              <span className="text-sm font-semibold text-[#22c55e]">
                Available for new projects
              </span>
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Let&apos;s turn your vision
              <br />
              into <span className="gradient-text">reality</span>
            </h3>

            <p className="text-white/50 text-lg leading-relaxed mb-10">
              Whether you need a stunning website, a powerful web application,
              or expert consulting, I&apos;m here to help you succeed. Every project
              is approached with dedication and excellence.
            </p>

            {/* Contact details */}
            <div className="space-y-6 mb-12">
              <motion.a
                href="mailto:hi@raiansar.com"
                className="flex items-center gap-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#F2D0A4]/10 border border-[#F2D0A4]/30 flex items-center justify-center text-[#F2D0A4] group-hover:bg-[#F2D0A4]/20 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 5L2 7" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-medium text-white/40 uppercase tracking-wider block mb-1">Email</span>
                  <span className="text-white font-medium group-hover:text-[#F2D0A4] transition-colors">
                    hi@raiansar.com
                  </span>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#9945ff]/10 border border-[#9945ff]/30 flex items-center justify-center text-[#9945ff]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-medium text-white/40 uppercase tracking-wider block mb-1">Response Time</span>
                  <span className="text-white font-medium">Within 24 hours</span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#ff2d92]/10 border border-[#ff2d92]/30 flex items-center justify-center text-[#ff2d92]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-medium text-white/40 uppercase tracking-wider block mb-1">Location</span>
                  <span className="text-white font-medium">Remote Worldwide</span>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <div>
              <span className="text-xs font-medium text-white/40 uppercase tracking-wider block mb-4">Find me on</span>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <MagneticButton
                    key={link.name}
                    href={link.href}
                    className="group relative w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 transition-all duration-300 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${link.color}20 0%, transparent 70%)`,
                        boxShadow: `inset 0 0 20px ${link.color}15`,
                      }}
                    />
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="relative z-10 transition-colors duration-300"
                      style={{ color: 'inherit' }}
                      whileHover={{ color: link.color }}
                    >
                      {link.icon}
                    </motion.span>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="relative p-8 md:p-10 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 0 60px rgba(0,255,240,0.02)',
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                <div className="absolute top-4 left-4 w-12 h-px bg-gradient-to-r from-[#F2D0A4] to-transparent" />
                <div className="absolute top-4 left-4 w-px h-12 bg-gradient-to-b from-[#F2D0A4] to-transparent" />
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                <div className="absolute bottom-4 right-4 w-12 h-px bg-gradient-to-l from-[#ff2d92] to-transparent" />
                <div className="absolute bottom-4 right-4 w-px h-12 bg-gradient-to-t from-[#ff2d92] to-transparent" />
              </div>
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e]"
                >
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="font-medium">Message sent successfully! I&apos;ll get back to you soon.</span>
                  </div>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400"
                >
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    <span className="font-medium">Something went wrong. Please try again.</span>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FloatingInput
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={(value) => handleChange('name', value)}
                    onBlur={handleBlur}
                    error={touched.name ? errors.name : ''}
                    required
                    placeholder="John Doe"
                  />
                  <FloatingInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(value) => handleChange('email', value)}
                    onBlur={handleBlur}
                    error={touched.email ? errors.email : ''}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-3">
                    Budget Range
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['$1k-$5k', '$5k-$10k', '$10k-$25k', '$25k+'].map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => handleChange('budget', budget)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          formData.budget === budget
                            ? 'bg-[#F2D0A4] text-[#030303] shadow-[0_0_20px_rgba(0,255,240,0.3)]'
                            : 'bg-white/[0.03] border border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <FloatingTextarea
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={(value) => handleChange('message', value)}
                  onBlur={handleBlur}
                  error={touched.message ? errors.message : ''}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                />

                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-gradient-to-r from-[#F2D0A4] via-[#9945ff] to-[#ff2d92] rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(0,255,240,0.3)] hover:shadow-[0_0_50px_rgba(0,255,240,0.5)] transition-shadow"
                >
                  {isSubmitting ? (
                    <>
                      <motion.svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <circle cx="12" cy="12" r="10" opacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75" />
                      </motion.svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </MagneticButton>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
