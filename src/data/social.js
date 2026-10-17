import { siGithub, siInstagram, siTiktok, siX } from "simple-icons";

// LinkedIn isn't in simple-icons (trademark request), so its mark is inlined here.
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

// Profile links; rendered with rel="me" so search engines tie them to this site.
export const SOCIALS = [
  { label: "GitHub", handle: "Emmy-py", href: "https://github.com/Emmy-py", path: siGithub.path },
  {
    label: "LinkedIn",
    handle: "Emmanuel Ngene",
    href: "https://www.linkedin.com/in/emmanuel-ngene-708337263",
    path: LINKEDIN_PATH,
  },
  { label: "X (Twitter)", handle: "@_devemmy", href: "https://x.com/_devemmy", path: siX.path },
  {
    label: "Instagram (portfolio)",
    handle: "@_devemmy",
    href: "https://www.instagram.com/_devemmy",
    path: siInstagram.path,
  },
  {
    label: "TikTok",
    handle: "@_devemmy",
    href: "https://www.tiktok.com/@_devemmy?_r=1&_t=ZS-948NFvLYoey",
    path: siTiktok.path,
  },
];

export const EMAIL = "emmanuelngene145@gmail.com";
