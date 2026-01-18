import React, { useState, useEffect } from 'react';
import { usePortfolio, Project } from '@/contexts/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, User, Briefcase, Code, Mail, FileText, BookOpen, Link as LinkIcon, MessageSquare } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import FileUpload from '@/components/admin/FileUpload';
import BlogManager from '@/components/admin/BlogManager';
import SocialLinksManager from '@/components/admin/SocialLinksManager';
import MessagesManager from '@/components/admin/MessagesManager';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';

const Admin: React.FC = () => {
  const { data, updateData, loading } = usePortfolio();
  const { isAdmin, loading: authLoading } = useSimpleAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [localData, setLocalData] = useState(data);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/auth');
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleSave = () => {
    updateData(localData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateHero = (key: string, value: string) => {
    setLocalData(prev => ({
      ...prev,
      hero: { ...prev.hero, [key]: value }
    }));
  };

  const updateAbout = (key: string, value: string) => {
    setLocalData(prev => ({
      ...prev,
      about: { ...prev.about, [key]: value }
    }));
  };

  const updateContact = (key: string, value: string) => {
    setLocalData(prev => ({
      ...prev,
      contact: { ...prev.contact, [key]: value }
    }));
  };

  const updateSocial = (key: string, value: string) => {
    setLocalData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        social: { ...prev.contact.social, [key]: value }
      }
    }));
  };

  const updateResume = (key: string, value: string) => {
    setLocalData(prev => ({
      ...prev,
      resume: { ...prev.resume, [key]: value }
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      image: '',
      tags: ['Tag'],
      link: '',
    };
    setLocalData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, key: string, value: string | string[]) => {
    setLocalData(prev => ({
      ...prev,
      projects: prev.projects.map(p => 
        p.id === id ? { ...p, [key]: value } : p
      )
    }));
  };

  const deleteProject = (id: string) => {
    setLocalData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const updateSkills = (value: string) => {
    const skills = value.split(',').map(s => s.trim()).filter(Boolean);
    setLocalData(prev => ({ ...prev, skills }));
  };

  const tabs = [
    { id: 'hero', label: 'Hero', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'links', label: 'Links', icon: LinkIcon },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  if (!isAdmin || authLoading) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="container px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            <span className="section-label">Dashboard</span>
            
            <button
              onClick={handleSave}
              className="btn-minimal py-2 px-3 sm:px-4"
            >
              <Save className="w-3 h-3" />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Sidebar - horizontal scroll on mobile */}
          <aside className="lg:w-48 shrink-0 -mx-4 sm:mx-0">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible px-4 sm:px-0 pb-4 lg:pb-0">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'text-primary lg:border-l lg:border-primary bg-primary/5 lg:bg-transparent rounded lg:rounded-none' 
                      : 'text-muted-foreground hover:text-foreground lg:border-l lg:border-transparent'
                  }`}
                >
                  <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 max-w-2xl">
            {/* Hero Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <span className="section-label mb-2 block">Hero Section</span>
                  <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Main Introduction</h2>
                </div>
                
                <ImageUpload
                  value={localData.hero.image}
                  onChange={(v) => updateHero('image', v)}
                  label="Profile Image"
                />
                
                <div>
                  <label className="section-label block mb-3">Name</label>
                  <input
                    type="text"
                    value={localData.hero.name}
                    onChange={(e) => updateHero('name', e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors text-base sm:text-lg"
                  />
                </div>
                
                <div>
                  <label className="section-label block mb-3">Title</label>
                  <input
                    type="text"
                    value={localData.hero.title}
                    onChange={(e) => updateHero('title', e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="section-label block mb-3">Subtitle</label>
                  <textarea
                    value={localData.hero.subtitle}
                    onChange={(e) => updateHero('subtitle', e.target.value)}
                    rows={3}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <span className="section-label mb-2 block">About Section</span>
                  <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Your Story</h2>
                </div>
                
                <ImageUpload
                  value={localData.about.image}
                  onChange={(v) => updateAbout('image', v)}
                  label="About Image"
                />
                
                <div>
                  <label className="section-label block mb-3">Heading</label>
                  <input
                    type="text"
                    value={localData.about.title}
                    onChange={(e) => updateAbout('title', e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors text-base sm:text-lg"
                  />
                </div>
                
                <div>
                  <label className="section-label block mb-3">Description</label>
                  <textarea
                    value={localData.about.description}
                    onChange={(e) => updateAbout('description', e.target.value)}
                    rows={8}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors resize-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="section-label mb-2 block">Projects Section</span>
                    <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Your Work</h2>
                  </div>
                  <button
                    onClick={addProject}
                    className="btn-minimal py-2 px-3 sm:px-4"
                  >
                    <Plus className="w-3 h-3" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  {localData.projects.map((project, index) => (
                    <div key={project.id} className="p-4 sm:p-6 border border-border/50 space-y-4 sm:space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="section-label">Project {index + 1}</span>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <ImageUpload
                        value={project.image}
                        onChange={(v) => updateProject(project.id, 'image', v)}
                        label="Project Image"
                      />
                      
                      <div>
                        <label className="section-label block mb-3">Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                          className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="section-label block mb-3">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors resize-none"
                        />
                      </div>
                      
                      <div>
                        <label className="section-label block mb-3">Tags (comma-separated)</label>
                        <input
                          type="text"
                          value={project.tags.join(', ')}
                          onChange={(e) => updateProject(project.id, 'tags', e.target.value.split(',').map(t => t.trim()))}
                          className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="section-label block mb-3">Link (optional)</label>
                        <input
                          type="url"
                          value={project.link || ''}
                          onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                          className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <span className="section-label mb-2 block">Skills Section</span>
                  <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Your Expertise</h2>
                </div>
                
                <div>
                  <label className="section-label block mb-3">Skills (comma-separated)</label>
                  <textarea
                    value={localData.skills.join(', ')}
                    onChange={(e) => updateSkills(e.target.value)}
                    rows={4}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="React, TypeScript, Node.js..."
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {localData.skills.map(skill => (
                    <span key={skill} className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-widest border border-primary/30 text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Tab */}
            {activeTab === 'resume' && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <span className="section-label mb-2 block">Resume Section</span>
                  <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Your CV</h2>
                </div>
                
                <div>
                  <label className="section-label block mb-3">Description</label>
                  <textarea
                    value={localData.resume?.description || ''}
                    onChange={(e) => updateResume('description', e.target.value)}
                    rows={3}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="A brief description about your resume..."
                  />
                </div>
                
                <FileUpload
                  value={localData.resume?.file || ''}
                  filename={localData.resume?.filename || ''}
                  onChange={(file, filename) => {
                    setLocalData(prev => ({
                      ...prev,
                      resume: { ...prev.resume, file, filename }
                    }));
                  }}
                  label="Resume File"
                />
              </div>
            )}

            {/* Blog Tab */}
            {activeTab === 'blog' && <BlogManager />}

            {/* Links Tab */}
            {activeTab === 'links' && <SocialLinksManager />}

            {/* Messages Tab */}
            {activeTab === 'messages' && <MessagesManager />}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <span className="section-label mb-2 block">Contact Section</span>
                  <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Get in Touch</h2>
                </div>
                
                <div>
                  <label className="section-label block mb-3">Email</label>
                  <input
                    type="email"
                    value={localData.contact.email}
                    onChange={(e) => updateContact('email', e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="section-label block mb-3">Phone</label>
                  <input
                    type="tel"
                    value={localData.contact.phone}
                    onChange={(e) => updateContact('phone', e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="section-label block mb-3">Location</label>
                  <input
                    type="text"
                    value={localData.contact.location}
                    onChange={(e) => updateContact('location', e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="pt-6 sm:pt-8 border-t border-border/30">
                  <span className="section-label mb-4 sm:mb-6 block">Default Social Links</span>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="section-label block mb-3">LinkedIn</label>
                      <input
                        type="url"
                        value={localData.contact.social?.linkedin || ''}
                        onChange={(e) => updateSocial('linkedin', e.target.value)}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    
                    <div>
                      <label className="section-label block mb-3">GitHub</label>
                      <input
                        type="url"
                        value={localData.contact.social?.github || ''}
                        onChange={(e) => updateSocial('github', e.target.value)}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    
                    <div>
                      <label className="section-label block mb-3">Twitter</label>
                      <input
                        type="url"
                        value={localData.contact.social?.twitter || ''}
                        onChange={(e) => updateSocial('twitter', e.target.value)}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
