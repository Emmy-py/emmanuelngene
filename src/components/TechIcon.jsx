import { Braces } from "lucide-react";

// Brand colours too dark to see on the dark themes fall back to the text colour.
function isDark(hex) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
}

export default function TechIcon({ tech, size = 22 }) {
  const { icon } = tech;
  if (!icon) return <Braces size={size} className="text-accent" aria-hidden="true" />;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={isDark(icon.hex) ? "currentColor" : `#${icon.hex}`}
      className="text-fg"
    >
      <path d={icon.path} />
    </svg>
  );
}
