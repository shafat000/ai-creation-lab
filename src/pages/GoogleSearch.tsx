
import React, { useState } from 'react';
import { googleApi } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const GoogleSearch = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Query required",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await googleApi.sendQuery(query);
      
      if (response.error) {
        throw new Error(response.message || "Failed to get search results");
      }
      
      setResults(response);
      
      toast({
        title: "Search completed",
        description: `Found ${response.items?.length || 0} results`,
      });
    } catch (error: any) {
      console.error('Search error:', error);
      toast({
        title: 'Search failed',
        description: error.message || "An unexpected error occurred",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto p-4 flex-1">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Google Search</CardTitle>
              <CardDescription>
                Search the web using Google's API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your search query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {results && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Search Results</h2>
              
              {results.items?.length > 0 ? (
                results.items.map((item: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <h3 className="font-medium text-blue-600">
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </a>
                      </h3>
                      <p className="text-sm text-green-700">{item.displayLink}</p>
                      <p className="text-sm mt-1">{item.snippet}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground">No results found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleSearch;
