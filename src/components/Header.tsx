
import React from 'react';
import { Github } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-xl md:text-2xl flex items-center">
            <span className="ai-gradient-text">AI Studio</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Github className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
