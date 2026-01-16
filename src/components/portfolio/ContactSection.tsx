import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const { contact } = data;

  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
  };

  return (
    <section id="contact" className="py-20 px-4 border-t border-border/30">
      <div className="max-w-md mx-auto text-center">
        <ScrollReveal>
          <span className="section-label mb-4 block">Connect</span>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h2 className="text-2xl font-light tracking-wide mb-6">Get in Touch</h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="divider mx-auto mb-8" />
        </ScrollReveal>
        
        {/* Email CTA */}
        <ScrollReveal delay={0.3}>
          <a 
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-3 text-lg text-foreground hover:text-primary transition-colors mb-8"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">{contact.email}</span>
          </a>
        </ScrollReveal>
        
        {/* Contact Details */}
        <ScrollReveal delay={0.4}>
          <div className="space-y-4 mb-10">
            {contact.phone && (
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Phone className="w-3 h-3" />
                <span className="text-xs">{contact.phone}</span>
              </div>
            )}
            {contact.location && (
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">{contact.location}</span>
              </div>
            )}
          </div>
        </ScrollReveal>
        
        {/* Social Links */}
        <ScrollReveal delay={0.5}>
          <div className="flex justify-center gap-6">
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
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={key}
                >
                  <Icon className="w-4 h-4" />
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
