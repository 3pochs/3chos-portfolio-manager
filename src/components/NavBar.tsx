
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { Menu, X } from 'lucide-react';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          <span className="relative">
            <span className="absolute -inset-1 rounded-lg bg-primary/5 transform -skew-x-12"></span>
            <span className="relative">3chos</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#music">Music</NavLink>
          {isAuthenticated && (
            <Link 
              to="/admin" 
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-secondary"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border animate-slide-down">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="#projects" onClick={() => setIsMobileMenuOpen(false)}>
              Projects
            </MobileNavLink>
            <MobileNavLink href="#music" onClick={() => setIsMobileMenuOpen(false)}>
              Music
            </MobileNavLink>
            {isAuthenticated && (
              <Link
                to="/admin"
                className="px-4 py-2 w-full text-center rounded-full bg-primary text-primary-foreground font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-foreground/80 hover:text-foreground font-medium link-underline transition-colors"
    >
      {children}
    </a>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, onClick }) => {
  return (
    <a
      href={href}
      className="block px-4 py-2 text-foreground/80 hover:text-foreground font-medium rounded-md hover:bg-secondary transition-colors"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default NavBar;
