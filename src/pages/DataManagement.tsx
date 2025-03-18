import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { database, storage } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Note = {
  id: number;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
};

const DataManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userFiles, setUserFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadNotes();
      loadFiles();
    }
  }, [user]);

  const loadNotes = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await database.fetch<Note>('notes', {
        filter: { column: 'user_id', value: user.id }
      });
      
      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      console.error('Error loading notes:', error);
      toast({
        title: 'Error loading notes',
        description: error.message,
        variant: 'destructive',
      });
      setNotes([]);
    }
  };

  const loadFiles = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await storage.list(user.id);
      if (error) throw error;
      setUserFiles(data || []);
    } catch (error: any) {
      console.error('Error loading files:', error);
      toast({
        title: 'Error loading files',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleCreateNote = async () => {
    if (!user) return;
    if (!newNote.title || !newNote.content) {
      toast({
        title: 'Missing fields',
        description: 'Please provide both title and content',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await database.insert<Note>('notes', {
        user_id: user.id,
        title: newNote.title,
        content: newNote.content,
      });
      
      if (error) throw error;
      
      toast({
        title: 'Note created',
        description: 'Your note has been saved successfully',
      });
      
      setNewNote({ title: '', content: '' });
      loadNotes();
    } catch (error: any) {
      console.error('Error creating note:', error);
      toast({
        title: 'Error creating note',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await database.delete('notes', {
        column: 'id',
        value: id
      });
      
      if (error) throw error;
      
      toast({
        title: 'Note deleted',
        description: 'Your note has been deleted successfully',
      });
      
      loadNotes();
    } catch (error: any) {
      console.error('Error deleting note:', error);
      toast({
        title: 'Error deleting note',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!user || !selectedFile) return;
    
    setIsLoading(true);
    try {
      const filePath = `${Date.now()}_${selectedFile.name}`;
      const { error } = await storage.upload(user.id, filePath, selectedFile);
      
      if (error) throw error;
      
      toast({
        title: 'File uploaded',
        description: 'Your file has been uploaded successfully',
      });
      
      setSelectedFile(null);
      loadFiles();
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Error uploading file',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileDelete = async (filePath: string) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await storage.delete(user.id, [filePath]);
      
      if (error) throw error;
      
      toast({
        title: 'File deleted',
        description: 'Your file has been deleted successfully',
      });
      
      loadFiles();
    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast({
        title: 'Error deleting file',
        description: error.message,
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
        {!user ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
            <p>You need to be signed in to manage your data and files.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Database Section */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-2xl font-bold mb-4">Database Storage</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      placeholder="Note title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <Textarea
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      placeholder="Note content"
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={handleCreateNote} 
                    disabled={isLoading || !newNote.title || !newNote.content}
                    className="w-full"
                  >
                    {isLoading ? 'Saving...' : 'Save Note'}
                  </Button>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-bold mb-4">Your Notes</h2>
                {notes.length === 0 ? (
                  <p className="text-muted-foreground">You don't have any notes yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notes.map((note) => (
                        <TableRow key={note.id}>
                          <TableCell className="font-medium">{note.title}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{note.content}</TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteNote(note.id)}
                              disabled={isLoading}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
            
            {/* File Storage Section */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-2xl font-bold mb-4">File Storage</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select File</label>
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </div>
                  <Button 
                    onClick={handleFileUpload} 
                    disabled={isLoading || !selectedFile}
                    className="w-full"
                  >
                    {isLoading ? 'Uploading...' : 'Upload File'}
                  </Button>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-bold mb-4">Your Files</h2>
                {userFiles.length === 0 ? (
                  <p className="text-muted-foreground">You don't have any files yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File Name</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userFiles.map((file) => (
                        <TableRow key={file.name}>
                          <TableCell className="font-medium">{file.name}</TableCell>
                          <TableCell>{Math.round(file.metadata.size / 1024)} KB</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const url = storage.getPublicUrl(user.id, file.name);
                                  window.open(url, '_blank');
                                }}
                              >
                                View
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleFileDelete(file.name)}
                                disabled={isLoading}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataManagement;
