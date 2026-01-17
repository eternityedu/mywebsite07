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
    <section id="resume" className="py-16 px-3 border-t border-border/30">
      <div className="w-full max-w-sm mx-auto text-center">
        <ScrollReveal>
          <span className="section-label mb-3 block">Career</span>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h2 className="text-xl font-light tracking-wide mb-4">Resume</h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="divider mx-auto mb-6" />
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
            {resume.description}
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.4}>
          {resume.file ? (
            <button
              onClick={handleDownload}
              className="btn-minimal mx-auto py-3 px-6 text-[10px]"
            >
              <Download className="w-3 h-3" />
              <span>Download CV</span>
            </button>
          ) : (
            <p className="text-[10px] text-muted-foreground italic">
              Resume available upon request
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ResumeSection;
