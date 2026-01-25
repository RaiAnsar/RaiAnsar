'use client';

import Image from 'next/image';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/RaiAnsar', icon: '/images/svg/github.svg' },
  { name: 'X', href: 'https://x.com/raiansar', icon: '/images/svg/x.svg' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/raiansar/', icon: '/images/svg/linkedin.svg' },
  { name: 'Upwork', href: 'https://www.upwork.com/freelancers/iraiansar', icon: '/images/svg/upwork.svg' },
  { name: 'Fiverr', href: 'https://www.fiverr.com/raiansar', icon: '/images/svg/fiverr.svg' }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Logo */}
          <a href="#home" className="footer-logo">
            Rai Ansar
          </a>

          {/* Copyright */}
          <p className="footer-copyright">
            &copy; {currentYear} All rights reserved
          </p>

          {/* Social Links */}
          <div className="footer-social">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={link.name}
              >
                <Image
                  src={link.icon}
                  alt={link.name}
                  width={20}
                  height={20}
                  loading="lazy"
                  style={{ filter: 'invert(0.4)' }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
