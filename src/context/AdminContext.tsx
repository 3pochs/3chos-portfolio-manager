
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

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
  updateSection: (id: string, data: Partial<ContentSection>) => void;
  moveSection: (id: string, direction: 'up' | 'down') => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addMusicTrack: (track: Omit<MusicTrack, 'id'>) => void;
  updateMusicTrack: (id: string, data: Partial<MusicTrack>) => void;
  deleteMusicTrack: (id: string) => void;
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

const defaultProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Security Research',
    description: 'Vulnerability analysis and responsible disclosure for web applications.',
    image: '/placeholder.svg',
    tags: ['Security', 'Penetration Testing', 'Research'],
  },
  {
    id: 'project-2',
    title: 'Chemical Analysis Tool',
    description: 'Software for analyzing chemical compounds and reactions.',
    image: '/placeholder.svg',
    tags: ['Chemistry', 'Data Analysis', 'Software Development'],
  },
  {
    id: 'project-3',
    title: 'Audio Visualization',
    description: 'Creating interactive audio-visual experiences.',
    image: '/placeholder.svg',
    tags: ['Music', 'Digital Art', 'Web Development'],
  },
];

const defaultMusicTracks: MusicTrack[] = [
  {
    id: 'track-1',
    title: 'Ambient Flow',
    artist: '3chos',
    url: '/music/placeholder-track.mp3',
  },
  {
    id: 'track-2',
    title: 'Digital Dreams',
    artist: '3chos',
    url: '/music/placeholder-track.mp3',
  },
];

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
  
  // Check for saved auth state
  useEffect(() => {
    const savedAuth = localStorage.getItem('portfolio-auth');
    if (savedAuth) {
      const savedUser = JSON.parse(savedAuth);
      setUser(savedUser);
    }
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
    };
    setMusicTracks(prev => [...prev, newTrack]);
    toast.success('Music track added');
  };

  const updateMusicTrack = (id: string, data: Partial<MusicTrack>) => {
    setMusicTracks(prev => 
      prev.map(track => 
        track.id === id ? { ...track, ...data } : track
      )
    );
    toast.success('Music track updated');
  };

  const deleteMusicTrack = (id: string) => {
    setMusicTracks(prev => prev.filter(track => track.id !== id));
    toast.success('Music track deleted');
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
        updateSection,
        moveSection,
        addProject,
        updateProject,
        deleteProject,
        addMusicTrack,
        updateMusicTrack,
        deleteMusicTrack,
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
