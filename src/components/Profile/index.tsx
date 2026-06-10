import React from "react"
import Box from "../Box"
import { useResume } from "../../context/ResumeContext"

const Profile = () => {
  const { resume } = useResume()
  const summary = resume.basics?.summary

  if (summary == null || summary === "") {
    return null
  }

  return (
    <>
      <Box margin={{ top: "space-400", bottom: "space-400" }} gap="space-200">
        <h2>Profile</h2>
        <p>{summary}</p>
      </Box>
      <hr />
    </>
  )
}

export default Profile
