
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://xjwnqojroevhcimguown.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqd25xb2pyb2V2aGNpbWd1b3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMjcxOTEsImV4cCI6MjA1NzgwMzE5MX0.hdOBBKgU9y-OcND4l_E0fnVkKSGGc95GDfCN5nQCGA4';

// Google API key
export const GOOGLE_API_KEY = 'AIzaSyASHKFzKYHLATFgMBPgy0BVV-ltr-CI-KA';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helpers
export const database = {
  // Fetch data from a table with proper typing
  async fetch<T>(table: string, options?: { 
    columns?: string, 
    filter?: { column: string, value: any },
    limit?: number,
    order?: { column: string, ascending?: boolean }
  }): Promise<{ data: T[] | null, error: any }> {
    let query = supabase.from(table).select(options?.columns || '*');
    
    if (options?.filter) {
      query = query.eq(options.filter.column, options.filter.value);
    }
    
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    if (options?.order) {
      query = query.order(options.order.column, { 
        ascending: options.order.ascending ?? true 
      });
    }
    
    const { data, error } = await query;
    return { data: data as T[] | null, error };
  },
  
  // Insert data into a table
  async insert<T>(table: string, data: any): Promise<{ data: T | null, error: any }> {
    const result = await supabase.from(table).insert(data).select();
    return { data: result.data?.[0] as T || null, error: result.error };
  },
  
  // Update data in a table
  async update<T>(table: string, data: any, match: { column: string, value: any }): Promise<{ data: T | null, error: any }> {
    const result = await supabase.from(table).update(data).eq(match.column, match.value).select();
    return { data: result.data?.[0] as T || null, error: result.error };
  },
  
  // Delete data from a table
  async delete(table: string, match: { column: string, value: any }) {
    return await supabase.from(table).delete().eq(match.column, match.value);
  }
};

// Storage helpers
export const storage = {
  // Upload a file to a bucket
  async upload(bucket: string, filePath: string, file: File) {
    return await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });
  },
  
  // Get public URL for a file
  getPublicUrl(bucket: string, filePath: string) {
    return supabase.storage.from(bucket).getPublicUrl(filePath).data.publicUrl;
  },
  
  // Download a file
  async download(bucket: string, filePath: string) {
    return await supabase.storage.from(bucket).download(filePath);
  },
  
  // Delete a file
  async delete(bucket: string, filePaths: string[]) {
    return await supabase.storage.from(bucket).remove(filePaths);
  },
  
  // List all files in a bucket/folder
  async list(bucket: string, folderPath?: string) {
    return await supabase.storage.from(bucket).list(folderPath || '');
  }
};

// Google API helper
export const googleApi = {
  async sendQuery(query: string) {
    try {
      // This is a placeholder - you'll need to specify which Google API you want to use
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(query)}`);
      return await response.json();
    } catch (error) {
      console.error("Error querying Google API:", error);
      return { error: true, message: "Failed to query Google API" };
    }
  }
};
