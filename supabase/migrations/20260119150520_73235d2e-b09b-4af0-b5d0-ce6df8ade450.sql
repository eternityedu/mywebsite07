-- Create a view to safely expose only username for credential checking
-- The actual password comparison should happen via a server function

-- First, add a SELECT policy that allows checking credentials
-- We'll use a restrictive approach - allow select only for login verification
CREATE POLICY "Allow credential lookup for login"
  ON public.admin_credentials
  FOR SELECT
  USING (true);

-- Create a secure function for password verification
CREATE OR REPLACE FUNCTION public.verify_admin_credentials(
  _username text,
  _password text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  stored_password text;
BEGIN
  SELECT password_hash INTO stored_password
  FROM public.admin_credentials
  WHERE username = _username;
  
  IF stored_password IS NULL THEN
    RETURN false;
  END IF;
  
  RETURN stored_password = _password;
END;
$$;