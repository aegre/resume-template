import React from "react"
import styled from "styled-components"
import FloatingControls from "../FloatingControls"

const StyledLayout = styled.div`
  padding: var(--space-500);
`

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <FloatingControls />
      <StyledLayout id="resume-content">{children}</StyledLayout>
    </>
  )
}

export default Layout
