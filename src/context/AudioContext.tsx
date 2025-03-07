
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

type Music = {
  id: string;
  title: string;
  artist: string;
  url: string;
};

type AudioContextType = {
  isPlaying: boolean;
  currentTrack: Music | null;
  volume: number;
  playlist: Music[];
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  addToPlaylist: (music: Music) => void;
  removeFromPlaylist: (id: string) => void;
  setCurrentTrack: (music: Music) => void;
};

const defaultPlaylist: Music[] = [
  {
    id: '1',
    title: 'Ambient Flow',
    artist: '3chos',
    url: '/music/placeholder-track.mp3',
  },
];

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Music | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [playlist, setPlaylist] = useState<Music[]>(defaultPlaylist);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    // Load first track
    if (playlist.length > 0 && !currentTrack) {
      setCurrentTrack(playlist[0]);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    
    audioRef.current.src = currentTrack.url;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
        toast.error("Couldn't play music. Please try again.");
        setIsPlaying(false);
      });
    }
    
    // Setup event listeners
    const handleEnded = () => {
      nextTrack();
    };
    
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    if (!currentTrack || playlist.length <= 1) return;
    
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentTrack(playlist[nextIndex]);
    
    if (!isPlaying) setIsPlaying(true);
  };

  const previousTrack = () => {
    if (!currentTrack || playlist.length <= 1) return;
    
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrack(playlist[prevIndex]);
    
    if (!isPlaying) setIsPlaying(true);
  };

  const addToPlaylist = (music: Music) => {
    setPlaylist(prev => {
      // Check if already exists
      if (prev.some(track => track.id === music.id)) {
        return prev;
      }
      return [...prev, music];
    });
    
    toast.success(`Added "${music.title}" to playlist`);
    
    // If no track is playing, set this as current and play
    if (!currentTrack) {
      setCurrentTrack(music);
      setIsPlaying(true);
    }
  };

  const removeFromPlaylist = (id: string) => {
    setPlaylist(prev => prev.filter(track => track.id !== id));
    
    // If current track is removed, play next one
    if (currentTrack && currentTrack.id === id) {
      const newPlaylist = playlist.filter(track => track.id !== id);
      if (newPlaylist.length > 0) {
        setCurrentTrack(newPlaylist[0]);
      } else {
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrack,
        volume,
        playlist,
        play,
        pause,
        togglePlay,
        setVolume,
        nextTrack,
        previousTrack,
        addToPlaylist,
        removeFromPlaylist,
        setCurrentTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
