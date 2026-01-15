import React, { useState } from 'react';
import { useSocialLinks } from '@/hooks/useSocialLinks';
import { Plus, Trash2, Edit2, Save, X, Link } from 'lucide-react';
import { toast } from 'sonner';

const SocialLinksManager: React.FC = () => {
  const { links, loading, addLink, updateLink, deleteLink } = useSocialLinks();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', url: '' });

  const handleAdd = async () => {
    if (!form.name || !form.url) {
      toast.error('Name and URL are required');
      return;
    }

    try {
      await addLink(form.name, form.url);
      setIsAdding(false);
      setForm({ name: '', url: '' });
      toast.success('Link added');
    } catch (error) {
      toast.error('Failed to add link');
    }
  };

  const handleUpdate = async () => {
    if (!editingId || !form.name || !form.url) return;

    try {
      await updateLink(editingId, { name: form.name, url: form.url });
      setEditingId(null);
      setForm({ name: '', url: '' });
      toast.success('Link updated');
    } catch (error) {
      toast.error('Failed to update link');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this link?')) return;

    try {
      await deleteLink(id);
      toast.success('Link deleted');
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  const startEdit = (link: { id: string; name: string; url: string }) => {
    setEditingId(link.id);
    setForm({ name: link.name, url: link.url });
    setIsAdding(false);
  };

  if (loading) {
    return <div className="animate-pulse h-24 bg-muted rounded" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <span className="section-label mb-2 block">Custom Links</span>
          <h3 className="text-xl font-light">Social & External Links</h3>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn-minimal py-2 px-4"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="p-4 border border-primary/30 space-y-4">
          <div className="flex items-center justify-between">
            <span className="section-label">
              {isAdding ? 'Add Link' : 'Edit Link'}
            </span>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setForm({ name: '', url: '' });
              }}
              className="p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="section-label block mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Portfolio, Dribbble, Behance"
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label className="section-label block mb-2">URL</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://..."
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors text-sm"
            />
          </div>

          <button
            onClick={isAdding ? handleAdd : handleUpdate}
            className="btn-minimal py-2 px-4"
          >
            <Save className="w-3 h-3" />
            {isAdding ? 'Add' : 'Save'}
          </button>
        </div>
      )}

      {/* Links List */}
      <div className="space-y-2">
        {links.map((link) => (
          <div
            key={link.id}
            className="p-3 md:p-4 border border-border/50 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Link className="w-4 h-4 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-light truncate">{link.name}</p>
                <p className="text-xs text-muted-foreground truncate">{link.url}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => startEdit(link)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}

        {links.length === 0 && !isAdding && (
          <p className="text-center text-muted-foreground text-sm py-4">
            No custom links yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SocialLinksManager;
