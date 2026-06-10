const fs = require("fs")
const path = require("path")

const SUBMODULE_RESUME = path.resolve(__dirname, "../resume-data/resume.json")
const LOCAL_RESUME = path.resolve(__dirname, "../src/data/resume.json")
const EXAMPLE_RESUME = path.resolve(
  __dirname,
  "../src/data/resume.example.json"
)

function useExampleResume() {
  return process.env.RESUME_USE_EXAMPLE === "1"
}

function getResumePath() {
  if (useExampleResume()) {
    return EXAMPLE_RESUME
  }

  if (fs.existsSync(SUBMODULE_RESUME)) {
    return SUBMODULE_RESUME
  }

  if (fs.existsSync(LOCAL_RESUME)) {
    return LOCAL_RESUME
  }

  return EXAMPLE_RESUME
}

function getResumeSource() {
  if (useExampleResume()) {
    return "resume.example.json (forced)"
  }

  if (fs.existsSync(SUBMODULE_RESUME)) {
    return "resume-data submodule"
  }

  if (fs.existsSync(LOCAL_RESUME)) {
    return "src/data/resume.json"
  }

  return "resume.example.json"
}

module.exports = {
  getResumePath,
  getResumeSource,
  SUBMODULE_RESUME,
  LOCAL_RESUME,
  EXAMPLE_RESUME,
}
