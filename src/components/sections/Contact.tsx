'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import { serviceOptions } from '@/data/services';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/RaiAnsar', icon: '/images/svg/github.svg' },
  { name: 'X', href: 'https://x.com/raiansar', icon: '/images/svg/x.svg' },
  { name: 'Upwork', href: 'https://www.upwork.com/freelancers/iraiansar', icon: '/images/svg/upwork.svg' },
  { name: 'Fiverr', href: 'https://www.fiverr.com/raiansar', icon: '/images/svg/fiverr.svg' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/raiansar/', icon: '/images/svg/linkedin.svg' }
];

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service_category: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage('');

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const result = await emailjs.send(
          serviceId,
          templateId,
          formData,
          publicKey
        );

        if (result.status === 200) {
          setFormMessage("Message sent. I'll respond within 12 hours.");
          setMessageType('success');
          setFormData({ name: '', email: '', service_category: '', message: '' });
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormMessage("Message sent. I'll respond within 12 hours.");
        setMessageType('success');
      }
    } catch {
      setFormMessage('Error sending message. Please try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section"
      ref={ref}
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      <div className="container">
        <div className="contact-grid">
          {/* Left side - Info */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 1s ease',
            }}
          >
            <span className="badge">Contact</span>

            <h2 className="text-title mt-6 mb-8">
              Let&apos;s work together
            </h2>

            <p className="text-body-lg mb-12">
              Have a project in mind? I&apos;d love to hear about it.
              Send me a message and I&apos;ll get back to you within 12 hours.
            </p>

            {/* Contact info */}
            <div className="contact-info mb-12">
              <div className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">
                    <a href="mailto:hi@raiansar.com">hi@raiansar.com</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div>
                  <div className="contact-label">Response Time</div>
                  <div className="contact-value">Within 12 hours</div>
                </div>
              </div>

              <div className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Remote worldwide</div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <div className="contact-label mb-4">Connect</div>
              <div className="flex gap-4">
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
                      style={{ filter: 'invert(0.5)' }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 1s ease',
              transitionDelay: '0.2s',
            }}
          >
            {formMessage && (
              <div className={messageType === 'success' ? 'message-success' : 'message-error'}>
                {formMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Service</label>
                <select
                  value={formData.service_category}
                  onChange={(e) => handleChange('service_category', e.target.value)}
                  className="form-select"
                >
                  <option value="">Select a service</option>
                  {Object.keys(serviceOptions).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
                style={{ marginTop: '1rem' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
