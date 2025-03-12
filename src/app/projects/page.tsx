import Background from "@/components/ui/Background";
import ProjectsGrid from "@/components/ProjectsGrid";
import React from "react";

export default function ProjectsPage() {
  return (
    <Background>
      <div className="min-h-screen pt-24">
        {/* Hero section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Projects
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">
            Explore my portfolio of projects. Each card represents a unique
            project I've worked on. Hover over a card to see more details and
            click to visit the project.
          </p>
        </div>

        {/* Projects grid */}
        <ProjectsGrid />
      </div>
    </Background>
  );
}
