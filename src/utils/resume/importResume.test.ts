import { describe, expect, it, vi } from "vitest"
import exampleResume from "../../data/resume.example.json"
import { importResumeFile } from "./importResume"

describe("importResumeFile", () => {
  it("given valid JSON, when a file is imported, then it returns a validated resume", async () => {
    const file = new File([JSON.stringify(exampleResume)], "resume.json", {
      type: "application/json",
    })

    const result = await importResumeFile(file)

    expect(result.valid).toBe(true)
    if (result.valid) {
      expect(result.resume.basics?.name).toBe("John Doe")
    }
  })

  it("given invalid JSON, when a file is imported, then it returns a parse error", async () => {
    const file = new File(["{not-json"], "resume.json", {
      type: "application/json",
    })

    const result = await importResumeFile(file)

    expect(result).toEqual({
      valid: false,
      error: "The file is not valid JSON.",
    })
  })

  it("given unreadable file content, when a file is imported, then it returns a read error", async () => {
    const file = {
      text: vi.fn().mockRejectedValue(new Error("read failed")),
    } as unknown as File

    const result = await importResumeFile(file)

    expect(result).toEqual({
      valid: false,
      error: "Could not read the selected file.",
    })
  })

  it("given resume JSON without basics.name, when a file is imported, then validation fails", async () => {
    const file = new File(
      [JSON.stringify({ basics: { label: "Engineer" } })],
      "resume.json",
      { type: "application/json" }
    )

    const result = await importResumeFile(file)

    expect(result).toEqual({
      valid: false,
      error: "Resume must include basics.name.",
    })
  })
})
