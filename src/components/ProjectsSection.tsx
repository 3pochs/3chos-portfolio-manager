
import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';

const ProjectsSection: React.FC = () => {
  const { sections, projects } = useAdmin();
  const projectsSection = sections.find(section => section.type === 'projects');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  if (!projectsSection) return null;
  
  // Extract all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  );
  
  // Filter projects based on selected tag
  const filteredProjects = activeFilter
    ? projects.filter(project => project.tags.includes(activeFilter))
    : projects;
  
  return (
    <section id="projects" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm bg-background text-foreground rounded-full mb-4">
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{projectsSection.title}</h2>
          <p className="text-muted-foreground">
            {projectsSection.content.description}
          </p>
        </div>
        
        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-background hover:bg-background/80'
            }`}
            onClick={() => setActiveFilter(null)}
          >
            All
          </button>
          
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === tag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-background/80'
              }`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-background rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      View Project
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-background rounded-xl p-16 text-center">
            <h3 className="text-2xl font-semibold text-primary mb-2">Coming Soon...</h3>
            <p className="text-muted-foreground">Projects in this category are currently in development.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
