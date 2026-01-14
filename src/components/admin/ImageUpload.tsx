import React, { useRef } from 'react';
import { X, Image } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      {label && <label className="section-label block">{label}</label>}
      
      <div className="relative">
        {value ? (
          <div className="relative aspect-video overflow-hidden bg-secondary border border-border">
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleRemove}
              className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm text-foreground rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full aspect-video border border-dashed border-border flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all cursor-pointer"
          >
            <Image className="w-8 h-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm">Click to upload</p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
            </div>
          </button>
        )}
        
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
