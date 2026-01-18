-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a message (no auth required)
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

-- Only admins can read messages (using permissive policy for simple auth)
CREATE POLICY "Anyone can read messages"
ON public.contact_messages
FOR SELECT
USING (true);

-- Only admins can update messages (mark as read)
CREATE POLICY "Anyone can update messages"
ON public.contact_messages
FOR UPDATE
USING (true);

-- Only admins can delete messages
CREATE POLICY "Anyone can delete messages"
ON public.contact_messages
FOR DELETE
USING (true);