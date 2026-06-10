import type { Resume } from "../../types/resume"

export type ResumeValidationResult =
  | { valid: true; resume: Resume }
  | { valid: false; error: string }

function hasBasicsName(resume: unknown): resume is Resume {
  if (resume == null || typeof resume !== "object") {
    return false
  }

  const candidate = resume as Resume
  return (
    typeof candidate.basics?.name === "string" &&
    candidate.basics.name.trim() !== ""
  )
}

function normalizeResume(resume: Resume): Resume {
  return {
    ...resume,
    work: resume.work ?? [],
    projects: resume.projects ?? [],
    education: resume.education ?? [],
    languages: resume.languages ?? [],
    skills: resume.skills ?? [],
  }
}

function formatValidationError(
  errors: Array<{ property?: string; message?: string }> | null
): string {
  if (errors == null || errors.length === 0) {
    return "Resume JSON does not match the JSON Resume schema."
  }

  const first = errors[0]
  const location = first.property != null ? `${first.property}: ` : ""

  return `${location}${first.message ?? "Resume validation failed."}`
}

export async function validateResumeData(
  data: unknown
): Promise<ResumeValidationResult> {
  if (!hasBasicsName(data)) {
    return {
      valid: false,
      error: "Resume must include basics.name.",
    }
  }

  try {
    const { validate } = await import("@jsonresume/schema")

    const validationResult = await new Promise<ResumeValidationResult>(
      (resolve) => {
        validate(data, (errors, valid) => {
          if (!valid) {
            resolve({
              valid: false,
              error: formatValidationError(errors),
            })
            return
          }

          resolve({
            valid: true,
            resume: normalizeResume(data),
          })
        })
      }
    )

    return validationResult
  } catch {
    return {
      valid: true,
      resume: normalizeResume(data),
    }
  }
}
