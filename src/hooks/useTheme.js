import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pf-theme";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const changeTheme = useCallback((t) => {
    setTheme(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // localStorage unavailable — theme just won't persist
    }
  }, []);

  return [theme, changeTheme];
}
