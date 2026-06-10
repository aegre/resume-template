import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import defaultResume from "@resume-data"
import type { Resume } from "../types/resume"
import { getDocumentTitle } from "../utils/resume/getDocumentTitle"

const STORAGE_KEY = "resume-json"

interface ResumeContextValue {
  resume: Resume
  documentTitle: string
  hasOverride: boolean
  setResume: (resume: Resume) => void
  resetResume: () => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

function readStoredResume(): Resume | null {
  if (typeof window === "undefined") {
    return null
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored == null) {
    return null
  }

  try {
    return JSON.parse(stored) as Resume
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

function writeStoredResume(resume: Resume): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resume))
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResumeState] = useState<Resume>(defaultResume as Resume)
  const [hasOverride, setHasOverride] = useState(false)

  useEffect(() => {
    const stored = readStoredResume()
    if (stored != null) {
      setResumeState(stored)
      setHasOverride(true)
    }
  }, [])

  const setResume = useCallback((next: Resume) => {
    setResumeState(next)
    setHasOverride(true)
    writeStoredResume(next)
  }, [])

  const resetResume = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setResumeState(defaultResume as Resume)
    setHasOverride(false)
  }, [])

  const value = useMemo(
    () => ({
      resume,
      documentTitle: getDocumentTitle(resume),
      hasOverride,
      setResume,
      resetResume,
    }),
    [resume, hasOverride, setResume, resetResume]
  )

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  )
}

export function useResume(): ResumeContextValue {
  const context = useContext(ResumeContext)
  if (context == null) {
    throw new Error("useResume must be used within a ResumeProvider")
  }

  return context
}
