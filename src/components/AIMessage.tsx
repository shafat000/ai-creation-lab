
import React from 'react';
import { Bot, User } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIMessageProps {
  message: Message;
}

const AIMessage: React.FC<AIMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Bot className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
        isUser 
          ? 'bg-accent text-accent-foreground' 
          : 'bg-secondary text-secondary-foreground'
      }`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-accent-foreground" />
        </div>
      )}
    </div>
  );
};

export default AIMessage;
