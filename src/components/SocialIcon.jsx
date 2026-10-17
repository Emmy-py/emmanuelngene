export default function SocialIcon({ social, size = 40 }) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="me noopener"
      aria-label={`${social.label}: ${social.handle}`}
      title={social.label}
      className="flex items-center justify-center rounded-xl border border-border bg-card text-fg2 transition-[transform,color,border-color,background,box-shadow] duration-200 hover:-translate-y-1 hover:border-border-accent hover:bg-accent-2 hover:text-white hover:shadow-[0_10px_24px_-10px_var(--glow)]"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={social.path} />
      </svg>
    </a>
  );
}
