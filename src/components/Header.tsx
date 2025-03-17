
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, LogIn, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';
  
  // Don't show auth buttons on welcome or auth pages
  const showAuthButtons = !isWelcomePage && !isAuthPage;

  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to={showAuthButtons ? "/app" : "/"} className="font-bold text-xl md:text-2xl flex items-center">
            <span className="ai-gradient-text">AI Studio</span>
          </Link>
        </div>
        
        {showAuthButtons && (
          <div className="flex items-center space-x-2">
            <Link to="/sign-in">
              <Button variant="ghost" size="sm" className="flex gap-1 items-center">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline-block">Sign In</span>
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button variant="outline" size="sm" className="flex gap-1 items-center">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline-block">Sign Up</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
