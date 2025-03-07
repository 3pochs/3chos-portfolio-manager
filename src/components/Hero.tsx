
import React, { useEffect, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';

const Hero: React.FC = () => {
  const { sections } = useAdmin();
  const heroSection = sections.find(section => section.type === 'hero');
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!heroSection) return null;

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background Elements */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
      >
        <div className="absolute -top-[30%] -right-[10%] w-[40%] h-[70%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute top-[10%] -left-[5%] w-[30%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full mb-6 animate-fade-in">
            <span className="relative top-px">3chos</span>
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in [animation-delay:200ms] tracking-tight">
            <span className="block">{heroSection.title}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in [animation-delay:400ms]">
            {heroSection.content.subtitle}
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in [animation-delay:600ms]">
            {heroSection.content.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:800ms]">
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all shadow-sm"
            >
              View My Work
            </a>
            <a 
              href="#about" 
              className="px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-all"
            >
              About Me
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-muted-foreground"
        >
          <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
