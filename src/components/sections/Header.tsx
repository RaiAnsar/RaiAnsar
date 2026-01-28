'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const StatusModal = dynamic(() => import('../ui/StatusModal').then((mod) => ({ default: mod.StatusModal })), {
  ssr: false,
});

const navLinks = [
  { href: '#about', label: 'My Story' },
  { href: '#process', label: 'How I Work' },
  { href: '#services', label: 'Expertise' },
  { href: '#posts', label: 'Posts' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="container">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="relative z-10 group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="text-2xl font-black tracking-tight text-white">
                RAI
                <span className="gradient-text">.</span>
              </span>
            </motion.a>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="header-nav-link magnetic"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Right side - Available Badge + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Availability Badge - clickable to open status modal */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                onClick={() => setStatusModalOpen(true)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(0, 255, 240, 0.1)',
                  border: '1px solid rgba(0, 255, 240, 0.2)',
                }}
                whileHover={{
                  boxShadow: '0 0 20px rgba(0, 255, 240, 0.3)',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00fff0] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00fff0]"></span>
                </span>
                <span className="text-xs font-medium text-white/80">Available</span>
              </motion.button>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#030303] bg-[#00fff0] rounded-full magnetic"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(0, 255, 240, 0.4)',
                }}
              >
                <span>Let&apos;s Talk</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-transparent border-none outline-none"
              aria-label="Toggle menu"
              style={{ background: 'transparent' }}
            >
              <div className="relative w-6 h-4">
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-white rounded-full"
                  animate={{
                    top: mobileMenuOpen ? '50%' : '0%',
                    rotate: mobileMenuOpen ? 45 : 0,
                    translateY: mobileMenuOpen ? '-50%' : '0%',
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white rounded-full"
                  animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-white rounded-full"
                  animate={{
                    bottom: mobileMenuOpen ? '50%' : '0%',
                    rotate: mobileMenuOpen ? -45 : 0,
                    translateY: mobileMenuOpen ? '50%' : '0%',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#030303]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-4xl font-bold text-white hover:text-[#00fff0] transition-colors no-underline"
                  style={{ textDecoration: 'none' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              {/* Status button in mobile menu */}
              <motion.button
                className="flex items-center gap-3 px-6 py-3 text-lg font-medium text-white/80 hover:text-[#00fff0] transition-all rounded-full border-none outline-none"
                style={{
                  background: 'rgba(0, 255, 240, 0.08)',
                  border: '1px solid rgba(0, 255, 240, 0.2)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.45 }}
                whileHover={{
                  background: 'rgba(0, 255, 240, 0.15)',
                  boxShadow: '0 0 20px rgba(0, 255, 240, 0.2)',
                }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setStatusModalOpen(true);
                }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00fff0] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00fff0]"></span>
                </span>
                <span>Check Status</span>
              </motion.button>
              <motion.a
                href="#contact"
                className="mt-8 btn-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Let&apos;s Talk</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Modal */}
      <StatusModal isOpen={statusModalOpen} onClose={() => setStatusModalOpen(false)} />
    </>
  );
}
