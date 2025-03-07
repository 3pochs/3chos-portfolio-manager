
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun, Music, PauseCircle } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isPlaying, togglePlay, currentTrack } = useAudio();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold tracking-tight">
              3chos
            </a>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-10">
            <a
              href="#about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Projects
            </a>
            <a
              href="#music"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Music
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Music Control */}
            {currentTrack && (
              <button
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? <PauseCircle size={20} /> : <Music size={20} />}
              </button>
            )}
            
            {/* Admin Link */}
            <Link
              to="/admin"
              className="hidden md:inline-flex text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Admin
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg shadow-md transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          <a
            href="#about"
            className="block py-2 text-base font-medium hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="#projects"
            className="block py-2 text-base font-medium hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </a>
          <a
            href="#music"
            className="block py-2 text-base font-medium hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Music
          </a>
          <a
            href="#contact"
            className="block py-2 text-base font-medium hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
          <Link
            to="/admin"
            className="block py-2 text-base font-medium hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
