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
  resume: {
    description: string;
    file: string;
    filename: string;
  };
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

export const defaultData: PortfolioData = {
  hero: {
    name: "John Doe",
    title: "Creative Developer & Designer",
    subtitle: "Crafting minimal, elegant digital experiences with attention to detail and a passion for clean aesthetics.",
    image: "",
  },
  about: {
    title: "Blending creativity with precision",
    description: "With over 5 years of experience in digital design and development, I specialize in creating thoughtful, user-centered experiences that balance aesthetics with functionality.\n\nMy approach is rooted in simplicity—removing the unnecessary to highlight what truly matters. Every project is an opportunity to solve problems elegantly while pushing creative boundaries.",
    image: "",
  },
  projects: [
    {
      id: "1",
      title: "Minimal Commerce",
      description: "A refined e-commerce experience focusing on product presentation and seamless user journeys",
      image: "",
      tags: ["React", "Node.js", "Stripe"],
      link: "#",
    },
    {
      id: "2",
      title: "Analytics Dashboard",
      description: "Data visualization platform with emphasis on clarity and actionable insights",
      image: "",
      tags: ["TypeScript", "D3.js", "PostgreSQL"],
      link: "#",
    },
    {
      id: "3",
      title: "Creative Portfolio",
      description: "Bespoke portfolio showcasing architectural photography with immersive galleries",
      image: "",
      tags: ["Next.js", "Framer Motion", "Sanity"],
      link: "#",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Figma", "Framer", "Three.js", "Docker"],
  resume: {
    description: "Download my resume to explore my professional journey, education, and the projects that have shaped my expertise.",
    file: "",
    filename: "",
  },
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
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultData, ...parsed };
    }
    return defaultData;
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
