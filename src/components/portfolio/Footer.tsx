import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const { isAdmin, logout } = usePortfolio();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/auth');
    }
  };

  return (
    <footer className="py-6 px-3 border-t border-border/30">
      <div className="w-full max-w-sm mx-auto">
        <div className="flex flex-col items-center gap-3">
          <p className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground text-center">
            © {new Date().getFullYear()} All rights reserved
          </p>
          
          {/* Admin access - hidden gear icon */}
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <>
                <button
                  onClick={() => navigate('/admin')}
                  className="text-[8px] uppercase tracking-[0.15em] text-primary hover:text-primary/80 transition-colors"
                >
                  Dashboard
                </button>
                <span className="text-border text-xs">|</span>
                <button
                  onClick={logout}
                  className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleAdminClick}
                className="p-1.5 text-muted-foreground/10 hover:text-muted-foreground/30 transition-colors"
                aria-label="Admin access"
              >
                <Settings className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
