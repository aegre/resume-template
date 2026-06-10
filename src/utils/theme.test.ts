import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { STORAGE_KEY, applyTheme, getStoredTheme, previewTheme } from "./theme"

describe("theme utilities", () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute("data-theme")
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute("data-theme")
  })

  describe("given no saved theme preference", () => {
    it("when getStoredTheme is called, then it returns dark", () => {
      expect(getStoredTheme()).toBe("dark")
    })
  })

  describe("given an invalid saved theme", () => {
    it("when getStoredTheme is called, then it returns the default theme", () => {
      localStorage.setItem(STORAGE_KEY, "neon")

      expect(getStoredTheme()).toBe("dark")
    })
  })

  describe("given a valid theme selection", () => {
    it("when applyTheme is called, then it updates the document and storage", () => {
      applyTheme("forest")

      expect(document.documentElement.getAttribute("data-theme")).toBe("forest")
      expect(localStorage.getItem(STORAGE_KEY)).toBe("forest")
    })

    it("when previewTheme is called, then it updates the document without persisting", () => {
      previewTheme("slate")

      expect(document.documentElement.getAttribute("data-theme")).toBe("slate")
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })
})
