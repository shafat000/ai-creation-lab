
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import ChatWindow from '@/components/ChatWindow';
import MessageInput from '@/components/MessageInput';
import SettingsPanel from '@/components/SettingsPanel';
import { Message } from '@/components/AIMessage';
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from '@/components/ui/resizable';
import { generateAIResponse, mockModels } from '@/services/ai-service';

const Index = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState("gemini-pro");
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    temperature: 1.0,
    maxTokens: 250,
    topP: 0.9
  });

  const handleSendMessage = async (content: string) => {
    if (isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(
        content,
        selectedModel,
        settings.temperature,
        settings.maxTokens
      );
      
      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleUpdateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      
      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={75} minSize={50}>
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-hidden">
                <ChatWindow 
                  messages={messages}
                  onClearChat={handleClearChat}
                />
              </div>
              <MessageInput 
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full border-l">
              <SettingsPanel 
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                models={mockModels}
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
};

export default Index;
