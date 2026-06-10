import path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: {
      "@resume-data": path.resolve(__dirname, "src/data/resume.example.json"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["src/test/setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx", "scripts/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "src/utils/**/*.ts",
        "src/context/**/*.tsx",
        "scripts/getResumePath.js",
      ],
      exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.d.ts"],
    },
  },
})
