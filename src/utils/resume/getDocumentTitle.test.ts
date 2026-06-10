import { describe, expect, it } from "vitest"
import { getDocumentTitle } from "./getDocumentTitle"
import type { Resume } from "../../types/resume"

describe("getDocumentTitle", () => {
  it("prefers meta.documentTitle", () => {
    const resume: Resume = {
      meta: { documentTitle: "CustomTitle" },
      basics: { name: "Jane Doe" },
    }

    expect(getDocumentTitle(resume)).toBe("CustomTitle")
  })

  it("falls back to a slugified basics.name", () => {
    const resume: Resume = {
      basics: { name: "Jane Doe" },
    }

    expect(getDocumentTitle(resume)).toBe("JaneDoe")
  })

  it("returns Resume when no title or name is available", () => {
    expect(getDocumentTitle({})).toBe("Resume")
  })
})
