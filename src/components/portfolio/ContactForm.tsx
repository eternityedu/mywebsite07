import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters")
});

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; message?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: result.data.name,
          email: result.data.email,
          message: result.data.message
        });

      if (error) throw error;

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full">
      <div>
        <Input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="text-xs h-8 bg-background/50 border-border/50"
          maxLength={100}
        />
        {errors.name && <p className="text-[10px] text-destructive mt-1">{errors.name}</p>}
      </div>
      
      <div>
        <Input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="text-xs h-8 bg-background/50 border-border/50"
          maxLength={255}
        />
        {errors.email && <p className="text-[10px] text-destructive mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <Textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="text-xs min-h-[80px] bg-background/50 border-border/50 resize-none"
          maxLength={1000}
        />
        {errors.message && <p className="text-[10px] text-destructive mt-1">{errors.message}</p>}
        <p className="text-[9px] text-muted-foreground mt-1 text-right">
          {formData.message.length}/1000
        </p>
      </div>
      
      <Button 
        type="submit" 
        disabled={sending}
        className="w-full h-8 text-xs"
        size="sm"
      >
        {sending ? (
          <>
            <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-3 h-3 mr-1.5" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
