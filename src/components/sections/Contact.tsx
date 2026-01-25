'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { Button, Card, TextField, Label, Input, TextArea, Slider, Select, ListBox, FieldError } from '@heroui/react';
import { serviceOptions } from '@/data/services';
import Image from 'next/image';

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service_category: '',
    service_subcategory: '',
    budget: 5000,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'service_category') {
      setFormData(prev => ({
        ...prev,
        service_subcategory: ''
      }));
    }
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
          { ...formData, budget: `$${formData.budget}` },
          publicKey
        );

        if (result.status === 200) {
          setFormMessage("Thank you for your message! I'll get back to you within 12 hours.");
          setMessageType('success');
          setFormData({
            name: '',
            email: '',
            service_category: '',
            service_subcategory: '',
            budget: 5000,
            message: ''
          });
        }
      } else {
        // Fallback for demo
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormMessage("Thank you for your message! I'll get back to you within 12 hours.");
        setMessageType('success');
      }
    } catch {
      setFormMessage('Sorry, there was an error sending your message. Please try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/RaiAnsar', icon: '/images/svg/github.svg' },
    { name: 'X', href: 'https://x.com/raiansar', icon: '/images/svg/x.svg' },
    { name: 'Upwork', href: 'https://www.upwork.com/freelancers/iraiansar', icon: '/images/svg/upwork.svg' },
    { name: 'Fiverr', href: 'https://www.fiverr.com/raiansar', icon: '/images/svg/fiverr.svg' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/raiansar/', icon: '/images/svg/linkedin.svg' }
  ];

  return (
    <section id="contact" className="py-24 bg-surface" ref={ref}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          Contact Me
        </h2>
        <p
          className={`text-muted text-center mb-12 transition-all duration-600 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          Let&apos;s discuss your project needs
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-600 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <Card variant="secondary">
              <Card.Header>
                <Card.Title>Let&apos;s Work Together</Card.Title>
              </Card.Header>
              <Card.Content>
                {formMessage && (
                  <div className={`p-4 rounded-lg mb-6 ${
                    messageType === 'success'
                      ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                      : 'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                    {formMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                <TextField name="name" isRequired>
                  <Label>Your Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  <FieldError />
                </TextField>

                <TextField name="email" type="email" isRequired>
                  <Label>Your Email</Label>
                  <Input
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  <FieldError />
                </TextField>

                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    className="w-full"
                    placeholder="Select service category"
                    value={formData.service_category}
                    onChange={(value) => handleChange('service_category', value as string)}
                  >
                    <Label>Service Category</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {Object.keys(serviceOptions).map((category) => (
                          <ListBox.Item key={category} id={category} textValue={category}>
                            {category}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <Select
                    className="w-full"
                    placeholder="Select specific service"
                    isDisabled={!formData.service_category}
                    value={formData.service_subcategory}
                    onChange={(value) => handleChange('service_subcategory', value as string)}
                  >
                    <Label>Specific Service</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {formData.service_category &&
                          serviceOptions[formData.service_category as keyof typeof serviceOptions]?.map((service) => (
                            <ListBox.Item key={service} id={service} textValue={service}>
                              {service}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))
                        }
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div>
                  <Slider
                    className="w-full"
                    defaultValue={formData.budget}
                    minValue={100}
                    maxValue={20000}
                    step={100}
                    onChange={(value) => handleChange('budget', value as number)}
                    formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <Label>Budget Range</Label>
                      <Slider.Output />
                    </div>
                    <Slider.Track>
                      <Slider.Fill />
                      <Slider.Thumb />
                    </Slider.Track>
                  </Slider>
                  <div className="flex justify-between text-xs text-muted mt-1">
                    <span>$100</span>
                    <span>$20,000+</span>
                  </div>
                </div>

                <TextField name="message" isRequired>
                  <Label>Your Message</Label>
                  <TextArea
                    placeholder="Tell me about your project..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />
                  <FieldError />
                </TextField>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Get a Free Consultation'}
                </Button>
                </form>
              </Card.Content>
            </Card>
          </div>

          {/* Contact Info */}
          <div
            className={`flex flex-col gap-6 transition-all duration-600 delay-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <Card variant="secondary">
              <Card.Header>
                <Card.Title>Contact Info</Card.Title>
                <Card.Description>
                  Feel free to reach out through any of these channels. I typically respond within 12 hours
                  and am available for WordPress, React, and server management projects.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-10 5L2 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a
                        href="mailto:hi@raiansar.com"
                        className="text-accent hover:underline"
                      >
                        hi@raiansar.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <span className="text-muted">Available for remote work worldwide</span>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>

            <Card variant="secondary">
              <Card.Header>
                <Card.Title className="text-base">Connect with me on these platforms</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-default flex items-center justify-center hover:bg-accent/10 hover:scale-110 transition-all duration-300"
                      aria-label={`${link.name} Profile`}
                    >
                      <Image
                        src={link.icon}
                        alt={link.name}
                        width={24}
                        height={24}
                        className="dark:invert"
                      />
                    </a>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
