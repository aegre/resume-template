import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { ResumeProvider } from "../../context/ResumeContext"
import Header from "."

describe("Header", () => {
  afterEach(() => {
    cleanup()
  })

  describe("given the example resume", () => {
    it("when rendered, then it shows name lines, title, and contact details", () => {
      render(
        <ResumeProvider>
          <Header />
        </ResumeProvider>
      )

      expect(screen.getByText("John")).toBeInTheDocument()
      expect(screen.getByText("Doe")).toBeInTheDocument()
      expect(screen.getByText("Programmer")).toBeInTheDocument()
      expect(screen.getByText("john@gmail.com")).toBeInTheDocument()
      expect(screen.getByText("San Francisco")).toBeInTheDocument()
      expect(
        screen.getByRole("link", { name: "https://github.com/johndoe" })
      ).toHaveAttribute("href", "https://github.com/johndoe")
    })
  })
})
