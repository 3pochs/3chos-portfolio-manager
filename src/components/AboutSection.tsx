
import React from 'react';
import { useAdmin } from '@/context/AdminContext';

const AboutSection: React.FC = () => {
  const { sections } = useAdmin();
  const aboutSection = sections.find(section => section.type === 'about');
  
  if (!aboutSection) return null;
  
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          <div className="w-full md:w-2/5">
            <span className="inline-block px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full mb-4">
              About
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{aboutSection.title}</h2>
            <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
            
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {aboutSection.content.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm border border-border rounded-full bg-background"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-3/5">
            <div className="prose max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                {aboutSection.content.bio}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl transform transition-transform hover:translate-y-[-5px]">
                  <h3 className="font-semibold mb-3">Technology</h3>
                  <p className="text-muted-foreground">
                    Building software solutions and exploring digital systems.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-2xl transform transition-transform hover:translate-y-[-5px]">
                  <h3 className="font-semibold mb-3">Chemistry</h3>
                  <p className="text-muted-foreground">
                    Analyzing compounds and understanding molecular interactions.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-2xl transform transition-transform hover:translate-y-[-5px]">
                  <h3 className="font-semibold mb-3">Security</h3>
                  <p className="text-muted-foreground">
                    Testing vulnerabilities and improving system protections.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-2xl transform transition-transform hover:translate-y-[-5px]">
                  <h3 className="font-semibold mb-3">Music</h3>
                  <p className="text-muted-foreground">
                    Creating sonic experiences and audio compositions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
