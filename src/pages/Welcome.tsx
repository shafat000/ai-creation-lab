
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn, UserPlus } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="ai-gradient-text">AI Studio</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Create, experiment, and build with AI models in a sandbox environment
          </p>
        </div>
        
        <div className="flex flex-col space-y-4 pt-4">
          <Link to="/sign-in">
            <Button size="lg" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
          
          <Link to="/sign-up">
            <Button size="lg" variant="outline" className="w-full">
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
            </Button>
          </Link>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          
          <Link to="/app">
            <Button size="lg" variant="ghost" className="w-full">
              Continue as Guest
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
