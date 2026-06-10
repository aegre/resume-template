import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import {
  ChevronDown,
  Download,
  Printer,
  RotateCcw,
  Upload,
} from "react-feather"
import { useResume } from "../../context/ResumeContext"
import {
  applyFont,
  FONT_FAMILIES,
  FONT_LABELS,
  FONTS,
  getStoredFont,
  previewFont,
  type Font,
} from "../../utils/font"
import {
  applyTheme,
  getStoredTheme,
  previewTheme,
  THEME_LABELS,
  THEME_SWATCHES,
  THEMES,
  type Theme,
} from "../../utils/theme"
import { downloadResumePdf } from "../../utils/downloadPdf"
import { exportResume } from "../../utils/resume/exportResume"
import { importResumeFile } from "../../utils/resume/importResume"

type OpenPanel = "theme" | "font" | null

const Bar = styled.div`
  position: fixed;
  bottom: var(--space-400);
  right: var(--space-400);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: var(--space-200);
  font-family: var(--font-family);

  @media print {
    display: none !important;
  }
`

const FloatingButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  padding: var(--space-200) var(--space-300);
  border: 1px solid var(--color-highlight);
  background-color: var(--color-background);
  color: var(--color-highlight);
  cursor: pointer;
  font-family: inherit;
  font-size: 11px;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  svg {
    color: var(--color-highlight);
  }
`

const HiddenFileInput = styled.input`
  display: none;
`

const ErrorMessage = styled.span`
  position: absolute;
  bottom: calc(100% + var(--space-200));
  right: 0;
  max-width: 280px;
  padding: var(--space-200);
  border: 1px solid var(--color-highlight);
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 11px;
  text-transform: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
`

const MenuContainer = styled.div`
  position: relative;
`

const Menu = styled.ul`
  position: absolute;
  bottom: calc(100% + var(--space-100));
  right: 0;
  min-width: 200px;
  list-style: none;
  padding: var(--space-100);
  margin: 0;
  border: 1px solid var(--color-highlight);
  background-color: var(--color-background);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
`

const MenuItem = styled.li<{ $active: boolean }>`
  margin: 0;
  padding: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};

  button {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-100);
    width: 100%;
    padding: var(--space-200);
    border: none;
    background: ${({ $active }) =>
      $active ? "rgba(128, 128, 128, 0.15)" : "transparent"};
    cursor: pointer;
    font-family: inherit;
    font-size: 11px;
    text-transform: uppercase;
    text-align: left;
    color: var(--color-text);

    &:hover {
      background: rgba(128, 128, 128, 0.2);
    }
  }
`

const FontPreview = styled.span<{ $fontFamily: string }>`
  font-family: ${({ $fontFamily }) => $fontFamily};
  font-size: 13px;
  text-transform: none;
  color: var(--color-alternative-text);
`

const Swatch = styled.span<{ $colors: (typeof THEME_SWATCHES)[Theme] }>`
  display: flex;
  flex-shrink: 0;
  width: 36px;
  height: 14px;
  border-radius: 2px;
  overflow: hidden;
  border: 1px solid rgba(128, 128, 128, 0.35);

  span:nth-child(1) {
    flex: 2;
    background-color: ${({ $colors }) => $colors.background};
  }

  span:nth-child(2) {
    flex: 1;
    background-color: ${({ $colors }) => $colors.highlight};
  }

  span:nth-child(3) {
    flex: 1;
    background-color: ${({ $colors }) => $colors.accent};
  }
`

const ThemeMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  width: 100%;
  padding: var(--space-200);
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: 11px;
  text-transform: uppercase;
  text-align: left;
  color: var(--color-text);

  &:hover {
    background: rgba(128, 128, 128, 0.2);
  }
`

const ThemeMenuItem = styled.li<{ $active: boolean }>`
  margin: 0;
  padding: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};
  background: ${({ $active }) =>
    $active ? "rgba(128, 128, 128, 0.15)" : "transparent"};

  &:hover {
    background: rgba(128, 128, 128, 0.2);
  }
`

