import fs from "fs"
import { afterEach, describe, expect, it, vi } from "vitest"
import {
  EXAMPLE_RESUME,
  LOCAL_RESUME,
  SUBMODULE_RESUME,
  getResumePath,
  getResumeSource,
} from "./getResumePath.js"

describe("getResumePath", () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it("prefers the submodule resume when present", () => {
    vi.spyOn(fs, "existsSync").mockImplementation((filePath) => {
      return filePath === SUBMODULE_RESUME
    })

    expect(getResumePath()).toBe(SUBMODULE_RESUME)
    expect(getResumeSource()).toBe("resume-data submodule")
  })

  it("falls back to the local resume when submodule is absent", () => {
    vi.spyOn(fs, "existsSync").mockImplementation((filePath) => {
      return filePath === LOCAL_RESUME
    })

    expect(getResumePath()).toBe(LOCAL_RESUME)
    expect(getResumeSource()).toBe("src/data/resume.json")
  })

  it("falls back to the example resume by default", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false)

    expect(getResumePath()).toBe(EXAMPLE_RESUME)
    expect(getResumeSource()).toBe("resume.example.json")
  })

  it("uses the example resume when RESUME_USE_EXAMPLE is set", () => {
    vi.stubEnv("RESUME_USE_EXAMPLE", "1")
    vi.spyOn(fs, "existsSync").mockImplementation((filePath) => {
      return filePath === SUBMODULE_RESUME || filePath === LOCAL_RESUME
    })

    expect(getResumePath()).toBe(EXAMPLE_RESUME)
    expect(getResumeSource()).toBe("resume.example.json (forced)")
  })
})
