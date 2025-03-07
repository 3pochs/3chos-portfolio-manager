
import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { ArrowUp, ArrowDown, Edit, Eye } from 'lucide-react';

const ContentEditor: React.FC = () => {
  const { sections, updateSection, moveSection } = useAdmin();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);
  
  const handleSave = (id: string, formData: any) => {
    updateSection(id, {
      title: formData.title,
      content: formData,
    });
    setEditingSection(null);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-xl font-medium">Content Editor</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center px-3 py-1.5 rounded-md text-sm bg-secondary hover:bg-secondary/70"
          >
            {previewMode ? <Edit size={16} className="mr-1.5" /> : <Eye size={16} className="mr-1.5" />}
            {previewMode ? 'Edit Mode' : 'Preview'}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {sortedSections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              isEditing={editingSection === section.id}
              onStartEdit={() => setEditingSection(section.id)}
              onCancelEdit={() => setEditingSection(null)}
              onSave={handleSave}
              onMoveUp={() => moveSection(section.id, 'up')}
              onMoveDown={() => moveSection(section.id, 'down')}
              isFirst={section.order === 1}
              isLast={section.order === sections.length}
              previewMode={previewMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SectionCard: React.FC<{
  section: any;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: (id: string, data: any) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  previewMode: boolean;
}> = ({
  section,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSave,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  previewMode,
}) => {
  const [formData, setFormData] = useState({
    ...section.content,
    title: section.title,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  
  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, nestedKey: string) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [nestedKey]: { ...prev[nestedKey], [name]: value },
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(section.id, formData);
  };
  
  // Display based on section type
  const renderSectionPreview = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="p-4 bg-secondary/30 rounded-md">
            <h3 className="font-semibold">{section.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{section.content.subtitle}</p>
            <p className="text-xs mt-2">{section.content.description}</p>
          </div>
        );
      
      case 'about':
        return (
          <div className="p-4 bg-secondary/30 rounded-md">
            <h3 className="font-semibold">{section.title}</h3>
            <p className="text-sm mt-2">{section.content.bio}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {section.content.skills.map((skill: string, i: number) => (
                <span key={i} className="text-xs px-2 py-0.5 bg-background rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      
      case 'projects':
      case 'music':
        return (
          <div className="p-4 bg-secondary/30 rounded-md">
            <h3 className="font-semibold">{section.title}</h3>
            <p className="text-sm mt-1">{section.content.description}</p>
          </div>
        );
      
      default:
        return <p>Unknown section type</p>;
    }
  };
  
  // Render edit form based on section type
  const renderEditForm = () => {
    switch (section.type) {
      case 'hero':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md"
                rows={3}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-4 py-2 text-sm border border-input rounded-md hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        );
      
      case 'about':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md"
                rows={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
                onChange={(e) => {
                  const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                  setFormData((prev: any) => ({ ...prev, skills: skillsArray }));
                }}
                className="w-full px-3 py-2 border border-input rounded-md"
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-4 py-2 text-sm border border-input rounded-md hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        );
      
      case 'projects':
      case 'music':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md"
                rows={3}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-4 py-2 text-sm border border-input rounded-md hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        );
      
      default:
        return <p>Unknown section type</p>;
    }
  };
  
  return (
    <div className="bg-background border border-border rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            {section.order}
          </span>
          <span className="ml-3 font-medium capitalize">{section.type} Section</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {!previewMode && (
            <>
              <button
                onClick={onMoveUp}
                disabled={isFirst}
                className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Move up"
              >
                <ArrowUp size={16} />
              </button>
              <button
                onClick={onMoveDown}
                disabled={isLast}
                className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Move down"
              >
                <ArrowDown size={16} />
              </button>
              <button
                onClick={isEditing ? onCancelEdit : onStartEdit}
                className="p-1.5 rounded-md hover:bg-secondary"
                aria-label={isEditing ? "Cancel edit" : "Edit section"}
              >
                <Edit size={16} />
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {isEditing && !previewMode ? renderEditForm() : renderSectionPreview()}
      </div>
    </div>
  );
};

export default ContentEditor;
