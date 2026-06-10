import React from "react"
import Box from "../Box"
import { useResume } from "../../context/ResumeContext"

const Languages = () => {
  const { resume } = useResume()
  const languages = resume.languages ?? []

  if (languages.length === 0) {
    return null
  }

  return (
    <Box gap="space-200">
      <h2>Languages</h2>
      <ul>
        {languages.map((entry) => (
          <li key={entry.language ?? entry.fluency}>
            {entry.language}
            {entry.fluency != null &&
              entry.fluency !== "" &&
              ` - ${entry.fluency}`}
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default Languages
