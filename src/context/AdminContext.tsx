
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Define types for our content
type ContentSection = {
  id: string;
  type: 'hero' | 'about' | 'projects' | 'music';
  title: string;
  content: any;
  order: number;
};

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
};

type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  url: string;
  isAutoplay?: boolean;
};

type ThemeSettings = {
  mode: 'light' | 'dark';
  color: string;
};

type AdminUser = {
  username: string;
  isAuthenticated: boolean;
};

type AdminContextType = {
  user: AdminUser;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  sections: ContentSection[];
  projects: Project[];
  musicTracks: MusicTrack[];
  themeSettings: ThemeSettings;
  updateSection: (id: string, data: Partial<ContentSection>) => void;
  moveSection: (id: string, direction: 'up' | 'down') => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addMusicTrack: (track: Omit<MusicTrack, 'id'>) => void;
  updateMusicTrack: (id: string, data: Partial<MusicTrack>) => void;
  deleteMusicTrack: (id: string) => void;
  setAutoplayTrack: (id: string) => void;
  updateTheme: (settings: Partial<ThemeSettings>) => void;
};

// Initialize with default data
const defaultSections: ContentSection[] = [
  {
    id: 'hero-1',
    type: 'hero',
    title: 'Welcome to My Portfolio',
    content: {
      subtitle: 'Programmer. Chemist. Pentester. Music Maker.',
      description: 'Creating digital and sonic experiences.',
    },
    order: 1,
  },
  {
    id: 'about-1',
    type: 'about',
    title: 'About Me',
    content: {
      bio: 'I am 3chos, a multi-disciplinary creator working at the intersection of technology, science, and art.',
      skills: ['Programming', 'Chemistry', 'Penetration Testing', 'Music Production'],
    },
    order: 2,
  },
  {
    id: 'projects-1',
    type: 'projects',
    title: 'Projects',
    content: {
      description: 'Here are some of my recent works',
    },
    order: 3,
  },
  {
    id: 'music-1',
    type: 'music',
    title: 'Music',
    content: {
      description: 'Listen to my latest tracks',
    },
    order: 4,
  },
];

const defaultProjects: Project[] = [];

const defaultMusicTracks: MusicTrack[] = [
  {
    id: 'track-1',
    title: 'Ambient Flow',
    artist: '3chos',
    url: '/music/placeholder-track.mp3',
    isAutoplay: true,
  },
];

const defaultThemeSettings: ThemeSettings = {
  mode: 'dark',
  color: 'Default',
};

