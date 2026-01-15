import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/supabase-storage';
import { toast } from 'sonner';

interface FileUploadProps {
  value: string;
  filename: string;
  onChange: (value: string, filename: string) => void;
  label?: string;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ value, filename, onChange, label, accept = ".pdf,.doc,.docx" }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadFile(file, 'documents');
      if (url) {
        onChange(url, file.name);
        toast.success('File uploaded');
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
    <div className="space-y-2">
      {label && <label className="section-label block">{label}</label>}
      
      <div className="relative">
        {value ? (
          <div className="flex items-center justify-between p-4 bg-secondary border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm truncate max-w-[200px]">{filename}</span>
            </div>
            <button onClick={() => onChange('', '')} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full p-6 border border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all cursor-pointer disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /> : (
              <>
                <Upload className="w-6 h-6 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm">Click to upload</p>
                  <p className="text-xs text-muted-foreground">PDF, DOC up to 10MB</p>
                </div>
              </>
            )}
          </button>
        )}
        
        <input ref={inputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
};

export default FileUpload;
