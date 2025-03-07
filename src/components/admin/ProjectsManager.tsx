
import React, { useState, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { toast } from 'sonner';
import { Link, Pencil, Plus, Trash2, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useAdmin();
  
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '/placeholder.svg',
    tags: [] as string[],
    url: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // Upload to Supabase
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);
        
      setFormData((prev) => ({ ...prev, image: data.publicUrl }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProjectId) {
      updateProject(editingProjectId, formData);
      setEditingProjectId(null);
    } else {
      addProject(formData);
      setIsAddingProject(false);
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      image: '/placeholder.svg',
      tags: [],
      url: ''
    });
  };
  
  const handleEditProject = (project: any) => {
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags,
      url: project.url || ''
    });
    setEditingProjectId(project.id);
    setIsAddingProject(true);
  };
  
  const handleCancelEdit = () => {
    setIsAddingProject(false);
    setEditingProjectId(null);
    setFormData({
      title: '',
      description: '',
      image: '/placeholder.svg',
      tags: [],
      url: ''
    });
  };
  
  return (
    <div>
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-xl font-medium">Projects Manager</h2>
        
        {!isAddingProject && (
          <button
            onClick={() => setIsAddingProject(true)}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90"
          >
            <Plus size={16} className="inline mr-1.5" />
            Add Project
          </button>
        )}
      </div>
      
      <div className="p-6">
        {isAddingProject && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-lg font-medium mb-4">
              {editingProjectId ? 'Edit Project' : 'Add New Project'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Enter project title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Project URL (optional)</label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md"
                  rows={3}
                  placeholder="Describe your project"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="w-full px-3 py-2 border border-input rounded-md"
                  placeholder="e.g. Web Development, React, API"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Project Image</label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-secondary hover:bg-secondary/70 rounded-md flex items-center"
                  >
                    <Plus size={16} className="mr-1.5" />
                    Choose Image
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {formData.image !== '/placeholder.svg' ? 'Image selected' : 'No image selected'}
                  </span>
                </div>
                {formData.image !== '/placeholder.svg' && (
                  <div className="mt-2">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-md border border-border"
                    />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
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
                  {editingProjectId ? 'Update Project' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Your Projects</h3>
          
          {projects.length === 0 ? (
            <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed border-border">
              <Pencil size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No projects added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-background border border-border rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-md bg-secondary flex-shrink-0 overflow-hidden mr-4">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center">
                        {project.title}
                        {project.url && (
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 text-primary hover:text-primary/80"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-xs rounded-full bg-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-auto">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 text-sm font-medium text-primary hover:bg-muted rounded-md"
                      aria-label="Edit project"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="p-2 text-sm font-medium text-destructive hover:bg-muted rounded-md"
                      aria-label="Delete project"
                    >
                      <Trash2 size={16} />
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

export default ProjectsManager;
