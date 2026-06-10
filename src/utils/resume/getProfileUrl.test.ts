import { describe, expect, it } from "vitest"
import { getProfileUrl } from "./getProfileUrl"

describe("getProfileUrl", () => {
  const profiles = [
    { network: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
    { network: "GitHub", url: "https://github.com/johndoe" },
  ]

  it("finds a profile URL by network name", () => {
    expect(getProfileUrl(profiles, "LinkedIn")).toBe(
      "https://linkedin.com/in/johndoe"
    )
  })

  it("matches network names case-insensitively", () => {
    expect(getProfileUrl(profiles, "github")).toBe("https://github.com/johndoe")
  })

  it("returns undefined when the network is missing", () => {
    expect(getProfileUrl(profiles, "Twitter")).toBeUndefined()
    expect(getProfileUrl(undefined, "LinkedIn")).toBeUndefined()
  })
})
