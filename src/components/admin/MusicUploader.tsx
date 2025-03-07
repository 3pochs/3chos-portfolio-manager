
import React, { useState, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { toast } from 'sonner';
import { Upload, X, Music } from 'lucide-react';

const MusicUploader: React.FC = () => {
  const { musicTracks, addMusicTrack, updateMusicTrack, deleteMusicTrack } = useAdmin();
  
  const [isAddingTrack, setIsAddingTrack] = useState(false);
  const [editingTrackId, setEditingTrackId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    artist: '3chos',
    url: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real implementation, you would upload the file to a server/storage
    // For this demo, we'll create a fake URL
    const fakeUrl = `/music/${file.name}`;
    setFormData((prev) => ({ ...prev, url: fakeUrl }));
    
    toast.success(`File selected: ${file.name}`);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTrackId) {
      updateMusicTrack(editingTrackId, formData);
      setEditingTrackId(null);
    } else {
      addMusicTrack(formData);
      setIsAddingTrack(false);
    }
    
    // Reset form
    setFormData({
      title: '',
      artist: '3chos',
      url: '',
    });
  };
  
  const handleEditTrack = (track: any) => {
    setFormData({
      title: track.title,
      artist: track.artist,
      url: track.url,
    });
    setEditingTrackId(track.id);
    setIsAddingTrack(true);
  };
  
  const handleCancelEdit = () => {
    setIsAddingTrack(false);
    setEditingTrackId(null);
    setFormData({
      title: '',
      artist: '3chos',
      url: '',
    });
  };
  
  return (
    <div>
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-xl font-medium">Music Manager</h2>
        
        {!isAddingTrack && (
          <button
            onClick={() => setIsAddingTrack(true)}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90"
          >
            Add Track
          </button>
        )}
      </div>
      
      <div className="p-6">
        {isAddingTrack && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-lg font-medium mb-4">
              {editingTrackId ? 'Edit Track' : 'Add New Track'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Track Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Enter track title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Artist</label>
                  <input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Artist name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Music File</label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-secondary hover:bg-secondary/70 rounded-md flex items-center"
                  >
                    <Upload size={16} className="mr-1.5" />
                    Choose File
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {formData.url ? formData.url.split('/').pop() : 'No file selected'}
                  </span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-sm border border-input rounded-md hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
                >
                  {editingTrackId ? 'Update Track' : 'Add Track'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Your Tracks</h3>
          
          {musicTracks.length === 0 ? (
            <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed border-border">
              <Music size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No tracks added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {musicTracks.map((track) => (
                <div
                  key={track.id}
                  className="p-4 bg-background border border-border rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                      <Music size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium">{track.title}</h4>
                      <p className="text-sm text-muted-foreground">{track.artist}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditTrack(track)}
                      className="p-2 text-sm font-medium text-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMusicTrack(track.id)}
                      className="p-2 text-sm font-medium text-destructive hover:bg-muted rounded-md"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicUploader;
