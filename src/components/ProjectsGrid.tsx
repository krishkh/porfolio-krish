"use client";

import ProjectCard from "./ProjectCard";

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: "bidding-portal",
    description:
      "A CRM designed to suit the needs of a buisness streamlining managing tenders",
    imageUrl: "/projects/bidding-portal.png",
    link: "/projects/bidding-portal",
  },
  {
    id: 2,
    title: "first-startup",
    description:
      "A website for a finance private limited, for them to reach more audience while creating an easier access for the users to buy their services",
    imageUrl: "/projects/firstStartup.png",
    link: "/projects/first-startup",
  },
  {
    id: 3,
    title: "Adlantic",
    description: "A landing page for the company Adlantic",
    imageUrl: "/projects/adlantic.png",
    link: "/projects/adlantic",
  },
];

export default function ProjectsGrid() {
  return (
    <div className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          My <span className="text-[#f0b429]">Projects</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-8 py-8 group">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              imageUrl={project.imageUrl}
              title={project.title}
              description={project.description}
              index={index}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
