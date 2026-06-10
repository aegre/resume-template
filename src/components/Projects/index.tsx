import React from "react"
import Box from "../Box"
import { useResume } from "../../context/ResumeContext"
import { formatProjectDates } from "../../utils/resume/formatDates"

const Projects = () => {
  const { resume } = useResume()
  const projects = resume.projects ?? []

  if (projects.length === 0) {
    return null
  }

  return (
    <Box gap="space-200">
      <h2>Other Projects</h2>
      <Box gap="space-300">
        {projects.map((project) => {
          const dates = formatProjectDates(project.startDate, project.endDate)
          const bullets =
            project.highlights ??
            (project.description != null && project.description !== ""
              ? [project.description]
              : [])

          return (
            <Box
              key={`${project.name ?? "project"}-${project.startDate ?? "unknown"}`}
              gap="space-100"
            >
              {project.name != null && <h3>{project.name}</h3>}
              {dates !== "" && <i>{dates}</i>}
              {bullets.length > 0 && (
                <ul>
                  {bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Projects
