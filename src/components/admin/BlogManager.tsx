import React, { useState } from 'react';
import { useBlogPosts, BlogPost } from '@/hooks/useBlogPosts';
import { Plus, Trash2, Edit2, Eye, EyeOff, Save, X } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { toast } from 'sonner';

const BlogManager: React.FC = () => {
  const { posts, loading, createPost, updatePost, deletePost } = useBlogPosts(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    cover_image: '',
    published: false,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleCreate = async () => {
    if (!form.title || !form.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      await createPost({
        ...form,
        slug: form.slug || generateSlug(form.title),
        excerpt: form.excerpt || null,
        cover_image: form.cover_image || null,
      });
      setIsCreating(false);
      setForm({ title: '', slug: '', content: '', excerpt: '', cover_image: '', published: false });
      toast.success('Blog post created');
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      await updatePost(editingId, {
        ...form,
        slug: form.slug || generateSlug(form.title),
        excerpt: form.excerpt || null,
        cover_image: form.cover_image || null,
      });
      setEditingId(null);
      setForm({ title: '', slug: '', content: '', excerpt: '', cover_image: '', published: false });
      toast.success('Blog post updated');
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await deletePost(id);
      toast.success('Blog post deleted');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      cover_image: post.cover_image || '',
      published: post.published,
    });
    setIsCreating(false);
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      await updatePost(post.id, { published: !post.published });
      toast.success(post.published ? 'Post unpublished' : 'Post published');
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  if (loading) {
    return <div className="animate-pulse h-32 bg-muted rounded" />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <span className="section-label mb-2 block">Blog Section</span>
          <h2 className="text-2xl md:text-3xl font-light tracking-wide">Articles</h2>
        </div>
        {!isCreating && !editingId && (
          <button
            onClick={() => setIsCreating(true)}
            className="btn-minimal py-2 px-4"
          >
            <Plus className="w-3 h-3" />
            New Post
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <div className="p-4 md:p-6 border border-primary/30 space-y-6">
          <div className="flex items-center justify-between">
            <span className="section-label">
              {isCreating ? 'New Post' : 'Edit Post'}
            </span>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingId(null);
                setForm({ title: '', slug: '', content: '', excerpt: '', cover_image: '', published: false });
              }}
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <ImageUpload
            value={form.cover_image}
            onChange={(v) => setForm(prev => ({ ...prev, cover_image: v }))}
            label="Cover Image"
          />

          <div>
            <label className="section-label block mb-3">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="section-label block mb-3">Slug (auto-generated if empty)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
              placeholder={generateSlug(form.title) || 'your-post-slug'}
            />
          </div>

          <div>
            <label className="section-label block mb-3">Excerpt (optional)</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={2}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="section-label block mb-3">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
              rows={8}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => setForm(prev => ({ ...prev, published: e.target.checked }))}
              className="w-4 h-4"
            />
            <label htmlFor="published" className="text-sm">Publish immediately</label>
          </div>

          <button
            onClick={isCreating ? handleCreate : handleUpdate}
            className="btn-minimal py-2 px-6"
          >
            <Save className="w-3 h-3" />
            {isCreating ? 'Create Post' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 md:p-6 border border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-light truncate">{post.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {post.published ? 'Published' : 'Draft'} · {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => togglePublish(post)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                title={post.published ? 'Unpublish' : 'Publish'}
              >
                {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => startEdit(post)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && !isCreating && (
          <p className="text-center text-muted-foreground py-8">
            No blog posts yet. Create your first one!
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogManager;
