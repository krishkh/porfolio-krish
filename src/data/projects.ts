export interface ProjectImage {
  url: string;
  type: "mobile" | "desktop";
}

export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  projectOverview?: string;
  problemStatement?: string;
  myRole?: string[];
  images?: ProjectImage[];
}

export const projects: ProjectDetail[] = [
  {
    id: 1,
    title: "Never Forget",
    description:
      "A self-help app that listens to you and preserves your memories so nothing important is ever lost.",
    imageUrl: "/projects/neverForget.png",
    link: "https://github.com/sooraj002/neverforget",
    projectOverview:
      "Never Forget is a self-help and memory-assistance application designed to act as a personal memory companion. The app continuously listens (with user consent), captures important moments, thoughts, and conversations, and organizes them into meaningful memories. It helps users reflect, recall past experiences, and maintain emotional clarity over time.",
    problemStatement:
      "People forget meaningful moments, thoughts, and emotions over time, which can impact mental well-being and self-reflection. A system is needed to preserve personal memories effortlessly without relying on manual input.",
    myRole: [
      "Product ideation",
      "User research",
      "Mental health use-case analysis",
      "System flow design",
      "UI/UX design",
    ],
    images: [{ url: "/projects/neverForget.png", type: "mobile" }],
  },
  {
    id: 2,
    title: "Mi Amor",
    description:
      "A relationship-focused platform to make unofficial relationships official.",
    imageUrl: "/projects/mi-amor.png",
    link: "https://mi-amor-green.vercel.app/",
    projectOverview:
      "Mi Amor is a relationship-centric web platform designed for couples who are already emotionally connected but not officially committed. Instead of traditional dating mechanics, the app focuses on mutual acknowledgment, emotional clarity, and formalizing an existing bond in a private and meaningful way.",
    problemStatement:
      "Many people are emotionally involved but lack clarity or acknowledgment in their relationships. A platform is needed to help couples define, affirm, and validate their connection without the noise of conventional dating apps.",
    myRole: [
      "Product concept definition",
      "User research",
      "Relationship flow design",
      "Design system creation",
      "UI/UX design",
    ],
    images: [{ url: "/projects/mi-amor.png", type: "mobile" }],
  },
  {
    id: 3,
    title: "First Startup",
    description:
      "A corporate website for a finance company to expand reach and simplify service access.",
    imageUrl: "/projects/firstStartup.png",
    link: "https://www.firststartup.in/",
    projectOverview:
      "First Startup is a professional financial services website built to help a finance company reach a broader audience. The platform presents services clearly, builds trust through structured content, and enables potential customers to easily understand and inquire about offerings.",
    problemStatement:
      "Financial services are often complex and difficult to understand online. A clear and structured digital presence is required to improve trust and accessibility.",
    myRole: [
      "Stakeholder discussions",
      "User & market research",
      "Information architecture",
      "Design system creation",
      "UI/UX design",
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
      "A centralized notes repository for AKTU students to access subject-wise study material.",
    imageUrl: "/projects/notes.png",
    link: "https://notes.kaizentechsociety.xyz/",
    projectOverview:
      "Kaizen Notes is an academic resource platform built for AKTU students to access organized notes and study materials across all subjects. The platform simplifies learning by offering structured, subject-wise content in one place.",
    problemStatement:
      "Students struggle to find reliable and organized study materials. A centralized platform is needed to improve accessibility and learning efficiency.",
    myRole: [
      "User research (student feedback)",
      "Content structure planning",
      "UX strategy",
      "Design system creation",
      "UI/UX design",
    ],
    images: [{ url: "/projects/notes.png", type: "desktop" }],
  },
  {
    id: 5,
    title: "Adlantic",
    description:
      "A professional landing page showcasing Adlantic’s services and brand identity.",
    imageUrl: "/projects/adlantic.png",
    link: "https://www.adlantic.in/",
    projectOverview:
      "Adlantic is a modern landing page designed to clearly communicate the company’s services, values, and expertise. The website focuses on strong branding, clean visuals, and clear calls-to-action to convert visitors into leads.",
    problemStatement:
      "Businesses need a strong and credible first impression online. A focused landing page helps communicate value and drive customer inquiries.",
    myRole: [
      "Brand research",
      "Market research",
      "Content structure planning",
      "Design system creation",
      "UI/UX design",
    ],
    images: [{ url: "/projects/adlantic.png", type: "desktop" }],
  },
  {
    id: 6,
    title: "Playgamez",
    description:
      "An e-commerce platform for gamers to buy gaming products and accessories.",
    imageUrl: "/projects/playgamez.png",
    link: "https://playgamez.in/",
    projectOverview:
      "Playgamez is an e-commerce platform tailored specifically for gamers. It offers categorized products, detailed listings, and a smooth shopping experience designed around gaming accessories and peripherals.",
    problemStatement:
      "Generic e-commerce platforms do not cater well to niche gaming audiences. A focused platform improves product discovery and purchasing decisions.",
    myRole: [
      "User research",
      "E-commerce UX planning",
      "Product categorization strategy",
      "Design system creation",
      "UI/UX design",
    ],
    images: [{ url: "/projects/playgamez.png", type: "desktop" }],
  },
  {
    id: 7,
    title: "Threads-backend",
    description:
      "A GraphQL-based backend for a social media platform similar to Threads/Twitter.",
    imageUrl: "/projects/threads.png",
    link: "https://github.com/krishkh/threads-backend-graphql",
    projectOverview:
      "Threads-backend is a scalable GraphQL backend built to support a social media application. It manages authentication, posts, user interactions, and data fetching through a flexible and well-structured API.",
    problemStatement:
      "Social media platforms require scalable and flexible APIs. A GraphQL-based backend simplifies data fetching and improves developer experience.",
    myRole: [
      "System architecture design",
      "GraphQL schema design",
      "API development",
      "Database modeling",
      "Backend development",
      "Testing",
    ],
    images: [{ url: "/projects/threads.png", type: "desktop" }],
  },
  {
    id: 8,
    title: "Tic-Tac-Multi",
    description: "A real-time multiplayer backend for a Tic-Tac-Toe game.",
    imageUrl: "/projects/tic-tac-toe.png",
    link: "https://github.com/krishkh/Tic-Tac-Multi",
    projectOverview:
      "Tic-Tac-Multi is a backend system that enables multiple players to play Tic-Tac-Toe simultaneously. It manages game sessions, player turns, and real-time synchronization for smooth multiplayer gameplay.",
    problemStatement:
      "Multiplayer games require accurate real-time state management. A backend is needed to handle multiple concurrent game sessions reliably.",
    myRole: [
      "System architecture",
      "Game logic design",
      "Real-time communication",
      "Database design",
      "Backend development",
      "Testing",
    ],
    images: [{ url: "/projects/tic-tac-toe.png", type: "desktop" }],
  },
  {
    id: 9,
    title: "bidding-portal",
    description:
      "A CRM system designed to streamline tender and bidding management.",
    imageUrl: "/projects/bidding-portal.png",
    link: "/projects/nda",
    projectOverview:
      "The bidding portal is a custom CRM built to help businesses manage tenders efficiently. It centralizes tender data, tracks bidding workflows, and improves visibility into ongoing and upcoming opportunities.",
    problemStatement:
      "Manual tender management is inefficient and error-prone. A centralized CRM is needed to manage bids, workflows, and decision-making effectively.",
    myRole: [
      "Stakeholder interviews",
      "Business workflow analysis",
      "Product ideation",
      "Design system creation",
      "UI/UX design",
    ],
    images: [{ url: "/projects/bidding-portal.png", type: "desktop" }],
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