const FloatingControls = () => {
  const { resume, documentTitle, hasOverride, setResume, resetResume } =
    useResume()
  const [theme, setTheme] = useState<Theme>("dark")
  const [font, setFont] = useState<Font>("open-sans")
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedTheme = getStoredTheme()
    const storedFont = getStoredFont()
    setTheme(storedTheme)
    setFont(storedFont)
    applyTheme(storedTheme)
    applyFont(storedFont)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        barRef.current != null &&
        !barRef.current.contains(event.target as Node)
      ) {
        setOpenPanel(null)
        previewTheme(theme)
        previewFont(font)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [theme, font])

  const selectTheme = (next: Theme) => {
    setTheme(next)
    applyTheme(next)
    setOpenPanel(null)
  }

  const selectFont = (next: Font) => {
    setFont(next)
    applyFont(next)
    setOpenPanel(null)
  }

  const handleThemeMenuLeave = () => {
    previewTheme(theme)
  }

  const handleFontMenuLeave = () => {
    previewFont(font)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = async () => {
    setOpenPanel(null)
    setIsDownloading(true)

    try {
      await downloadResumePdf(documentTitle)
    } catch (error) {
      console.error("PDF download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleExportJson = () => {
    setOpenPanel(null)
    setImportError(null)
    exportResume(resume)
  }

  const handleImportClick = () => {
    setOpenPanel(null)
    setImportError(null)
    fileInputRef.current?.click()
  }

  const handleImportChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (file == null) {
      return
    }

    const result = await importResumeFile(file)

    if (!result.valid) {
      setImportError(result.error)
      return
    }

    setImportError(null)
    setResume(result.resume)
  }

  const handleReset = () => {
    setOpenPanel(null)
    setImportError(null)
    resetResume()
  }

  const togglePanel = (panel: OpenPanel) => {
    setOpenPanel((current) => {
      if (current === panel) {
        previewTheme(theme)
        previewFont(font)
        return null
      }

      previewTheme(theme)
      previewFont(font)
      return panel
    })
  }

  return (
    <Bar ref={barRef} data-floating-controls>
      {importError != null && (
        <ErrorMessage role="alert">{importError}</ErrorMessage>
      )}

      <FloatingButton
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        aria-label="Download resume as PDF"
      >
        <Download size={14} />
        {isDownloading ? "Saving…" : "PDF"}
      </FloatingButton>

      <FloatingButton
        type="button"
        onClick={handleExportJson}
        aria-label="Export resume as JSON"
      >
        <Download size={14} />
        JSON
      </FloatingButton>

      <FloatingButton
        type="button"
        onClick={handleImportClick}
        aria-label="Import resume JSON"
      >
        <Upload size={14} />
        Import
      </FloatingButton>

      <HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleImportChange}
      />

      {hasOverride && (
        <FloatingButton
          type="button"
          onClick={handleReset}
          aria-label="Reset resume to default"
        >
          <RotateCcw size={14} />
          Reset
        </FloatingButton>
      )}

      <FloatingButton
        type="button"
        onClick={handlePrint}
        aria-label="Print resume"
      >
        <Printer size={14} />
        Print
      </FloatingButton>

      <MenuContainer>
        <FloatingButton
          type="button"
          aria-haspopup="listbox"
          aria-expanded={openPanel === "font"}
          onClick={() => togglePanel("font")}
        >
          Font: {FONT_LABELS[font]}
          <ChevronDown size={14} />
        </FloatingButton>

        {openPanel === "font" && (
          <Menu role="listbox" onMouseLeave={handleFontMenuLeave}>
            {FONTS.map((option) => (
              <MenuItem key={option} $active={option === font}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option === font}
                  onMouseEnter={() => previewFont(option)}
                  onClick={() => selectFont(option)}
                >
                  {FONT_LABELS[option]}
                  <FontPreview $fontFamily={FONT_FAMILIES[option]}>
                    Senior Frontend Engineer
                  </FontPreview>
                </button>
              </MenuItem>
            ))}
          </Menu>
        )}
      </MenuContainer>

      <MenuContainer>
        <FloatingButton
          type="button"
          aria-haspopup="listbox"
          aria-expanded={openPanel === "theme"}
          onClick={() => togglePanel("theme")}
        >
          Theme: {THEME_LABELS[theme]}
          <ChevronDown size={14} />
        </FloatingButton>

        {openPanel === "theme" && (
          <Menu role="listbox" onMouseLeave={handleThemeMenuLeave}>
            {THEMES.map((option) => (
              <ThemeMenuItem key={option} $active={option === theme}>
                <ThemeMenuButton
                  type="button"
                  role="option"
                  aria-selected={option === theme}
                  onMouseEnter={() => previewTheme(option)}
                  onClick={() => selectTheme(option)}
                >
                  <Swatch $colors={THEME_SWATCHES[option]}>
                    <span />
                    <span />
                    <span />
                  </Swatch>
                  {THEME_LABELS[option]}
                </ThemeMenuButton>
              </ThemeMenuItem>
            ))}
          </Menu>
        )}
      </MenuContainer>
    </Bar>
  )
}

export default FloatingControls
