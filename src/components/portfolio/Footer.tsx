import React, { useState } from 'react';
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
    <footer className="py-8 px-4 border-t border-border/30">
      <div className="max-w-md mx-auto">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center">
            © {new Date().getFullYear()} All rights reserved
          </p>
          
          {/* Admin access */}
          <div className="flex items-center gap-4">
            {isAdmin ? (
              <>
                <button
                  onClick={() => navigate('/admin')}
                  className="text-[10px] uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors"
                >
                  Dashboard
                </button>
                <span className="text-border">|</span>
                <button
                  onClick={logout}
                  className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleAdminClick}
                className="p-2 text-muted-foreground/20 hover:text-muted-foreground/50 transition-colors"
                aria-label="Admin access"
              >
                <Settings className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
