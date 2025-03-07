
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { useAudio } from '@/context/AudioContext';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { 
    isPlaying, 
    togglePlay, 
    currentTrack, 
    nextTrack, 
    previousTrack,
    volume,
    setVolume
  } = useAudio();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">{children}</main>
      
      {/* Audio Player */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50 animate-slide-up">
          <div className="container mx-auto py-2 px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={previousTrack}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Previous track"
              >
                <SkipBack size={18} />
              </button>
              
              <button 
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              
              <button 
                onClick={nextTrack}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Next track"
              >
                <SkipForward size={18} />
              </button>
            </div>
            
            <div className="flex-1 mx-4">
              <p className="text-sm font-medium line-clamp-1">
                {currentTrack.title} - {currentTrack.artist}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 accent-primary bg-secondary rounded-full"
              />
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Layout;
