import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { STORAGE_KEY, applyFont, getStoredFont, previewFont } from "./font"

describe("font utilities", () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute("data-font")
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute("data-font")
  })

  describe("given no saved font preference", () => {
    it("when getStoredFont is called, then it returns open-sans", () => {
      expect(getStoredFont()).toBe("open-sans")
    })
  })

  describe("given an invalid saved font", () => {
    it("when getStoredFont is called, then it returns the default font", () => {
      localStorage.setItem(STORAGE_KEY, "not-a-font")

      expect(getStoredFont()).toBe("open-sans")
    })
  })

  describe("given a valid font selection", () => {
    it("when applyFont is called, then it updates the document and storage", () => {
      applyFont("inter")

      expect(document.documentElement.getAttribute("data-font")).toBe("inter")
      expect(localStorage.getItem(STORAGE_KEY)).toBe("inter")
    })

    it("when previewFont is called, then it updates the document without persisting", () => {
      previewFont("ibm-plex-sans")

      expect(document.documentElement.getAttribute("data-font")).toBe(
        "ibm-plex-sans"
      )
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })
})
