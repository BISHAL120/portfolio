export const site = {
  name: "Monerul Islam Bishal",
  shortName: "Bishal",
  role: "Full Stack Developer",
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6",
  email: "monerulmd5@gmail.com",
  phone: "+880 1312 604691",
  resume: "/assets/Bishal Resume V2.pdf",
  availability: "Open to full-stack roles and select freelance work",
  summary:
    "I build production web apps end to end — from database schema and API design to the last animation frame. Three years of shipping React, Next.js, Node and PostgreSQL, with a bias for speed and interfaces that feel alive.",
  socials: [
    { label: "GitHub", href: "https://github.com/BISHAL120", handle: "@BISHAL120" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/monerulmd5/",
      handle: "in/monerulmd5",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/+8801312604691",
      handle: "+880 1312 604691",
    },
    { label: "Email", href: "mailto:monerulmd5@gmail.com", handle: "monerulmd5@gmail.com" },
  ],
  stack: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "MongoDB",
    "Tailwind",
    "Three.js",
  ],
  skillGroups: [
    {
      title: "Frontend",
      items: [
        "React / Next.js (App Router)",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion / GSAP",
        "Three.js / React Three Fiber",
      ],
    },
    {
      title: "Backend",
      items: [
        "Node.js / Express",
        "REST API design",
        "Auth & sessions (NextAuth)",
        "Prisma ORM",
        "Server actions",
      ],
    },
    {
      title: "Data & infra",
      items: [
        "PostgreSQL",
        "MongoDB",
        "Firebase",
        "AWS S3",
        "Vercel / Docker basics",
      ],
    },
    {
      title: "Craft",
      items: [
        "Performance budgets",
        "Accessibility",
        "Design systems",
        "Git workflows",
        "Playwright / testing",
      ],
    },
  ],
  principles: [
    {
      number: "01",
      title: "Ship the smallest real thing",
      body: "A working vertical slice beats a perfect plan. I break products into demoable increments and keep the feedback loop tight.",
    },
    {
      number: "02",
      title: "Performance is a feature",
      body: "Budgets for JS, images and fonts. Server components by default, client islands only where interaction demands it.",
    },
    {
      number: "03",
      title: "Interfaces should feel alive",
      body: "Motion with intent: directional transitions, physical easing, and a hard stop for prefers-reduced-motion.",
    },
  ],
} as const;

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  stack: string[];
  href?: string;
  kind: "Live product" | "Client work" | "Experiment";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "drofy",
    title: "DROFY",
    tagline: "Drop-shipping, minus the spreadsheet chaos",
    description:
      "A storefront and operations platform for drop-shippers: product catalog, order pipeline, inventory and a sales dashboard in one place.",
    image: "/projectImage/drofy.png",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
    href: "https://drofy.codewithbishal.dev",
    kind: "Live product",
    featured: true,
  },
  {
    slug: "eco-bazar",
    title: "Eco Bazar",
    tagline: "A commerce storefront built around sustainability",
    description:
      "Category browsing, cart and checkout flows for an eco-focused marketplace, tuned for fast first paint on mid-range phones.",
    image: "/projectImage/project2.png",
    stack: ["React", "Node.js", "MongoDB"],
    kind: "Client work",
    featured: true,
  },
  {
    slug: "tasker",
    title: "Tasker",
    tagline: "Task management without the ceremony",
    description:
      "Boards, assignments and deadlines for small teams, with optimistic updates so the UI never waits on the network.",
    image: "/projectImage/project6.png",
    stack: ["Next.js", "PostgreSQL", "Prisma"],
    kind: "Client work",
    featured: true,
  },
  {
    slug: "ecommerce",
    title: "E-Commerce",
    tagline: "A full storefront, from catalog to checkout",
    description:
      "Product listing, filtering, cart and order management with an admin panel for inventory and fulfilment.",
    image: "/projectImage/project1.png",
    stack: ["React", "Express", "MongoDB"],
    kind: "Client work",
  },
  {
    slug: "shoe-store",
    title: "Shoe Store",
    tagline: "Product-first sneaker storefront",
    description:
      "A visual storefront with size selection, quick add-to-cart and a checkout flow built for mobile thumbs.",
    image: "/projectImage/project3.png",
    stack: ["Next.js", "Tailwind", "Stripe"],
    kind: "Client work",
  },
  {
    slug: "plumber-x",
    title: "Plumber X",
    tagline: "Local service booking that converts",
    description:
      "Service pages, quote requests and a lightweight booking flow for a local trade business.",
    image: "/projectImage/project4.png",
    stack: ["React", "Node.js", "MongoDB"],
    kind: "Client work",
  },
  {
    slug: "hidra-ar",
    title: "Hidra AR",
    tagline: "An immersive landing page for an AR studio",
    description:
      "Scroll-driven storytelling with WebGL accents, built to degrade gracefully on low-power devices.",
    image: "/projectImage/project5.png",
    stack: ["Next.js", "Three.js", "GSAP"],
    kind: "Experiment",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
