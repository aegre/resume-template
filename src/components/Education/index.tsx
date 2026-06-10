import React from "react"
import Box from "../Box"
import { useResume } from "../../context/ResumeContext"
import { formatEducationLine } from "../../utils/resume/formatDates"

const Education = () => {
  const { resume } = useResume()
  const education = resume.education ?? []

  if (education.length === 0) {
    return null
  }

  return (
    <Box gap="space-200">
      <h2>Education</h2>
      {education.map((entry) => {
        const title = [entry.studyType, entry.area].filter(Boolean).join(" of ")
        const details = formatEducationLine(
          entry.institution,
          entry.location,
          entry.startDate,
          entry.endDate
        )

        return (
          <Box
            key={`${entry.institution ?? "school"}-${entry.endDate ?? "unknown"}`}
            gap="space-100"
          >
            {title !== "" && <h3>{title}</h3>}
            {details !== "" && (
              <p>
                <i>{details}</i>
              </p>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default Education
