import React, { useRef, useState } from 'react';
import { X, Image, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/supabase-storage';
import { toast } from 'sonner';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadFile(file, 'images');
      if (url) {
        onChange(url);
        toast.success('Image uploaded');
      } else {
        toast.error('Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {label && <label className="section-label block">{label}</label>}
      
      <div className="relative">
        {value ? (
          <div className="relative aspect-video overflow-hidden bg-secondary border border-border">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={() => onChange('')}
              className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm text-foreground rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full aspect-video border border-dashed border-border flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all cursor-pointer disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /> : (
              <>
                <Image className="w-8 h-8 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm">Click to upload</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
              </>
            )}
          </button>
        )}
        
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
};

export default ImageUpload;
