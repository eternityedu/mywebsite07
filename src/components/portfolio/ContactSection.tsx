import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const { contact } = data;

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">
              Get In Touch
            </span>
            <h2 className="section-heading font-serif mb-6">
              Let's Work Together
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-gold-light mx-auto mb-8" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can bring your ideas to life.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a 
              href={`mailto:${contact.email}`}
              className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border hover:border-primary transition-all duration-300 group card-hover"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground mb-1">Email</span>
              <span className="font-medium text-foreground">{contact.email}</span>
            </a>
            
            <a 
              href={`tel:${contact.phone}`}
              className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border hover:border-primary transition-all duration-300 group card-hover"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground mb-1">Phone</span>
              <span className="font-medium text-foreground">{contact.phone}</span>
            </a>
            
            <div className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground mb-1">Location</span>
              <span className="font-medium text-foreground">{contact.location}</span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {contact.social.linkedin && (
              <a 
                href={contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {contact.social.github && (
              <a 
                href={contact.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {contact.social.twitter && (
              <a 
                href={contact.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
