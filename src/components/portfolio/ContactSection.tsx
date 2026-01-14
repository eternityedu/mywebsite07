import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Mail, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const { contact } = data;

  return (
    <section id="contact" className="py-32 md:py-40 border-t border-border/30">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <ScrollReveal>
            <span className="section-label mb-6 block">Contact</span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="section-heading mb-8">Let's Connect</h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="divider mx-auto mb-12" />
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <p className="text-muted-foreground leading-relaxed mb-12 max-w-xl mx-auto">
              Interested in working together? I'd love to hear from you.
            </p>
          </ScrollReveal>
          
          {/* Email CTA */}
          <ScrollReveal delay={0.4}>
            <a 
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-3 text-2xl md:text-3xl font-light tracking-wide text-primary hover:opacity-70 transition-opacity duration-300 mb-16"
            >
              <Mail className="w-6 h-6" />
              {contact.email}
            </a>
          </ScrollReveal>
          
          {/* Details */}
          <ScrollReveal delay={0.5}>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground mb-12">
              <span>{contact.phone}</span>
              <span className="hidden sm:block">·</span>
              <span>{contact.location}</span>
            </div>
          </ScrollReveal>
          
          {/* Social Links */}
          <ScrollReveal delay={0.6}>
            <div className="flex justify-center gap-8">
              {contact.social.linkedin && (
                <a 
                  href={contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 link-underline inline-flex items-center gap-1"
                >
                  LinkedIn
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {contact.social.github && (
                <a 
                  href={contact.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 link-underline inline-flex items-center gap-1"
                >
                  GitHub
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {contact.social.twitter && (
                <a 
                  href={contact.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 link-underline inline-flex items-center gap-1"
                >
                  Twitter
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
