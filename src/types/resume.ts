export interface ResumeMeta {
  nameLines?: string[]
  documentTitle?: string
}

export interface ResumeBasics {
  name?: string
  label?: string
  email?: string
  phone?: string
  url?: string
  summary?: string
  location?: {
    address?: string
    postalCode?: string
    city?: string
    countryCode?: string
    region?: string
  }
  profiles?: Array<{
    network?: string
    username?: string
    url?: string
  }>
}

export interface ResumeWork {
  name?: string
  position?: string
  url?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
  location?: string
  technologies?: string
}

export interface ResumeProject {
  name?: string
  startDate?: string
  endDate?: string
  description?: string
  highlights?: string[]
  url?: string
}

export interface ResumeEducation {
  institution?: string
  url?: string
  area?: string
  studyType?: string
  startDate?: string
  endDate?: string
  score?: string
  courses?: string[]
  location?: string
}

export interface ResumeLanguage {
  language?: string
  fluency?: string
}

export interface ResumeSkill {
  name?: string
  level?: string
  keywords?: string[]
}

export interface Resume {
  meta?: ResumeMeta
  basics?: ResumeBasics
  work?: ResumeWork[]
  projects?: ResumeProject[]
  education?: ResumeEducation[]
  languages?: ResumeLanguage[]
  skills?: ResumeSkill[]
}
