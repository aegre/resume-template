import React from "react"
import { MapPin, Mail, Phone, Linkedin, GitHub } from "react-feather"

import Box from "../Box"
import HeaderItem from "./HeaderItem"
import { useResume } from "../../context/ResumeContext"
import { getProfileUrl } from "../../utils/resume/getProfileUrl"

const Header = () => {
  const { resume } = useResume()
  const { basics, meta } = resume
  const nameLines =
    meta?.nameLines ?? (basics?.name != null ? [basics.name] : ["", ""])
  const linkedInUrl = getProfileUrl(basics?.profiles, "LinkedIn")
  const githubUrl = getProfileUrl(basics?.profiles, "GitHub")

  return (
    <>
      <section className="header--container">
        <Box className="header--identity" width="50%" gap="space-100">
          {nameLines.map((line) => (
            <h1 key={line}>{line}</h1>
          ))}
          {basics?.label != null && (
            <p className="header--title">{basics.label}</p>
          )}
        </Box>
        <Box
          className="header--contact"
          width="50%"
          direction="column"
          align="end"
          gap="space-100"
        >
          {basics?.email != null && (
            <HeaderItem
              Icon={Mail}
              content={basics.email}
              url={`mailto:${basics.email}`}
            />
          )}
          {basics?.phone != null && (
            <HeaderItem
              Icon={Phone}
              content={basics.phone}
              url={`tel:${basics.phone.replace(/[^\d+]/g, "")}`}
            />
          )}
          {linkedInUrl != null && (
            <HeaderItem
              Icon={Linkedin}
              content={linkedInUrl.replace(/\/$/, "")}
              url={linkedInUrl}
            />
          )}
          {githubUrl != null && (
            <HeaderItem Icon={GitHub} content={githubUrl} url={githubUrl} />
          )}
          {basics?.location?.city != null && (
            <HeaderItem Icon={MapPin} content={basics.location.city} />
          )}
        </Box>
      </section>
      <hr />
    </>
  )
}

export default Header
