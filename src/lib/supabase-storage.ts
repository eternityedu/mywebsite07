import { supabase } from "@/integrations/supabase/client";

export const uploadFile = async (file: File, folder: string = 'images'): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error } = await supabase.storage
    .from('portfolio')
    .upload(fileName, file);

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  const { data } = supabase.storage
    .from('portfolio')
    .getPublicUrl(fileName);

  return data.publicUrl;
};

export const deleteFile = async (url: string): Promise<boolean> => {
  try {
    const path = url.split('/portfolio/')[1];
    if (!path) return false;

    const { error } = await supabase.storage
      .from('portfolio')
      .remove([path]);

    return !error;
  } catch {
    return false;
  }
};
