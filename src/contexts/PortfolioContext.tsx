import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    image: string;
  };
  about: {
    title: string;
    description: string;
    image: string;
  };
  projects: Project[];
  skills: string[];
  contact: {
    email: string;
    phone: string;
    location: string;
    social: {
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
  };
}

const defaultData: PortfolioData = {
  hero: {
    name: "John Doe",
    title: "Creative Developer",
    subtitle: "Crafting digital experiences with passion and precision",
    image: "",
  },
  about: {
    title: "About Me",
    description: "I'm a passionate developer with over 5 years of experience creating beautiful, functional, and user-friendly websites and applications. I specialize in modern web technologies and love bringing creative ideas to life through code.",
    image: "",
  },
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with seamless user experience",
      image: "",
      tags: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      id: "2",
      title: "Portfolio Dashboard",
      description: "Analytics dashboard for investment portfolios",
      image: "",
      tags: ["TypeScript", "D3.js", "PostgreSQL"],
      link: "#",
    },
    {
      id: "3",
      title: "Social Media App",
      description: "Connect and share with friends worldwide",
      image: "",
      tags: ["React Native", "Firebase", "Redux"],
      link: "#",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "MongoDB", "AWS", "Docker", "Figma", "Git"],
  contact: {
    email: "hello@johndoe.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
  },
};

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: Partial<PortfolioData>) => void;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : defaultData;
  });
  
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<PortfolioData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const login = (username: string, password: string): boolean => {
    // Credentials check - not visible in UI
    if (username === "Muralikanthan R" && password === "jackass") {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, isAdmin, login, logout }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
