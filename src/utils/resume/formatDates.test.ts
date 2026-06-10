import { describe, expect, it } from "vitest"
import {
  formatDateRange,
  formatEducationLine,
  formatProjectDates,
} from "./formatDates"

describe("formatDateRange", () => {
  it("formats a start and end date", () => {
    expect(formatDateRange("2024-12-01", "2026-05-01")).toBe(
      "Dec 2024 - May 2026"
    )
  })

  it("uses Present when end date is missing", () => {
    expect(formatDateRange("2021-08-01")).toBe("Aug 2021 - Present")
  })

  it("returns empty string when start date is missing", () => {
    expect(formatDateRange()).toBe("")
    expect(formatDateRange("")).toBe("")
  })

  it("returns the raw value when the start date is invalid", () => {
    expect(formatDateRange("not-a-date", "2026-05-01")).toBe(
      "not-a-date - May 2026"
    )
  })
})

describe("formatEducationLine", () => {
  it("joins institution, location, and year range", () => {
    expect(
      formatEducationLine(
        "University",
        "San Francisco",
        "2011-01-01",
        "2013-01-01"
      )
    ).toBe("University, San Francisco / 2011 - 2013")
  })

  it("omits empty parts", () => {
    expect(formatEducationLine("University")).toBe("University")
  })
})

describe("formatProjectDates", () => {
  it("formats a year range", () => {
    expect(formatProjectDates("2019-01-01", "2021-01-01")).toBe("2019 - 2021")
  })

  it("returns empty string when both dates are missing", () => {
    expect(formatProjectDates()).toBe("")
  })
})
