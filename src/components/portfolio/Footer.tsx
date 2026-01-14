import React, { useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Settings } from 'lucide-react';
import AdminLogin from './AdminLogin';

const Footer: React.FC = () => {
  const { isAdmin, logout } = usePortfolio();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            
            {/* Hidden admin access */}
            <div className="flex items-center gap-4">
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <a 
                    href="/admin"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Admin Dashboard
                  </a>
                  <span className="text-muted-foreground">|</span>
                  <button
                    onClick={logout}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="p-2 text-muted-foreground/30 hover:text-muted-foreground transition-colors"
                  aria-label="Admin access"
                >
                  <Settings className="w-4 h-4" />
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
