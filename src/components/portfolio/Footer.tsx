import React, { useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Settings } from 'lucide-react';
import AdminLogin from './AdminLogin';

const Footer: React.FC = () => {
  const { isAdmin, logout } = usePortfolio();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <footer className="py-12 border-t border-border/30">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved
            </p>
            
            {/* Hidden admin access */}
            <div className="flex items-center gap-6">
              {isAdmin ? (
                <div className="flex items-center gap-4">
                  <a 
                    href="/admin"
                    className="text-[11px] uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors"
                  >
                    Dashboard
                  </a>
                  <span className="text-border">|</span>
                  <button
                    onClick={logout}
                    className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="p-2 text-muted-foreground/20 hover:text-muted-foreground/50 transition-colors"
                  aria-label="Admin access"
                >
                  <Settings className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showLogin && <AdminLogin onClose={() => setShowLogin(false)} />}
    </footer>
  );
};

export default Footer;
