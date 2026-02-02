export type Theme = 'light' | 'dark';
const KEY = 'theme';

export function getTheme(): Theme {
  const saved = localStorage.getItem(KEY);
  return saved === 'light' || saved === 'dark' ? saved : 'dark'; // по умолчанию тёмная
}

export function setTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(next);
  localStorage.setItem(KEY, next);
}

export function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

export function initTheme() {
  setTheme(getTheme());
}
