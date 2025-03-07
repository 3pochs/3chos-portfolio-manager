
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import MusicSection from '@/components/MusicSection';
import { useAdmin } from '@/context/AdminContext';

const Index = () => {
  const { isAuthenticated } = useAdmin();
  
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <MusicSection />
      
      {/* Admin Link Helper - Small floating button at bottom right */}
      {!isAuthenticated && (
        <div className="fixed bottom-4 right-4 z-50">
          <Link
            to="/admin"
            className="bg-background/80 backdrop-blur-sm hover:bg-background text-foreground p-3 rounded-full shadow-lg transition-all flex items-center"
            title="Admin Login"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default Index;
