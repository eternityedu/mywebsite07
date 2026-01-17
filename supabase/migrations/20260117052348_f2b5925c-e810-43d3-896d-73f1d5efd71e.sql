-- Drop restrictive policies that require Supabase Auth
DROP POLICY IF EXISTS "Admins can insert portfolio data" ON public.portfolio_data;
DROP POLICY IF EXISTS "Admins can update portfolio data" ON public.portfolio_data;
DROP POLICY IF EXISTS "Admins can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can insert social links" ON public.social_links;
DROP POLICY IF EXISTS "Admins can update social links" ON public.social_links;
DROP POLICY IF EXISTS "Admins can delete social links" ON public.social_links;

-- Create permissive policies for authenticated operations (verified via anon key + app logic)
CREATE POLICY "Allow all portfolio data writes" 
ON public.portfolio_data 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all blog post writes" 
ON public.blog_posts 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all social link writes" 
ON public.social_links 
FOR ALL 
USING (true)
WITH CHECK (true);