import React, { useEffect } from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"
import Profile from "../components/Profile"
import Box from "../components/Box"
import Education from "../components/Education"
import Languages from "../components/Languages"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Experience from "../components/Experience"
import defaultResume from "@resume-data"
import { ResumeProvider, useResume } from "../context/ResumeContext"
import { getDocumentTitle } from "../utils/resume/getDocumentTitle"
import type { Resume } from "../types/resume"

const ResumePage = () => {
  const { documentTitle } = useResume()

  useEffect(() => {
    document.title = documentTitle
  }, [documentTitle])

  return (
    <Layout>
      <Header></Header>
      <Profile></Profile>
      <Box direction="row" margin={{ top: "space-400" }} gap="space-500">
        <Box width="310px" gap="space-400">
          <Skills></Skills>
          <Languages></Languages>
          <Projects></Projects>
          <Education></Education>
        </Box>
        <Box width="100%" gap="space-400">
          <Experience></Experience>
        </Box>
      </Box>
    </Layout>
  )
}

const IndexPage = () => (
  <ResumeProvider>
    <ResumePage />
  </ResumeProvider>
)

export default IndexPage

export const Head = () => (
  <>
    <title>{getDocumentTitle(defaultResume as Resume)}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </>
)
