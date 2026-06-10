import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { downloadResumePdf } from "./downloadPdf"

const save = vi.fn().mockResolvedValue(undefined)
const html2pdfMock = vi.fn(() => ({
  set: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  save,
}))

vi.mock("html2pdf.js", () => ({
  default: html2pdfMock,
}))

describe("downloadResumePdf", () => {
  beforeEach(() => {
    save.mockClear()
    html2pdfMock.mockClear()
    document.body.innerHTML = ""
  })

  afterEach(() => {
    document.body.innerHTML = ""
  })

  describe("given no resume content element", () => {
    it("when download is requested, then it throws", async () => {
      await expect(downloadResumePdf("ResumeTitle")).rejects.toThrow(
        "Resume content not found"
      )
    })
  })

  describe("given resume content on the page", () => {
    it("when download is requested, then it generates a PDF and restores floating controls", async () => {
      const content = document.createElement("div")
      content.id = "resume-content"
      document.body.appendChild(content)

      const controls = document.createElement("div")
      controls.setAttribute("data-floating-controls", "")
      document.body.appendChild(controls)

      await downloadResumePdf("ResumeTitle")

      expect(html2pdfMock).toHaveBeenCalledTimes(1)
      expect(save).toHaveBeenCalledTimes(1)
      expect(controls.style.display).toBe("")
    })
  })
})
