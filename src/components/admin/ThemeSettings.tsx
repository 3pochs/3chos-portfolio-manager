
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Moon, Sun, Check } from 'lucide-react';

// Define theme colors
const themeColors = [
  { name: 'Default', primary: '#0f172a', accent: '#6d28d9' },
  { name: 'Ocean', primary: '#0c4a6e', accent: '#0ea5e9' },
  { name: 'Forest', primary: '#166534', accent: '#22c55e' },
  { name: 'Sunset', primary: '#9a3412', accent: '#f97316' },
  { name: 'Berry', primary: '#9d174d', accent: '#ec4899' },
  { name: 'Midnight', primary: '#1e1b4b', accent: '#8b5cf6' },
  { name: 'Slate', primary: '#334155', accent: '#94a3b8' },
  { name: 'Coffee', primary: '#44403c', accent: '#a8a29e' },
  { name: 'Cherry', primary: '#7f1d1d', accent: '#ef4444' },
];

const ThemeSettings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('portfolio-theme-mode');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [selectedColor, setSelectedColor] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme-color');
    return saved || 'Default';
  });
  
  // Apply theme changes
  useEffect(() => {
    // Apply dark/light mode
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('portfolio-theme-mode', darkMode ? 'dark' : 'light');
    
    // Apply color theme
    const color = themeColors.find(c => c.name === selectedColor);
    if (color) {
      document.documentElement.style.setProperty('--color-primary', color.primary);
      document.documentElement.style.setProperty('--color-accent', color.accent);
      localStorage.setItem('portfolio-theme-color', selectedColor);
    }
  }, [darkMode, selectedColor]);
  
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    toast.success(`${!darkMode ? 'Dark' : 'Light'} mode enabled`);
  };
  
  const selectColor = (colorName: string) => {
    setSelectedColor(colorName);
    toast.success(`Theme color updated to ${colorName}`);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-xl font-medium">Theme Settings</h2>
      </div>
      
      <div className="p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Light/Dark Mode Toggle */}
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-4">Mode</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDarkMode(false)}
                className={`p-4 rounded-lg flex flex-col items-center ${
                  !darkMode ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/70'
                }`}
              >
                <Sun className="h-6 w-6 mb-2" />
                <span>Light</span>
              </button>
              
              <button
                onClick={() => setDarkMode(true)}
                className={`p-4 rounded-lg flex flex-col items-center ${
                  darkMode ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/70'
                }`}
              >
                <Moon className="h-6 w-6 mb-2" />
                <span>Dark</span>
              </button>
            </div>
          </div>
          
          {/* Color Theme Selector */}
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-4">Color Theme</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {themeColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => selectColor(color.name)}
                  className={`relative group rounded-lg p-2 border ${
                    selectedColor === color.name ? 'border-primary' : 'border-transparent hover:border-muted-foreground/20'
                  }`}
                >
                  <div className="flex justify-center items-center mb-2">
                    <div 
                      className="h-8 w-8 rounded-full" 
                      style={{ backgroundColor: color.accent }}
                    />
                    {selectedColor === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-primary/20 rounded-full p-1">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center font-medium">{color.name}</p>
                </button>
              ))}
            </div>
          </div>
          
          {/* Theme Preview */}
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-4">Preview</h3>
            <div className={`rounded-lg p-4 ${darkMode ? 'bg-black/90 text-white' : 'bg-white text-black'} border border-muted-foreground/10`}>
              <div className="space-y-2">
                <div 
                  className="h-4 w-1/2 rounded" 
                  style={{ 
                    backgroundColor: themeColors.find(c => c.name === selectedColor)?.primary 
                  }}
                />
                <div 
                  className="h-4 w-1/4 rounded" 
                  style={{ 
                    backgroundColor: themeColors.find(c => c.name === selectedColor)?.accent 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
