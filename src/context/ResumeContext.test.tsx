import React from "react"
import { act, cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import exampleResume from "../data/resume.example.json"
import { ResumeProvider, useResume } from "./ResumeContext"
import type { Resume } from "../types/resume"

const STORAGE_KEY = "resume-json"

const importedResume: Resume = {
  meta: { documentTitle: "ImportedResume" },
  basics: { name: "Imported User", label: "Engineer" },
}

function ResumeProbe() {
  const context = useResume()

  return (
    <div>
      <span data-testid="name">{context.resume.basics?.name}</span>
      <span data-testid="document-title">{context.documentTitle}</span>
      <span data-testid="has-override">{String(context.hasOverride)}</span>
      <button type="button" onClick={() => context.setResume(importedResume)}>
        import
      </button>
      <button type="button" onClick={() => context.resetResume()}>
        reset
      </button>
    </div>
  )
}

function renderResumeContext() {
  return render(
    <ResumeProvider>
      <ResumeProbe />
    </ResumeProvider>
  )
}

describe("ResumeContext", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    localStorage.clear()
  })

  describe("given no stored resume override", () => {
    it("when the provider mounts, then it uses the bundled default resume", async () => {
      renderResumeContext()

      await waitFor(() => {
        expect(screen.getByTestId("name")).toHaveTextContent("John Doe")
      })

      expect(screen.getByTestId("document-title")).toHaveTextContent(
        "JohnDoeResume"
      )
      expect(screen.getByTestId("has-override")).toHaveTextContent("false")
    })
  })

  describe("given a resume saved in localStorage", () => {
    it("when the provider mounts, then it restores the saved resume", async () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(importedResume))

      renderResumeContext()

      await waitFor(() => {
        expect(screen.getByTestId("name")).toHaveTextContent("Imported User")
      })

      expect(screen.getByTestId("document-title")).toHaveTextContent(
        "ImportedResume"
      )
      expect(screen.getByTestId("has-override")).toHaveTextContent("true")
    })
  })

  describe("given invalid JSON in localStorage", () => {
    it("when the provider mounts, then it falls back to the default resume", async () => {
      localStorage.setItem(STORAGE_KEY, "{not-json")

      renderResumeContext()

      await waitFor(() => {
        expect(screen.getByTestId("name")).toHaveTextContent("John Doe")
      })

      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
      expect(screen.getByTestId("has-override")).toHaveTextContent("false")
    })
  })

  describe("given the default resume is active", () => {
    it("when the user imports a resume, then the context and localStorage update", async () => {
      renderResumeContext()

      await waitFor(() => {
        expect(screen.getByTestId("has-override")).toHaveTextContent("false")
      })

      await act(async () => {
        screen.getByRole("button", { name: "import" }).click()
      })

      expect(screen.getByTestId("name")).toHaveTextContent("Imported User")
      expect(screen.getByTestId("document-title")).toHaveTextContent(
        "ImportedResume"
      )
      expect(screen.getByTestId("has-override")).toHaveTextContent("true")
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "")).toEqual(
        importedResume
      )
    })
  })

  describe("given an imported resume override is active", () => {
    it("when the user resets, then the default resume is restored", async () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(importedResume))

      renderResumeContext()

      await waitFor(() => {
        expect(screen.getByTestId("has-override")).toHaveTextContent("true")
      })

      await act(async () => {
        screen.getByRole("button", { name: "reset" }).click()
      })

      expect(screen.getByTestId("name")).toHaveTextContent("John Doe")
      expect(screen.getByTestId("document-title")).toHaveTextContent(
        exampleResume.meta.documentTitle
      )
      expect(screen.getByTestId("has-override")).toHaveTextContent("false")
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })

  describe("given a component outside ResumeProvider", () => {
    it("when useResume is called, then it throws", () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {})

      function OrphanConsumer() {
        useResume()
        return null
      }

      expect(() => render(<OrphanConsumer />)).toThrow(
        "useResume must be used within a ResumeProvider"
      )

      consoleError.mockRestore()
    })
  })
})
