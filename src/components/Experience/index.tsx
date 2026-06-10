import React from "react"
import Box from "../Box"
import styled from "styled-components"
import { useResume } from "../../context/ResumeContext"
import { formatDateRange } from "../../utils/resume/formatDates"
import type { ResumeWork } from "../../types/resume"

const ExperienceTimeLine = styled(Box)`
  padding-left: var(--space-300);
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: calc(100% - var(--space-500));
    margin: var(--space-300) 0;
    left: 0;
    border-left: 1px solid var(--color-alternative-text);
  }
`

const ExperiencePoint = styled(Box)`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    background-color: var(--color-alternative-text);
    width: 9px;
    height: 9px;
    left: calc(-1 * var(--space-400));
    top: 6px;
    border-radius: 50%;
  }
`

interface ExperienceEntryProps {
  entry: ResumeWork
}

const ExperienceEntry = ({ entry }: ExperienceEntryProps) => {
  const dates = formatDateRange(entry.startDate, entry.endDate)
  const highlights = entry.highlights ?? []

  return (
    <ExperiencePoint gap="space-200">
      {entry.position != null && (
        <h3 className="experience-job-title">{entry.position}</h3>
      )}
      <Box gap="space-100">
        <p>
          {entry.name != null && <i>{entry.name}</i>}
          {entry.location != null && entry.name != null && " / "}
          {entry.location}
          {dates !== "" &&
            (entry.name != null || entry.location != null) &&
            " / "}
          {dates}
        </p>
        {entry.technologies != null && entry.technologies !== "" && (
          <p>Technologies: {entry.technologies}</p>
        )}
      </Box>
      {highlights.length > 0 && (
        <ul>
          {highlights.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </ExperiencePoint>
  )
}

const Experience = () => {
  const { resume } = useResume()
  const work = resume.work ?? []

  if (work.length === 0) {
    return null
  }

  return (
    <Box gap="space-200">
      <h2>Experience</h2>
      <ExperienceTimeLine gap="space-400">
        {work.map((entry) => (
          <ExperienceEntry
            key={`${entry.name ?? "role"}-${entry.startDate ?? "unknown"}`}
            entry={entry}
          />
        ))}
      </ExperienceTimeLine>
    </Box>
  )
}

export default Experience
