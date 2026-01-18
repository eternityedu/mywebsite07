-- Fix security issues by restricting access to authenticated admin users only

-- Drop the overly permissive policies on contact_messages
DROP POLICY IF EXISTS "Anyone can read messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can update messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can delete messages" ON public.contact_messages;

-- Create secure policies for contact_messages - only admins can read/update/delete
CREATE POLICY "Admins can read messages" 
ON public.contact_messages 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update messages" 
ON public.contact_messages 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete messages" 
ON public.contact_messages 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Drop the overly permissive policies on social_links
DROP POLICY IF EXISTS "Allow all social link writes" ON public.social_links;

-- Create secure policies for social_links - only admins can write
CREATE POLICY "Admins can insert social links" 
ON public.social_links 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update social links" 
ON public.social_links 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete social links" 
ON public.social_links 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix blog_posts - drop overly permissive policy
DROP POLICY IF EXISTS "Allow all blog post writes" ON public.blog_posts;

-- Create secure policies for blog_posts - only admins can write
CREATE POLICY "Admins can insert blog posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update blog posts" 
ON public.blog_posts 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete blog posts" 
ON public.blog_posts 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins should be able to read all blog posts (including unpublished)
CREATE POLICY "Admins can read all blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix portfolio_data - drop overly permissive policy
DROP POLICY IF EXISTS "Allow all portfolio data writes" ON public.portfolio_data;

-- Create secure policies for portfolio_data - only admins can write
CREATE POLICY "Admins can insert portfolio data" 
ON public.portfolio_data 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update portfolio data" 
ON public.portfolio_data 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete portfolio data" 
ON public.portfolio_data 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix admin_credentials - remove public read access (this is a critical security issue)
DROP POLICY IF EXISTS "Anyone can read admin credentials for login" ON public.admin_credentials;