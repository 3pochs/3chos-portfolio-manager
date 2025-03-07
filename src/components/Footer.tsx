
import React from 'react';
import { GitHub, Mail, Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-muted-foreground mb-4">
              Feel free to reach out for collaborations or just a friendly hello.
            </p>
            <div className="space-y-2">
              <a
                href="https://github.com/3poch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm hover:text-primary transition-colors"
              >
                <GitHub className="w-4 h-4 mr-2" />
                github/3poch
              </a>
              <a
                href="https://discord.com/users/collaps3d"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm hover:text-primary transition-colors"
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
                collaps3d
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="grid grid-cols-1 gap-2">
              <a 
                href="#" 
                className="text-sm hover:text-primary transition-colors"
              >
                Home
              </a>
              <a 
                href="#about" 
                className="text-sm hover:text-primary transition-colors"
              >
                About
              </a>
              <a 
                href="#projects" 
                className="text-sm hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a 
                href="#music" 
                className="text-sm hover:text-primary transition-colors"
              >
                Music
              </a>
            </nav>
          </div>
          
          {/* Credits */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About This Site</h3>
            <p className="text-sm text-muted-foreground">
              Built with React, Tailwind CSS, and powered by Supabase.
              Designed and developed by 3chos.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} 3chos. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a
                href="https://github.com/3poch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <GitHub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
