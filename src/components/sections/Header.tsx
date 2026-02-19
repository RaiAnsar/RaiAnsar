'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy-load StatusModal — only needed when user clicks status badge
const StatusModal = dynamic(
  () => import('@/components/ui/StatusModal').then((mod) => ({ default: mod.StatusModal })),
  { ssr: false }
);

interface StatusData {
  status: 'available' | 'away' | 'offline';
  idleMinutes: number;
  updatedAt?: number;
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

  const isStale = liveStatus?.updatedAt
    ? Date.now() - liveStatus.updatedAt > 5 * 60 * 1000
    : false;

  const effectiveStatus = isStale ? 'offline' : (liveStatus?.status ?? 'available');

  const statusLabel = effectiveStatus === 'available' ? 'Available'
    : effectiveStatus === 'away' ? 'Away'
    : effectiveStatus === 'offline' ? 'Offline'
    : 'Available';

  const statusColor = effectiveStatus === 'available' ? '#22c55e'
    : effectiveStatus === 'away' ? '#eab308'
    : '#6b7280';

  const handleStatusClick = useCallback(() => {
    setStatusModalOpen(true);
  }, []);

  return (
    <>
      <header
        className={`header header-anim-slidedown ${scrolled ? 'scrolled' : ''}`}
        role="banner"
      >
        <div className="container">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="relative z-10 group hover:scale-[1.02] transition-transform duration-200"
              aria-label="Rai Ansar - Home"
            >
              <span className="text-xl font-bold tracking-tight text-white">
                Rai<span className="text-[#ff6b35]">.</span>
              </span>
            </a>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="header-nav-link hover-line text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right side - Available Badge + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Live Availability Badge */}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={handleStatusClick}
                aria-label="View availability status"
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: statusColor }}
                />
                <span className="text-white/80">{statusLabel}</span>
              </button>

              {/* CTA Button */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-full bg-[#ff6b35] text-white hover:bg-[#ff8555] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                aria-label="Book a call"
              >
                Book a Call
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-transparent border-none outline-none focus:outline-none rounded-lg"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-4">
                <span
                  className="absolute left-0 w-full h-0.5 bg-white rounded-full transition-all duration-300"
                  style={{
                    top: mobileMenuOpen ? '50%' : '0%',
                    transform: mobileMenuOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
                  }}
                />
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white rounded-full transition-opacity duration-300"
                  style={{ opacity: mobileMenuOpen ? 0 : 1 }}
                />
                <span
                  className="absolute left-0 w-full h-0.5 bg-white rounded-full transition-all duration-300"
                  style={{
                    bottom: mobileMenuOpen ? '50%' : '0%',
                    transform: mobileMenuOpen ? 'translateY(50%) rotate(-45deg)' : 'none',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role={mobileMenuOpen ? 'dialog' : undefined}
        aria-modal={mobileMenuOpen ? 'true' : undefined}
        aria-hidden={!mobileMenuOpen}
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="text-3xl font-semibold text-white hover:text-[#ff6b35] transition-colors"
              style={{
                transitionProperty: 'opacity, transform, color',
                transitionDuration: '0.3s',
                transitionDelay: mobileMenuOpen ? `${0.1 * index}s` : '0s',
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile availability badge */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-white/10 bg-white/5"
            style={{
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.3s',
              transitionDelay: mobileMenuOpen ? '0.7s' : '0s',
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
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
          </button>

          <a
            href="#contact"
            className="mt-4 btn-primary"
            style={{
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.3s',
              transitionDelay: mobileMenuOpen ? '0.8s' : '0s',
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Book a Call</span>
          </a>
        </div>
      </div>

      {/* Status Modal — lazy loaded */}
      <StatusModal isOpen={statusModalOpen} onClose={() => setStatusModalOpen(false)} />
    </>
  );
}
