import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Download } from 'lucide-react';

const ResumeSection: React.FC = () => {
  const { data } = usePortfolio();
  const { resume } = data;

  const handleDownload = () => {
    if (resume.file) {
      const link = document.createElement('a');
      link.href = resume.file;
      link.download = resume.filename || 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section id="resume" className="py-20 px-4 border-t border-border/30">
      <div className="max-w-md mx-auto text-center">
        <ScrollReveal>
          <span className="section-label mb-4 block">Career</span>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h2 className="text-2xl font-light tracking-wide mb-6">Resume</h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="divider mx-auto mb-8" />
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            {resume.description}
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.4}>
          {resume.file ? (
            <button
              onClick={handleDownload}
              className="btn-minimal mx-auto"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </button>
          ) : (
            <p className="text-xs text-muted-foreground italic">
              Resume available upon request
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ResumeSection;
