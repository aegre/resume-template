import type { Resume } from "../../types/resume"
import { getDocumentTitle } from "./getDocumentTitle"

export function exportResume(resume: Resume): void {
  const json = JSON.stringify(resume, null, 2)
  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${getDocumentTitle(resume)}.json`
  link.click()
  URL.revokeObjectURL(url)
}
