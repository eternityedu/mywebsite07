import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { Json } from '@/integrations/supabase/types';

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
  updateData: (newData: Partial<PortfolioData>) => Promise<void>;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loading, setLoading] = useState(true);
  const { isAdmin, signOut, loading: authLoading } = useAuth();

  const fetchData = useCallback(async () => {
    try {
      const { data: rows, error } = await supabase
        .from('portfolio_data')
        .select('key, value');

      if (error) throw error;

      if (rows && rows.length > 0) {
        const merged = { ...defaultData };
        rows.forEach((row: { key: string; value: Json }) => {
          if (row.key in merged) {
            (merged as Record<string, unknown>)[row.key] = row.value;
          }
        });
        setData(merged);
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateData = async (newData: Partial<PortfolioData>) => {
    const updated = { ...data, ...newData };
    setData(updated);

    // Save to Supabase (only works for admins due to RLS)
    try {
      for (const [key, value] of Object.entries(newData)) {
        await supabase
          .from('portfolio_data')
          .upsert({ key, value: value as Json }, { onConflict: 'key' });
      }
    } catch (error) {
      console.error('Error saving to database:', error);
    }
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <PortfolioContext.Provider value={{ 
      data, 
      updateData, 
      isAdmin, 
      loading: loading || authLoading,
      logout 
    }}>
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
