import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import ScrollReveal from '@/components/animations/ScrollReveal';

const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  return (
    <section id="skills" className="py-16 px-3 border-t border-border/30">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <ScrollReveal>
            <span className="section-label mb-3 block">Expertise</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-light tracking-wide mb-4">Skills & Tools</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="divider mx-auto" />
          </ScrollReveal>
        </div>
        
        {/* Skills Grid */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <span 
                key={skill}
                className="px-3 py-1.5 text-[10px] tracking-wider text-muted-foreground border border-border/50 hover:border-primary/50 hover:text-primary transition-all duration-500 cursor-default"
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