// Create the context
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Create provider component
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser>({
    username: '',
    isAuthenticated: false,
  });
  
  const [sections, setSections] = useState<ContentSection[]>(
    () => {
      const saved = localStorage.getItem('portfolio-sections');
      return saved ? JSON.parse(saved) : defaultSections;
    }
  );
  
  const [projects, setProjects] = useState<Project[]>(
    () => {
      const saved = localStorage.getItem('portfolio-projects');
      return saved ? JSON.parse(saved) : defaultProjects;
    }
  );
  
  const [musicTracks, setMusicTracks] = useState<MusicTrack[]>(
    () => {
      const saved = localStorage.getItem('portfolio-music-tracks');
      return saved ? JSON.parse(saved) : defaultMusicTracks;
    }
  );
  
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(
    () => {
      const saved = localStorage.getItem('portfolio-theme-settings');
      return saved ? JSON.parse(saved) : defaultThemeSettings;
    }
  );
  
  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-sections', JSON.stringify(sections));
  }, [sections]);
  
  useEffect(() => {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
  }, [projects]);
  
  useEffect(() => {
    localStorage.setItem('portfolio-music-tracks', JSON.stringify(musicTracks));
  }, [musicTracks]);
  
  useEffect(() => {
    localStorage.setItem('portfolio-theme-settings', JSON.stringify(themeSettings));
  }, [themeSettings]);
  
  // Check for saved auth state
  useEffect(() => {
    const savedAuth = localStorage.getItem('portfolio-auth');
    if (savedAuth) {
      const savedUser = JSON.parse(savedAuth);
      setUser(savedUser);
    }
    
    // Also check Supabase session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser({
          username: data.session.user.email || 'Supabase User',
          isAuthenticated: true,
        });
      }
    };
    
    checkSession();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Hard-coded credentials as requested
    if (username === 'Zahid' && password === 'Nassa731') {
      const authenticatedUser = {
        username,
        isAuthenticated: true,
      };
      setUser(authenticatedUser);
      localStorage.setItem('portfolio-auth', JSON.stringify(authenticatedUser));
      toast.success('Successfully logged in');
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  const logout = () => {
    setUser({ username: '', isAuthenticated: false });
    localStorage.removeItem('portfolio-auth');
    toast.success('Logged out successfully');
  };

  const updateSection = (id: string, data: Partial<ContentSection>) => {
    setSections(prev => 
      prev.map(section => 
        section.id === id ? { ...section, ...data } : section
      )
    );
    toast.success('Section updated');
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    setSections(prev => {
      const index = prev.findIndex(section => section.id === id);
      if (index === -1) return prev;
      
      const newSections = [...prev];
      
      if (direction === 'up' && index > 0) {
        // Swap with previous section
        [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
        
        // Update order properties
        newSections[index - 1].order = index;
        newSections[index].order = index + 1;
      } else if (direction === 'down' && index < prev.length - 1) {
        // Swap with next section
        [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
        
        // Update order properties
        newSections[index].order = index + 1;
        newSections[index + 1].order = index + 2;
      }
      
      return newSections;
    });
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: `project-${Date.now()}`,
    };
    setProjects(prev => [...prev, newProject]);
    toast.success('Project added');
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...data } : project
      )
    );
    toast.success('Project updated');
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast.success('Project deleted');
  };

  const addMusicTrack = (track: Omit<MusicTrack, 'id'>) => {
    const newTrack = {
      ...track,
      id: `track-${Date.now()}`,
      isAutoplay: track.isAutoplay || false,
    };
    
    // If this is set as autoplay, remove autoplay from other tracks
    if (newTrack.isAutoplay) {
      setMusicTracks(prev => 
        prev.map(t => ({ ...t, isAutoplay: false }))
      );
    }
    
    setMusicTracks(prev => [...prev, newTrack]);
    toast.success('Music track added');
  };

  const updateMusicTrack = (id: string, data: Partial<MusicTrack>) => {
    // If setting autoplay, remove it from other tracks
    if (data.isAutoplay) {
      setMusicTracks(prev => 
        prev.map(track => 
          track.id !== id ? { ...track, isAutoplay: false } : track
        )
      );
    }
    
    setMusicTracks(prev => 
      prev.map(track => 
        track.id === id ? { ...track, ...data } : track
      )
    );
    toast.success('Music track updated');
  };

  const deleteMusicTrack = (id: string) => {
    // Check if it's the autoplay track
    const isAutoplayTrack = musicTracks.find(track => track.id === id)?.isAutoplay;
    
    setMusicTracks(prev => {
      const newTracks = prev.filter(track => track.id !== id);
      
      // If it was the autoplay track and we have other tracks, set the first one as autoplay
      if (isAutoplayTrack && newTracks.length > 0) {
        newTracks[0].isAutoplay = true;
      }
      
      return newTracks;
    });
    
    toast.success('Music track deleted');
  };
  
  const setAutoplayTrack = (id: string) => {
    setMusicTracks(prev => 
      prev.map(track => ({ 
        ...track, 
        isAutoplay: track.id === id 
      }))
    );
    toast.success('Autoplay track updated');
  };
  
  const updateTheme = (settings: Partial<ThemeSettings>) => {
    setThemeSettings(prev => ({ ...prev, ...settings }));
    toast.success('Theme settings updated');
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        isAuthenticated: user.isAuthenticated,
        login,
        logout,
        sections,
        projects,
        musicTracks,
        themeSettings,
        updateSection,
        moveSection,
        addProject,
        updateProject,
        deleteProject,
        addMusicTrack,
        updateMusicTrack,
        deleteMusicTrack,
        setAutoplayTrack,
        updateTheme,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook for using the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
