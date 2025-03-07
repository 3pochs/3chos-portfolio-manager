
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import MusicSection from '@/components/MusicSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <MusicSection />
    </Layout>
  );
};

export default Index;
