import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pf-theme";

// The saved theme is applied to <html data-theme> by an inline script in index.html before
// first paint. State starts at "dark" so it matches the prerendered HTML during hydration,
// then syncs from that attribute.
export default function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "purple" ? "purple" : "dark");
  }, []);

  const changeTheme = useCallback((t) => {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // localStorage unavailable — theme just won't persist
    }
  }, []);

  return [theme, changeTheme];
}
