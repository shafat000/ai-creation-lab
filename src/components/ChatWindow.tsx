
import React from 'react';
import { Message } from './AIMessage';
import AIMessage from './AIMessage';
import { Button } from '@/components/ui/button';
import { Eraser } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  onClearChat: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onClearChat }) => {
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="relative flex flex-col h-full">
      {messages.length > 0 && (
        <div className="absolute top-2 right-2 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClearChat}
            className="h-8 w-8 rounded-full bg-secondary/50 backdrop-blur-sm"
          >
            <Eraser className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="max-w-md space-y-4">
              <h3 className="text-2xl font-semibold ai-gradient-text">Welcome to AI Studio</h3>
              <p className="text-muted-foreground">
                Start a conversation with the AI by typing a message below.
                You can customize the model and settings in the sidebar.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <AIMessage key={message.id} message={message} />
          ))
        )}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
