"use client";

// import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectCardMobile from "./ProjectCardMobile";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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
  {
    id: 4,
    title: "First-Female",
    description: "An ecommerce application specifically for women needs",
    imageUrl: "/projects/first-female.png",
    link: "/projects/first-female",
  },
];

export default function ProjectsGrid() {
  // const [hasHover, setHasHover] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Mobile view
  if (isMobile) {
    return (
      <div className="w-full py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
            My <span className="text-[#f0b429]">Projects</span>
          </h2>

          <div className="space-y-6 pb-8">
            {projects.map((project) => (
              <div key={project.id} className="w-full">
                <ProjectCardMobile
                  imageUrl={project.imageUrl}
                  title={project.title}
                  description={project.description}
                  link={project.link}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop view - keep original design
  return (
    <div className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          My <span className="text-[#f0b429]">Projects</span>
        </h2>

        <div
          className="preview__container flex flex-wrap justify-center gap-8 py-8 min-h-[600px]"
          // onMouseEnter={() => setHasHover(true)}
          // onMouseLeave={() => setHasHover(false)}
          style={{
            display: "flex",
            flexWrap: "wrap",
            placeItems: "center",
            placeContent: "center",
            height: "100%",
          }}
        >
          <style jsx>{`
            .preview__container:has(:hover) .preview:not(:hover) {
              opacity: 0.4;
              transition: opacity 0.3s ease;
            }
          `}</style>

          {projects.map((project, index) => (
            <div
              key={project.id}
              className="preview"
              style={{
                transition: "opacity 0.3s ease",
              }}
            >
              <ProjectCard
                imageUrl={project.imageUrl}
                title={project.title}
                description={project.description}
                index={index}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
