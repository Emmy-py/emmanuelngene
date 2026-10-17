// Single source of truth for the canonical domain and the facts used in metadata and
// structured data. Always the apex domain: never www, vercel.app or localhost.
export const SITE_URL = "https://emmycodes.site";

export const PERSON_PHOTO = "/emmanuel-ngene.jpg";
export const HERO_PORTRAIT = "/hero-portrait.webp";
export const OG_IMAGE = "/og-image.png";

export const SOCIAL_PROFILES = [
  "https://github.com/Emmy-py",
  "https://www.linkedin.com/in/emmanuel-ngene-708337263",
  "https://x.com/_devemmy",
  "https://www.tiktok.com/@_devemmy",
  "https://www.instagram.com/_devemmy",
];

export const PERSON = {
  name: "Emmanuel Ngene",
  alternateNames: ["Ngene Emmanuel Somto", "Ngene Emmanuel", "Emmy", "emmycodes"],
  jobTitle: "Full-Stack Software Developer",
  description:
    "Emmanuel Ngene (Emmy) is a full-stack software developer in Nigeria, building scalable web and mobile apps for startups and organizations.",
  email: "emmanuelngene145@gmail.com",
  // Current employers, as stated by Emmanuel (names only).
  worksFor: [
    { name: "Dawnily Technology", url: "https://www.dawnily.com/" },
    { name: "MindTheGap", url: "https://mindthegap.ng/" },
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "NestJS",
    "Express",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "REST APIs",
    "WebSockets",
    "Microservices",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Full-stack web development",
  ],
};

export const absoluteUrl = (path) => SITE_URL + path;
