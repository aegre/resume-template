import { readFileSync } from "fs"
import { resolve } from "path"
import { describe, expect, it } from "vitest"
import { validateResumeData } from "./validateResume"

const exampleResume = JSON.parse(
  readFileSync(resolve(__dirname, "../../data/resume.example.json"), "utf8")
)

describe("validateResumeData", () => {
  it("accepts the bundled example resume", async () => {
    const result = await validateResumeData(exampleResume)

    expect(result.valid).toBe(true)
    if (result.valid) {
      expect(result.resume.basics?.name).toBe("John Doe")
      expect(result.resume.work).toEqual(exampleResume.work)
    }
  })

  it("normalizes missing array fields", async () => {
    const result = await validateResumeData({
      basics: { name: "Jane Doe" },
    })

    expect(result.valid).toBe(true)
    if (result.valid) {
      expect(result.resume.work).toEqual([])
      expect(result.resume.skills).toEqual([])
    }
  })

  it("rejects resumes without basics.name", async () => {
    const result = await validateResumeData({
      basics: { label: "Engineer" },
    })

    expect(result).toEqual({
      valid: false,
      error: "Resume must include basics.name.",
    })
  })

  it("rejects invalid input types", async () => {
    const result = await validateResumeData(null)

    expect(result).toEqual({
      valid: false,
      error: "Resume must include basics.name.",
    })
  })

  it("rejects blank basics.name values", async () => {
    const result = await validateResumeData({
      basics: { name: "   " },
    })

    expect(result).toEqual({
      valid: false,
      error: "Resume must include basics.name.",
    })
  })

  it("rejects resume JSON that violates the schema", async () => {
    const result = await validateResumeData({
      basics: { name: "Jane Doe" },
      work: "not-an-array",
    })

    expect(result.valid).toBe(false)
    if (!result.valid) {
      expect(result.error).toContain("instance")
    }
  })
})
