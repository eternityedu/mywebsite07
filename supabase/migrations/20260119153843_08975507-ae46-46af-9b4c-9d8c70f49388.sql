-- Create a secure function to fetch messages for admin (bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_admin_messages()
RETURNS TABLE (
  id uuid,
  name text,
  email text,
  message text,
  read boolean,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT cm.id, cm.name, cm.email, cm.message, cm.read, cm.created_at
  FROM public.contact_messages cm
  ORDER BY cm.created_at DESC;
END;
$$;

-- Create a function to mark message as read
CREATE OR REPLACE FUNCTION public.mark_message_read(_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.contact_messages
  SET read = true
  WHERE id = _id;
  RETURN FOUND;
END;
$$;

-- Create a function to delete message
CREATE OR REPLACE FUNCTION public.delete_message(_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.contact_messages
  WHERE id = _id;
  RETURN FOUND;
END;
$$;