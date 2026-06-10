import React from "react"
import Box from "../Box"
import { useResume } from "../../context/ResumeContext"

interface SkillProps {
  title: string
  description: string
}

const Skill = ({ title, description }: SkillProps) => {
  return (
    <li className="skill-item">
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  )
}

const Skills = () => {
  const { resume } = useResume()
  const skills = resume.skills ?? []

  if (skills.length === 0) {
    return null
  }

  return (
    <Box as="section" gap="space-200">
      <h2>Skills</h2>
      <ul className="skills-list">
        {skills.map((skill) => (
          <Skill
            key={skill.name ?? skill.keywords?.join(", ") ?? "skill"}
            title={skill.name ?? ""}
            description={(skill.keywords ?? []).join(", ")}
          />
        ))}
      </ul>
    </Box>
  )
}

export default Skills
