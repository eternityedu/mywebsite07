import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import ScrollReveal from '@/components/animations/ScrollReveal';

const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  return (
    <section id="skills" className="py-32 md:py-40 border-t border-border/30">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="section-label mb-6 block">Expertise</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="section-heading mb-8">Skills & Tools</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="divider mx-auto" />
            </ScrollReveal>
          </div>
          
          {/* Skills Grid */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, index) => (
                <span 
                  key={skill}
                  className="px-6 py-3 text-sm tracking-wider text-muted-foreground border border-border/50 hover:border-primary/50 hover:text-primary transition-all duration-500 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
