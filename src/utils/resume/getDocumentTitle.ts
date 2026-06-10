import type { Resume } from "../../types/resume"

export function getDocumentTitle(resume: Resume): string {
  if (resume.meta?.documentTitle != null && resume.meta.documentTitle !== "") {
    return resume.meta.documentTitle
  }

  const name = resume.basics?.name?.trim()
  if (name != null && name !== "") {
    return name.replace(/\s+/g, "")
  }

  return "Resume"
}
