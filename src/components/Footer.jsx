import SocialIcon from "./SocialIcon";
import { SOCIALS } from "../data/social";

export default function Footer() {
  return (
    <footer className="border-t border-border px-[max(20px,5vw)] py-8">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5">
        <div>
          <div className="font-display text-[1rem] font-extrabold text-fg">
            Emmanuel Ngene <span className="text-accent">&middot;</span> Emmy.codes
          </div>
          <div className="mt-1 text-[0.8rem] text-fg2">&copy; 2026 Emmanuel Ngene (Emmy). Full-stack developer in Nigeria.</div>
        </div>
        <div className="flex gap-2.5">
          {SOCIALS.map((social) => (
            <SocialIcon key={social.label} social={social} size={36} />
          ))}
        </div>
      </div>
    </footer>
  );
}
