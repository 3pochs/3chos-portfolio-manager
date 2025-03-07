
import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useAudio } from '@/context/AudioContext';
import { Play, Pause } from 'lucide-react';

const MusicSection: React.FC = () => {
  const { sections, musicTracks } = useAdmin();
  const { 
    isPlaying, 
    currentTrack, 
    togglePlay, 
    setCurrentTrack,
    addToPlaylist 
  } = useAudio();
  
  const musicSection = sections.find(section => section.type === 'music');
  
  if (!musicSection) return null;
  
  return (
    <section id="music" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full mb-4">
            Music
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{musicSection.title}</h2>
          <p className="text-muted-foreground">
            {musicSection.content.description}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {musicTracks.map((track) => (
            <div
              key={track.id}
              className={`flex items-center p-4 mb-4 rounded-xl transition-all ${
                currentTrack && currentTrack.id === track.id
                  ? 'bg-primary/10 border border-primary/20'
                  : 'bg-background hover:bg-secondary/70 border border-border'
              }`}
            >
              <button
                onClick={() => {
                  if (currentTrack && currentTrack.id === track.id) {
                    togglePlay();
                  } else {
                    setCurrentTrack(track);
                    addToPlaylist(track);
                  }
                }}
                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  currentTrack && currentTrack.id === track.id && isPlaying
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
                aria-label={
                  currentTrack && currentTrack.id === track.id && isPlaying
                    ? "Pause"
                    : "Play"
                }
              >
                {currentTrack && currentTrack.id === track.id && isPlaying ? (
                  <Pause size={18} />
                ) : (
                  <Play size={18} />
                )}
              </button>
              
              <div className="ml-4 flex-grow">
                <h3 className="font-medium">{track.title}</h3>
                <p className="text-sm text-muted-foreground">{track.artist}</p>
              </div>
              
              <div className="flex-shrink-0 ml-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary">
                  Audio
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
