import { afterEach, describe, expect, it, vi } from "vitest"
import { exportResume } from "./exportResume"
import type { Resume } from "../../types/resume"

describe("exportResume", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("given a resume, when exported, then it downloads JSON using the document title", () => {
    const click = vi.fn()
    const link = {
      href: "",
      download: "",
      click,
    } as unknown as HTMLAnchorElement

    vi.spyOn(document, "createElement").mockReturnValue(link)
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:resume")
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {})

    const resume: Resume = {
      meta: { documentTitle: "ExportedResume" },
      basics: { name: "Jane Doe" },
    }

    exportResume(resume)

    expect(URL.createObjectURL).toHaveBeenCalledTimes(1)
    expect(link.download).toBe("ExportedResume.json")
    expect(link.href).toBe("blob:resume")
    expect(click).toHaveBeenCalledTimes(1)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:resume")
  })
})
