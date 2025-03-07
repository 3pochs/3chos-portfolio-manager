
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useAdmin } from '@/context/AdminContext';

type Music = {
  id: string;
  title: string;
  artist: string;
  url: string;
  isAutoplay?: boolean;
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

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { musicTracks } = useAdmin();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Music | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [playlist, setPlaylist] = useState<Music[]>([]);
  const [initialized, setInitialized] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio player with tracks from AdminContext
  useEffect(() => {
    if (initialized || musicTracks.length === 0) return;
    
    setPlaylist(musicTracks);
    
    // Find autoplay track or use first track
    const autoplayTrack = musicTracks.find(track => track.isAutoplay);
    if (autoplayTrack) {
      setCurrentTrack(autoplayTrack);
      setIsPlaying(true); // Start playing the autoplay track
    } else if (musicTracks.length > 0) {
      setCurrentTrack(musicTracks[0]);
    }
    
    setInitialized(true);
  }, [musicTracks, initialized]);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
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
