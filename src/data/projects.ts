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
    id: 10,
    title: "Eclipse Intel",
    description:
      "A full-stack cyber threat intelligence platform that aggregates ransomware data, dark web activity, and exposed credentials with AI-powered analysis.",
    imageUrl: "/projects/eclipse-intel.png",
    link: "/projects/nda",
    projectOverview:
      "Eclipse Intel is a threat intelligence aggregation platform that centralizes ransomware victim data, dark web forum posts, and exposed credentials into a single dashboard. It has multiple data sources. The platform uses AI to analyze trends, detect potential compromises, and provide actionable insights to security teams before breaches become public.",
    problemStatement:
      "Organizations face increasing threats from ransomware groups and dark web actors, but intelligence is fragmented across scattered sources, visibility is limited, and monitoring is manual and reactive. A centralized platform is needed to aggregate threat data, detect compromises proactively, and deliver actionable insights before breaches become public.",
    myRole: [
      "Full-stack development",
      "System architecture design",
      "Backend API development",
      "Frontend development",
      "AI integration (LangChain/LangGraph)",
      "Database modeling",
    ],
    images: [{ url: "/projects/eclipse-intel.png", type: "desktop" }],
  },
  {
    id: 11,
    title: "Eclipse Intel — Landing Page",
    description:
      "A premium marketing website showcasing Eclipse Intel's cybersecurity threat intelligence platform with interactive 3D globe and animations.",
    imageUrl: "/projects/eclipse-landing.png",
    link: "https://eclipseintel.com",
    projectOverview:
      "Built a high-performance cybersecurity marketing platform using Next.js, Three.js, GSAP, and Sanity CMS. The website showcases Eclipse Intel's threat intelligence capabilities through interactive 3D visualizations, animated storytelling sections, live statistics, and a CMS-powered blog while maintaining strong performance across desktop and mobile devices.",
    myRole: [
      "Frontend development (Next.js 16)",
      "Animation system design (Framer Motion, GSAP)",
      "UI/UX design",
      "Sanity CMS integration",
      "Responsive implementation",
    ],
    images: [{ url: "/projects/eclipse-landing.png", type: "desktop" }],
  },
  {
    id: 11,
    title: "Blosical",
    description:
      "A zero-fee e-commerce platform for independent artists to sell music, merchandise, and experiences directly to fans with instant Stripe payouts.",
    imageUrl: "/projects/blosical.png",
    link: "/projects/blosical",
    projectOverview:
      "Blosical is a premiere storefront platform designed specifically for independent artists. It enables musicians to sell digital releases, physical merchandise, event tickets, and custom experiences directly to their audience—without intermediary fees or revenue cuts. Artists get 100% of their revenue with instant payouts via Stripe within 24 hours. The platform includes customizable landing pages, comprehensive analytics (page views, CTR, referrers), product management for digital and physical goods, order tracking, and social link integration.",
    problemStatement:
      "Independent artists struggle to monetize their work through streaming platforms and traditional marketplaces that take significant revenue cuts. Existing solutions fragment artist presence across multiple platforms, lack customization, impose high fees, and delay payouts. Artists need a unified, professional storefront that gives them complete control over pricing, presentation, and earnings while building direct fan relationships.",
    myRole: [
      "Full-stack development",
      "Frontend architecture",
      "E-commerce platform design",
      "Stripe payment integration",
      "Shippo Shipping API integration",
      "Analytics dashboard development",
      "Landing page builder",
      "Product & order management systems",
    ],
    images: [{ url: "/projects/blosical.png", type: "desktop" }],
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
      project.title.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase(),
  );
}
