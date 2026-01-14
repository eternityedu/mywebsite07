import React, { useState, useEffect } from 'react';
import { usePortfolio, Project } from '@/contexts/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, User, Briefcase, Code, Mail } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

const Admin: React.FC = () => {
  const { data, updateData, isAdmin } = usePortfolio();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [localData, setLocalData] = useState(data);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

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

  const updateProject = (id: string, key: string, value: any) => {
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
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Site</span>
            </button>
            
            <h1 className="text-xl font-serif font-bold">Admin Dashboard</h1>
            
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{saved ? 'Saved!' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 shrink-0">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 max-w-3xl">
            {/* Hero Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold">Hero Section</h2>
                
                <ImageUpload
                  value={localData.hero.image}
                  onChange={(v) => updateHero('image', v)}
                  label="Profile Image"
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={localData.hero.name}
                    onChange={(e) => updateHero('name', e.target.value)}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={localData.hero.title}
                    onChange={(e) => updateHero('title', e.target.value)}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={localData.hero.subtitle}
                    onChange={(e) => updateHero('subtitle', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold">About Section</h2>
                
                <ImageUpload
                  value={localData.about.image}
                  onChange={(v) => updateAbout('image', v)}
                  label="About Image"
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={localData.about.title}
                    onChange={(e) => updateAbout('title', e.target.value)}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={localData.about.description}
                    onChange={(e) => updateAbout('description', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-bold">Projects</h2>
                  <button
                    onClick={addProject}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Project
                  </button>
                </div>
                
                {localData.projects.map((project, index) => (
                  <div key={project.id} className="p-6 bg-card border border-border rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Project {index + 1}</h3>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
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
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={project.tags.join(', ')}
                        onChange={(e) => updateProject(project.id, 'tags', e.target.value.split(',').map(t => t.trim()))}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Link (optional)</label>
                      <input
                        type="url"
                        value={project.link || ''}
                        onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold">Skills</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
                  <textarea
                    value={localData.skills.join(', ')}
                    onChange={(e) => updateSkills(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="React, TypeScript, Node.js..."
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {localData.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold">Contact Information</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={localData.contact.email}
                    onChange={(e) => updateContact('email', e.target.value)}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={localData.contact.phone}
                    onChange={(e) => updateContact('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={localData.contact.location}
                    onChange={(e) => updateContact('location', e.target.value)}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold mb-4">Social Links</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">LinkedIn</label>
                      <input
                        type="url"
                        value={localData.contact.social.linkedin || ''}
                        onChange={(e) => updateSocial('linkedin', e.target.value)}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">GitHub</label>
                      <input
                        type="url"
                        value={localData.contact.social.github || ''}
                        onChange={(e) => updateSocial('github', e.target.value)}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Twitter</label>
                      <input
                        type="url"
                        value={localData.contact.social.twitter || ''}
                        onChange={(e) => updateSocial('twitter', e.target.value)}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
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
