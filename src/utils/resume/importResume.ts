import type { Resume } from "../../types/resume"
import {
  validateResumeData,
  type ResumeValidationResult,
} from "./validateResume"

export async function importResumeFile(
  file: File
): Promise<ResumeValidationResult> {
  let text: string

  try {
    text = await file.text()
  } catch {
    return {
      valid: false,
      error: "Could not read the selected file.",
    }
  }

  let parsed: unknown

  try {
    parsed = JSON.parse(text)
  } catch {
    return {
      valid: false,
      error: "The file is not valid JSON.",
    }
  }

  return validateResumeData(parsed)
}
