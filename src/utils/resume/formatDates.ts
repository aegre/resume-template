const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

function formatMonthYear(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) {
    return isoDate
  }

  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

export function formatDateRange(startDate?: string, endDate?: string): string {
  if (startDate == null || startDate === "") {
    return ""
  }

  const start = formatMonthYear(startDate)
  const end =
    endDate == null || endDate === "" ? "Present" : formatMonthYear(endDate)

  return `${start} - ${end}`
}

export function formatEducationLine(
  institution?: string,
  location?: string,
  startDate?: string,
  endDate?: string
): string {
  const parts: string[] = []

  if (institution != null && institution !== "") {
    parts.push(institution)
  }

  const locationAndDates = [location, formatYearRange(startDate, endDate)]
    .filter((part) => part != null && part !== "")
    .join(" / ")

  if (locationAndDates !== "") {
    parts.push(locationAndDates)
  }

  return parts.join(", ")
}

function formatYearRange(startDate?: string, endDate?: string): string {
  const startYear = parseYear(startDate)
  const endYear = parseYear(endDate)

  if (startYear == null && endYear == null) {
    return ""
  }

  if (startYear != null && endYear != null) {
    return `${startYear} - ${endYear}`
  }

  return startYear?.toString() ?? endYear?.toString() ?? ""
}

function parseYear(isoDate?: string): number | null {
  if (isoDate == null || isoDate === "") {
    return null
  }

  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.getUTCFullYear()
}

export function formatProjectDates(
  startDate?: string,
  endDate?: string
): string {
  const startYear = parseYear(startDate)
  const endYear = parseYear(endDate)

  if (startYear == null && endYear == null) {
    return ""
  }

  if (startYear != null && endYear != null) {
    return `${startYear} - ${endYear}`
  }

  return startYear?.toString() ?? endYear?.toString() ?? ""
}
