import {
  siDocker,
  siExpress,
  siFastapi,
  siGit,
  siJavascript,
  siKubernetes,
  siMongodb,
  siMui,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVite,
} from "simple-icons";

// Brand marks (simple-icons, CC0). Only technologies already claimed elsewhere on the site.
// `icon: null` renders a generic glyph for concepts that have no logo.
export const TECH = {
  react: { name: "React", icon: siReact },
  next: { name: "Next.js", icon: siNextdotjs },
  reactNative: { name: "React Native", icon: siReact },
  typescript: { name: "TypeScript", icon: siTypescript },
  javascript: { name: "JavaScript", icon: siJavascript },
  tailwind: { name: "Tailwind CSS", icon: siTailwindcss },
  mui: { name: "Material UI", icon: siMui },
  node: { name: "Node.js", icon: siNodedotjs },
  nest: { name: "NestJS", icon: siNestjs },
  express: { name: "Express", icon: siExpress },
  python: { name: "Python", icon: siPython },
  fastapi: { name: "FastAPI", icon: siFastapi },
  rest: { name: "REST APIs", icon: null },
  websockets: { name: "WebSockets", icon: null },
  postgres: { name: "PostgreSQL", icon: siPostgresql },
  mongo: { name: "MongoDB", icon: siMongodb },
  docker: { name: "Docker", icon: siDocker },
  kubernetes: { name: "Kubernetes", icon: siKubernetes },
  git: { name: "Git", icon: siGit },
  cicd: { name: "CI/CD", icon: null },
  vite: { name: "Vite", icon: siVite },
};

export const HERO_TECH = ["react", "next", "typescript", "node", "nest", "python", "postgres", "mongo"];

export const SKILL_GROUPS = [
  { title: "Frontend & Mobile", items: ["react", "next", "reactNative", "typescript", "javascript", "tailwind", "mui"] },
  { title: "Backend", items: ["node", "nest", "express", "python", "fastapi", "rest", "websockets"] },
  { title: "Databases", items: ["postgres", "mongo"] },
  { title: "DevOps & Tools", items: ["docker", "kubernetes", "cicd", "git", "vite"] },
];
