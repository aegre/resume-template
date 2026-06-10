import { test, expect } from "@playwright/test"
import { FONTS, FONT_LABELS } from "../../src/utils/font"
import { THEMES, THEME_LABELS } from "../../src/utils/theme"
import { gotoResume, selectFont, selectTheme } from "../fixtures/page"

const NON_DEFAULT_THEMES = THEMES.filter((theme) => theme !== "dark")
const NON_DEFAULT_FONTS = FONTS.filter((font) => font !== "open-sans")

test.describe("given the default theme and font", () => {
  test("when the resume page loads, then #resume-content matches the baseline snapshot", async ({
    page,
  }) => {
    await gotoResume(page)
    await expect(page.locator("#resume-content")).toHaveScreenshot(
      "resume-default.png"
    )
  })
})

test.describe("given the example resume", () => {
  for (const theme of NON_DEFAULT_THEMES) {
    test.describe(`given the ${theme} theme`, () => {
      test("when the user selects the theme, then #resume-content matches the theme snapshot", async ({
        page,
      }) => {
        await gotoResume(page)
        await selectTheme(page, THEME_LABELS[theme])
        await expect(page.locator("#resume-content")).toHaveScreenshot(
          `resume-theme-${theme}.png`
        )
      })
    })
  }
})

test.describe("given the dark theme", () => {
  for (const font of NON_DEFAULT_FONTS) {
    test.describe(`given the ${font} font`, () => {
      test("when the user selects the font, then #resume-content matches the font snapshot", async ({
        page,
      }) => {
        await gotoResume(page)
        await selectFont(page, FONT_LABELS[font])
        await expect(page.locator("#resume-content")).toHaveScreenshot(
          `resume-font-${font}.png`
        )
      })
    })
  }
})
