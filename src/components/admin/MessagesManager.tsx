import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Mail, Trash2, Check, RefreshCw, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

const MessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
      toast.success('Marked as read');
    } catch (error) {
      console.error('Error marking as read:', error);
      toast.error('Failed to update');
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.filter(m => m.id !== id));
      toast.success('Message deleted');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete');
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Messages
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fetchMessages}
            disabled={loading}
            className="h-7 px-2"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-8">
            No messages yet
          </p>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-3 rounded-lg border text-xs ${
                  msg.read ? 'bg-muted/30 border-border/30' : 'bg-primary/5 border-primary/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{msg.name}</p>
                    <p className="text-muted-foreground truncate">{msg.email}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!msg.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(msg.id)}
                        className="h-6 w-6 p-0"
                        title="Mark as read"
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMessage(msg.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground whitespace-pre-wrap break-words mb-2">
                  {msg.message}
                </p>
                <p className="text-[10px] text-muted-foreground/70">
                  {format(new Date(msg.created_at), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessagesManager;
