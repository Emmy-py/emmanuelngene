const FOOTER_LINKS = [
  { href: "https://github.com/Emmy-py", label: "GitHub" },
  { href: "https://www.linkedin.com/in/emmanuel-ngene-708337263", label: "LinkedIn" },
  { href: "https://x.com/_devemmy", label: "Twitter" },
  { href: "https://www.tiktok.com/@_devemmy?_r=1&_t=ZS-948NFvLYoey", label: "TikTok" },
  { href: "https://letsdap.com", label: "LetDap" },
  { href: "https://greenverify.com.ng", label: "GreenVerify" },
  { href: "https://crypto-traccker.netlify.app/", label: "CryptoTracker" },
  { href: "https://forever-buy-ecommerce.vercel.app/", label: "ForeverBuy" },
];

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3.5 border-t border-border px-[5vw] py-[34px]">
      <div className="font-syne text-[0.9rem] font-bold text-fg">
        Emmanuel <span className="text-accent">Ngene</span> &middot; Software Engineer
      </div>
      <div className="flex flex-wrap gap-5">
        {FOOTER_LINKS.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.65rem] tracking-[0.1em] text-fg2 uppercase no-underline transition-colors duration-200 hover:text-accent"
          >
            {label}
          </a>
        ))}
      </div>
      <div className="font-mono text-[0.6rem] text-fg2 opacity-40">&copy; 2026 Emmanuel Ngene</div>
    </footer>
  );
}
