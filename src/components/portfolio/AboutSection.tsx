import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import ScrollReveal from '@/components/animations/ScrollReveal';

// Helper function to convert long text to bullet points
const formatToBullets = (text: string): string[] => {
  // Split by newlines first, then by sentences if lines are too long
  const lines = text.split('\n').filter(line => line.trim());
  const bullets: string[] = [];
  
  lines.forEach(line => {
    // If line is longer than 80 chars, try to split by sentences
    if (line.length > 80) {
      const sentences = line.split(/(?<=[.!?])\s+/);
      sentences.forEach(s => {
        if (s.trim()) bullets.push(s.trim());
      });
    } else {
      bullets.push(line.trim());
    }
  });
  
  return bullets;
};

const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { about } = data;
  
  const descriptionBullets = formatToBullets(about.description);
  const showAsBullets = descriptionBullets.length > 1 && about.description.length > 150;

  return (
    <section id="about" className="py-16 px-3">
      <div className="w-full max-w-sm mx-auto">
        {/* Image */}
        <ScrollReveal className="mb-6">
          <div className="aspect-[4/5] overflow-hidden elegant-border">
            {about.image ? (
              <img 
                src={about.image} 
                alt="About"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                <span className="text-3xl opacity-20">✦</span>
              </div>
            )}
          </div>
        </ScrollReveal>
        
        {/* Content */}
        <div>
          <ScrollReveal>
            <span className="section-label mb-3 block">About</span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-light tracking-wide mb-4">
              {about.title}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="divider mb-4" />
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            {showAsBullets ? (
              <ul className="text-xs text-muted-foreground leading-relaxed space-y-2">
                {descriptionBullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                {about.description}
              </p>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
