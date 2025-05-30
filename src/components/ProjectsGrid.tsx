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
    link: "https://www.firststartup.in/",
  },
  {
    id: 3,
    title: "Adlantic",
    description: "A landing page for the company Adlantic",
    imageUrl: "/projects/adlantic.png",
    link: "https://www.adlantic.in/",
  },
  {
    id: 4,
    title: "Threads-backend",
    description:
      "A backend for a social media app, Threads/Twitter using graphql",
    imageUrl: "/projects/threads.png",
    link: "https://github.com/krishkh/threads-backend-graphql",
  },
  {
    id: 5,
    title: "Tic-Tac-Multi",
    description:
      "A backend for a Tic-Tac-Toe game, allowing multiple players to play the game simultaneously",
    imageUrl: "/projects/tic-tac-toe.png",
    link: "https://github.com/krishkh/Tic-Tac-Multi",
  },
  {
    id: 6,
    title: "Mi Amor",
    description:
      "Mi amor, making unofficial relationships official, a dating app for people to find their love",
    imageUrl: "/projects/mi-amor.png",
    link: "https://mi-amor-green.vercel.app/",
  },
  {
    id: 7,
    title: "Admin Dashboard",
    description:
      "An Admin Dashboard for a community, to view members, and do quick modifications to their website through this portal",
    imageUrl: "/projects/admin-dashboard.png",
    link: "https://admin.kaizentechsociety.xyz/",
  },
  {
    id: 8,
    title: "Kaizen Notes",
    description:
      "A note access repository for aktu students, to access notes of all subjects.",
    imageUrl: "/projects/notes.png",
    link: "https://admin.kaizentechsociety.xyz/",
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
