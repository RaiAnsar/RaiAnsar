'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusModal } from '@/components/ui/StatusModal';

interface StatusData {
  status: 'available' | 'away' | 'offline';
  idleMinutes: number;
}

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#skills', label: 'Skills' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [liveStatus, setLiveStatus] = useState<StatusData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch live status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status.json', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setLiveStatus(data);
        }
      } catch {
        // Fallback - no live status
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const statusLabel = liveStatus?.status === 'available'
    ? 'Available'
    : liveStatus?.status === 'away'
      ? 'Away'
      : 'Available';

  const statusColor = liveStatus?.status === 'available' || !liveStatus
    ? '#22c55e'
    : liveStatus?.status === 'away'
      ? '#eab308'
      : '#6b7280';

  const handleStatusClick = useCallback(() => {
    setStatusModalOpen(true);
  }, []);

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] as const }}
        role="banner"
      >
        <div className="container">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="relative z-10 group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
              aria-label="Rai Ansar - Home"
            >
              <span className="text-xl font-bold tracking-tight text-white">
                Rai<span className="text-[#ff6b35]">.</span>
              </span>
            </motion.a>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="header-nav-link hover-line text-sm"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Right side - Available Badge + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Live Availability Badge */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={handleStatusClick}
                aria-label="View availability status"
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: statusColor }}
                />
                <span className="text-white/80">{statusLabel}</span>
              </motion.button>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                className="btn-primary text-sm py-2.5 px-5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Book a call"
              >
                <span>Book a Call</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-transparent border-none outline-none focus:outline-none rounded-lg"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
            className="fixed inset-0 z-40 bg-[#0a0a0a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-3xl font-semibold text-white hover:text-[#ff6b35] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile availability badge */}
              <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-white/10 bg-white/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setStatusModalOpen(true);
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: statusColor }}
                />
                <span className="text-white/80">{statusLabel}</span>
              </motion.button>

              <motion.a
                href="#contact"
                className="mt-4 btn-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Book a Call</span>
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
