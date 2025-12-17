export interface ProjectImage {
  url: string;
  type: "mobile" | "desktop";
}

export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  imageUrl: string; // Used for project cards in grid view
  link: string; // Keep original link for external reference
  projectOverview?: string;
  problemStatement?: string;
  myRole?: string[];
  images?: ProjectImage[]; // Array of images for stacked gallery (required for detail page)
}

export const projects: ProjectDetail[] = [
  {
    id: 1,
    title: "Never Forget",
    description: "An app which remembers, so you dont have to.",
    imageUrl: "/projects/neverForget.png",
    link: "https://github.com/sooraj002/neverforget",
    projectOverview:
      "Never Forget is a comprehensive reminder and task management application designed to help users stay organized and never miss important events. The app consolidates reminders, tasks, and notifications into a unified system that enhances productivity by tracking important dates, managing to-do lists, and providing timely alerts. The application offers intuitive interfaces for different types of reminders and supports seamless integration across devices.",
    problemStatement:
      "Having a personalized, unified system that integrates all reminders and tasks makes it easy to stay organized and make informed decisions about time management through detailed tracking and notifications.",
    myRole: [
      "User research",
      "Market Research",
      "Stakeholder Interviews",
      "Brainstorming",
      "Create Design system",
      "UI design",
    ],
    images: [
      { url: "/projects/neverForget.png", type: "mobile" },
    ],
  },
  {
    id: 2,
    title: "Mi Amor",
    description:
      "Mi amor, making unofficial relationships official, a dating app for people to find their love",
    imageUrl: "/projects/mi-amor.png",
    link: "https://mi-amor-green.vercel.app/",
    projectOverview:
      "Mi Amor is a modern dating application designed to help people find meaningful connections. The platform provides a safe and intuitive environment for users to discover potential matches, engage in conversations, and build relationships. The app offers comprehensive matching functionalities, secure messaging, and profile management features for different levels of user engagement.",
    problemStatement:
      "Having a personalized, unified platform that integrates user preferences and matching algorithms makes it easy to find compatible partners through detailed profiles and intelligent recommendations.",
    myRole: [
      "User research",
      "Market Research",
      "Stakeholder Interviews",
      "Brainstorming",
      "Create Design system",
      "UI design",
    ],
    images: [
      { url: "/projects/mi-amor.png", type: "mobile" },
    ],
  },
  {
    id: 3,
    title: "First Startup",
    description:
      "A website for a finance private limited, for them to reach more audience while creating an easier access for the users to buy their services",
    imageUrl: "/projects/firstStartup.png",
    link: "https://www.firststartup.in/",
    projectOverview:
      "First Startup is a comprehensive financial services website designed to help a finance private limited company reach a broader audience and provide easier access to their services. The platform consolidates information about financial products, services, and solutions to enhance customer engagement by showcasing offerings, facilitating service inquiries, and supporting business growth through an intuitive online presence.",
    problemStatement:
      "Having a personalized, unified digital platform that integrates all financial services and information makes it easy for customers to access services and make informed decisions through detailed service descriptions and streamlined inquiry processes.",
    myRole: [
      "User research",
      "Market Research",
      "Stakeholder Interviews",
      "Brainstorming",
      "Create Design system",
      "UI design",
    ],
    images: [
      { url: "/projects/firstStartup.png", type: "desktop" },
      { url: "/projects/firstStartup2.png", type: "mobile" },
    ],
  },
  {
    id: 4,
    title: "Kaizen Notes",
    description:
      "A note access repository for aktu students, to access notes of all subjects.",
    imageUrl: "/projects/notes.png",
    link: "https://notes.kaizentechsociety.xyz/",
    projectOverview:
      "Kaizen Notes is a comprehensive note repository platform designed specifically for AKTU students to access study materials for all subjects. The platform consolidates notes, study materials, and resources from various subjects to enhance learning efficiency by organizing content by subject, providing easy search functionality, and supporting academic success through structured access to educational resources.",
    problemStatement:
      "Having a personalized, unified system that integrates notes from different subjects makes it easy for students to access study materials and make informed study decisions through detailed organization and search capabilities.",
    myRole: [
      "User research",
      "Market Research",
      "Stakeholder Interviews",
      "Brainstorming",
      "Create Design system",
      "UI design",
    ],
    images: [
      { url: "/projects/notes.png", type: "desktop" },
    ],
  },
  {
    id: 5,
    title: "Adlantic",
    description: "A landing page for the company Adlantic",
    imageUrl: "/projects/adlantic.png",
    link: "https://www.adlantic.in/",
    projectOverview:
      "Adlantic is a professional landing page designed to showcase the company's services, values, and offerings. The platform provides a comprehensive overview of Adlantic's business, consolidating information about services, team, and contact details to enhance brand visibility by presenting company information, facilitating customer inquiries, and supporting business growth through an engaging online presence.",
    problemStatement:
      "Having a personalized, unified digital presence that integrates all company information makes it easy for potential clients to learn about services and make informed decisions through detailed company profiles and streamlined contact processes.",
    myRole: [
      "User research",
      "Market Research",
      "Stakeholder Interviews",
      "Brainstorming",
      "Create Design system",
      "UI design",
    ],
    images: [
      { url: "/projects/adlantic.png", type: "desktop" },
    ],
  },
  {
    id: 6,
    title: "Playgamez",
    description:
      "An e-commerce website for gamers, to buy gaming related products and accessories",
    imageUrl: "/projects/playgamez.png",
    link: "https://playgamez.in/",
    projectOverview:
      "Playgamez is a comprehensive e-commerce platform designed specifically for gamers to purchase gaming-related products and accessories. The platform consolidates products, categories, and shopping features to enhance the shopping experience by organizing items by category, providing detailed product information, and supporting seamless transactions through an intuitive online store interface.",
    problemStatement:
      "Having a personalized, unified e-commerce system that integrates products from different categories makes it easy for gamers to find and purchase items and make informed buying decisions through detailed product listings and streamlined checkout processes.",
    myRole: [
      "User research",
      "Market Research",
      "Stakeholder Interviews",
      "Brainstorming",
      "Create Design system",
      "UI design",
    ],
    images: [
      { url: "/projects/playgamez.png", type: "desktop" },
    ],
  },
  {
    id: 7,
    title: "Threads-backend",
    description:
      "A backend for a social media app, Threads/Twitter using graphql",
    imageUrl: "/projects/threads.png",
    link: "https://github.com/krishkh/threads-backend-graphql",
    projectOverview:
      "Threads-backend is a comprehensive GraphQL-based backend system designed for a social media application similar to Threads/Twitter. The platform consolidates user management, content creation, and social interactions to enhance application functionality by handling user authentication, managing posts and threads, and supporting real-time social features through a robust API infrastructure.",
    problemStatement:
      "Having a personalized, unified backend system that integrates all social media functionalities makes it easy to build scalable applications and make informed architectural decisions through detailed API design and efficient data management.",
    myRole: [
      "System Architecture",
      "API Design",
      "Database Design",
      "GraphQL Schema Design",
      "Backend Development",
      "Testing",
    ],
    images: [
      { url: "/projects/threads.png", type: "desktop" },
    ],
  },
  {
    id: 8,
    title: "Tic-Tac-Multi",
    description:
      "A backend for a Tic-Tac-Toe game, allowing multiple players to play the game simultaneously",
    imageUrl: "/projects/tic-tac-toe.png",
    link: "https://github.com/krishkh/Tic-Tac-Multi",
    projectOverview:
      "Tic-Tac-Multi is a comprehensive backend system designed for a multiplayer Tic-Tac-Toe game that allows multiple players to play simultaneously. The platform consolidates game management, player matching, and real-time game state synchronization to enhance gaming experience by managing multiple game sessions, handling player turns, and supporting concurrent gameplay through a robust real-time infrastructure.",
    problemStatement:
      "Having a personalized, unified backend system that integrates game logic and real-time communication makes it easy to support multiple concurrent games and make informed game state decisions through detailed session management and efficient synchronization.",
    myRole: [
      "System Architecture",
      "Game Logic Design",
      "Real-time Communication",
      "Database Design",
      "Backend Development",
      "Testing",
    ],
    images: [
      { url: "/projects/tic-tac-toe.png", type: "desktop" },
    ],
  },
  {
    id: 9,
    title: "bidding-portal",
    description:
      "A CRM designed to suit the needs of a buisness streamlining managing tenders",
    imageUrl: "/projects/bidding-portal.png",
    link: "/projects/nda",
    projectOverview:
      "The bidding portal is a comprehensive CRM system designed to streamline tender management for businesses. The platform consolidates tender information, bidding processes, and business workflows to enhance operational efficiency by tracking tender opportunities, managing bid submissions, and supporting decision-making through detailed analytics and workflow automation.",
    problemStatement:
      "Having a personalized, unified system that integrates data from different tender sources makes it easy to manage bidding processes and make informed business decisions through detailed tender tracking and streamlined submission workflows.",
    myRole: [
      "User research",
      "Market Research",
      "Stakeholder Interviews",
      "Brainstorming",
      "Create Design system",
      "UI design",
    ],
    images: [
      { url: "/projects/bidding-portal.png", type: "desktop" },
    ],
  },
];

export function getProjectById(id: number): ProjectDetail | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find(
    (project) =>
      project.title.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );
}

