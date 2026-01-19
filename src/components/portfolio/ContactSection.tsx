import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ContactForm from './ContactForm';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const { contact } = data;

  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
  };

  return (
    <section id="contact" className="py-12 px-3 border-t border-border/30">
      <div className="w-full max-w-sm mx-auto text-center">
        <ScrollReveal>
          <span className="section-label mb-3 block">Connect</span>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h2 className="text-lg font-light tracking-wide mb-4">Get in Touch</h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="divider mx-auto mb-6" />
        </ScrollReveal>
        
        {/* Contact Form */}
        <ScrollReveal delay={0.25}>
          <div className="mb-8">
            <ContactForm />
          </div>
        </ScrollReveal>
        
        {/* Email CTA */}
        <ScrollReveal delay={0.3}>
          <a 
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-4"
          >
            <Mail className="w-3 h-3" />
            <span className="text-xs">{contact.email}</span>
          </a>
        </ScrollReveal>
        
        {/* Contact Details */}
        <ScrollReveal delay={0.4}>
          <div className="space-y-2 mb-6">
            {contact.phone && (
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Phone className="w-2.5 h-2.5" />
                <span className="text-[10px]">{contact.phone}</span>
              </div>
            )}
            {contact.location && (
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="w-2.5 h-2.5" />
                <span className="text-[10px]">{contact.location}</span>
              </div>
            )}
          </div>
        </ScrollReveal>
        
        {/* Social Links */}
        <ScrollReveal delay={0.5}>
          <div className="flex justify-center gap-4">
            {Object.entries(contact.social).map(([key, url]) => {
              if (!url) return null;
              const Icon = socialIcons[key as keyof typeof socialIcons];
              if (!Icon) return null;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={key}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
