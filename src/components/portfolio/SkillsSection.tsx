import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import ScrollReveal from '@/components/animations/ScrollReveal';

const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  return (
    <section id="skills" className="py-20 px-4 border-t border-border/30">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="section-label mb-4 block">Expertise</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl font-light tracking-wide mb-6">Skills & Tools</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="divider mx-auto" />
          </ScrollReveal>
        </div>
        
        {/* Skills Grid */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span 
                key={skill}
                className="px-4 py-2 text-xs tracking-wider text-muted-foreground border border-border/50 hover:border-primary/50 hover:text-primary transition-all duration-500 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SkillsSection;
