export type Theme = "light" | "dark";
const STORAGE_KEY = "theme";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
}

export function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

// Вызываем ДО рендера React
export function applyInitialTheme() {
  applyTheme(getInitialTheme());
}
