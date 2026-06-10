export const FONTS = [
  "open-sans",
  "inter",
  "source-sans-3",
  "ibm-plex-sans",
] as const

export type Font = (typeof FONTS)[number]

export const FONT_LABELS: Record<Font, string> = {
  "open-sans": "Open Sans",
  inter: "Inter",
  "source-sans-3": "Source Sans 3",
  "ibm-plex-sans": "IBM Plex Sans",
}

export const FONT_FAMILIES: Record<Font, string> = {
  "open-sans": "'Open Sans', sans-serif",
  inter: "'Inter', sans-serif",
  "source-sans-3": "'Source Sans 3', sans-serif",
  "ibm-plex-sans": "'IBM Plex Sans', sans-serif",
}

export const STORAGE_KEY = "resume-font"

export function previewFont(font: Font): void {
  document.documentElement.setAttribute("data-font", font)
}

export function applyFont(font: Font): void {
  previewFont(font)
  localStorage.setItem(STORAGE_KEY, font)
}

export function getStoredFont(): Font {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved != null && FONTS.includes(saved as Font)) {
    return saved as Font
  }

  return "open-sans"
}
