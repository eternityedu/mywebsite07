-- Create portfolio_data table for storing all portfolio content
CREATE TABLE public.portfolio_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create social_links table for managing links with names
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Public read policies (portfolio is public)
CREATE POLICY "Anyone can read portfolio data" 
ON public.portfolio_data FOR SELECT 
USING (true);

CREATE POLICY "Anyone can read published blog posts" 
ON public.blog_posts FOR SELECT 
USING (published = true);

CREATE POLICY "Anyone can read social links" 
ON public.social_links FOR SELECT 
USING (true);

-- For simplicity (single admin), allow all writes without auth
-- In production, you'd add proper admin authentication
CREATE POLICY "Allow all inserts on portfolio_data" 
ON public.portfolio_data FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow all updates on portfolio_data" 
ON public.portfolio_data FOR UPDATE 
USING (true);

CREATE POLICY "Allow all inserts on blog_posts" 
ON public.blog_posts FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow all updates on blog_posts" 
ON public.blog_posts FOR UPDATE 
USING (true);

CREATE POLICY "Allow all deletes on blog_posts" 
ON public.blog_posts FOR DELETE 
USING (true);

CREATE POLICY "Allow all inserts on social_links" 
ON public.social_links FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow all updates on social_links" 
ON public.social_links FOR UPDATE 
USING (true);

CREATE POLICY "Allow all deletes on social_links" 
ON public.social_links FOR DELETE 
USING (true);

-- Create storage bucket for portfolio files
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

-- Storage policies for public access
CREATE POLICY "Anyone can view portfolio files" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio');

CREATE POLICY "Anyone can upload portfolio files" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "Anyone can update portfolio files" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'portfolio');

CREATE POLICY "Anyone can delete portfolio files" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'portfolio');

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_portfolio_data_updated_at
BEFORE UPDATE ON public.portfolio_data
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();