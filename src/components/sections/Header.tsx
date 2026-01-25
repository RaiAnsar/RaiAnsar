'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <a href="#home" className="logo">
              Rai Ansar
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="menu-toggle md:hidden"
              aria-label="Toggle navigation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span style={{
                transform: isMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none'
              }} />
              <span style={{
                opacity: isMenuOpen ? 0 : 1
              }} />
              <span style={{
                transform: isMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none'
              }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <button
          className="absolute top-6 right-6 menu-toggle"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
        >
          <span style={{ transform: 'rotate(45deg) translateY(7px)' }} />
          <span style={{ opacity: 0 }} />
          <span style={{ transform: 'rotate(-45deg) translateY(-7px)' }} />
        </button>

        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className="nav-link"
            onClick={handleNavClick}
            style={{
              animationDelay: isMenuOpen ? `${index * 0.1}s` : '0s',
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
