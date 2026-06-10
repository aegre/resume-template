export const THEMES = [
  "dark",
  "navy",
  "burgundy",
  "forest",
  "minimal",
  "slate",
  "indigo",
] as const

export type Theme = (typeof THEMES)[number]

export const THEME_LABELS: Record<Theme, string> = {
  dark: "Dark",
  navy: "Navy",
  burgundy: "Burgundy",
  forest: "Forest",
  minimal: "Minimal",
  slate: "Slate",
  indigo: "Indigo",
}

export const THEME_SWATCHES: Record<
  Theme,
  { background: string; highlight: string; accent: string }
> = {
  dark: {
    background: "#071425",
    highlight: "#efb032",
    accent: "#fff2cc",
  },
  navy: {
    background: "#0c1929",
    highlight: "#4a90d9",
    accent: "#a8c7e8",
  },
  burgundy: {
    background: "#ffffff",
    highlight: "#d46b4b",
    accent: "#7c1e3b",
  },
  forest: {
    background: "#f7faf8",
    highlight: "#2d6a4f",
    accent: "#40916c",
  },
  minimal: {
    background: "#ffffff",
    highlight: "#2d3748",
    accent: "#2d3748",
  },
  slate: {
    background: "#f1f5f9",
    highlight: "#0f172a",
    accent: "#64748b",
  },
  indigo: {
    background: "#ffffff",
    highlight: "#3730a3",
    accent: "#4f46e5",
  },
}

export const STORAGE_KEY = "resume-theme"

export function previewTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme)
}

export function applyTheme(theme: Theme): void {
  previewTheme(theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

export function getStoredTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved != null && THEMES.includes(saved as Theme)) {
    return saved as Theme
  }

  return "dark"
}
