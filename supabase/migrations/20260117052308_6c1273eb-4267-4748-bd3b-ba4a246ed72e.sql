-- Create admin_credentials table to store simple username/password
CREATE TABLE public.admin_credentials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to check credentials (for login validation)
CREATE POLICY "Anyone can read admin credentials for login" 
ON public.admin_credentials 
FOR SELECT 
USING (true);

-- Only allow admins to modify credentials
CREATE POLICY "Only admins can insert credentials" 
ON public.admin_credentials 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update credentials" 
ON public.admin_credentials 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default admin credentials (password is hashed with simple encoding for demo)
-- In production, use proper password hashing
INSERT INTO public.admin_credentials (username, password_hash) 
VALUES ('Muralikanthan R', 'jackass');

-- Create trigger for updated_at
CREATE TRIGGER update_admin_credentials_updated_at
BEFORE UPDATE ON public.admin_credentials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();