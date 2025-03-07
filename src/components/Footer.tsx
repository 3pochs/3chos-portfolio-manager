
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative pt-12 pb-6 mt-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-6/12 lg:w-4/12 mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-3">3chos</h3>
            <p className="text-muted-foreground max-w-xs">
              Creating at the intersection of technology, chemistry, security, and sound.
            </p>
          </div>
          
          <div className="w-full md:w-6/12 lg:w-8/12">
            <div className="flex flex-wrap">
              <div className="w-full sm:w-4/12 mb-8 sm:mb-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Explore</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="#music" className="text-muted-foreground hover:text-foreground transition-colors">
                      Music
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="w-full sm:w-8/12">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Contact</h3>
                <p className="text-muted-foreground">
                  Feel free to reach out for collaborations or just to say hi!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} 3chos. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <span className="inline-flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">SoundCloud</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.56 8.87V17h1.98V8.87a.7.7 0 0 0-.7-.7.7.7 0 0 0-.69.7zM8.07 11v6h1.98v-6a.7.7 0 0 0-.7-.7.7.7 0 0 0-.69.7zm-3.5 2.47v3.5h1.98v-3.5a.7.7 0 0 0-.7-.7.7.7 0 0 0-.69.7zM.48 14.9v.98h2v-.98c0-.38-.3-.7-.67-.7-.38.01-.69.32-.69.7zM20.5 7c-.7 0-1.4.15-2 .4V17h7.43a2.5 2.5 0 0 0 0-5 4 4 0 0 0-4-5h-1.43zm-5.23.7a.7.7 0 0 0-.7.7V17h1.98V8.4a.7.7 0 0 0-.69-.7z" />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
