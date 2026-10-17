// Single source of truth for the canonical domain and the facts used in metadata and
// structured data. Always the apex domain: never www, vercel.app or localhost.
export const SITE_URL = "https://emmycodes.site";

export const PERSON_PHOTO = "/emmanuel-ngene.jpg";
export const OG_IMAGE = "/og-image.png";

export const SOCIAL_PROFILES = [
  "https://github.com/Emmy-py",
  "https://www.linkedin.com/in/emmanuel-ngene-708337263",
  "https://x.com/_devemmy",
  "https://www.tiktok.com/@_devemmy",
];

export const PERSON = {
  name: "Emmanuel Ngene",
  alternateNames: ["Ngene Emmanuel Somto", "Ngene Emmanuel", "Emmy", "emmycodes"],
  jobTitle: "Full-Stack Software Developer",
  description:
    "Emmanuel Ngene (Emmy) is a full-stack software developer in Nigeria and the founder of Greenverify Ltd, building scalable web and mobile apps for startups and organizations.",
  email: "emmanuelngene145@gmail.com",
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
  company: { name: "Greenverify Ltd", url: "https://greenverify.com.ng" },
};

export const absoluteUrl = (path) => SITE_URL + path;
