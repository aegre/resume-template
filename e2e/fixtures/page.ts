import type { Page } from "@playwright/test"

export async function waitForStablePage(page: Page): Promise<void> {
  await page.waitForSelector("#resume-content")
  await page.evaluate(async () => {
    await document.fonts.ready
  })
  await page.waitForTimeout(100)
}

export async function gotoResume(page: Page): Promise<void> {
  await page.goto("/")
  await waitForStablePage(page)
}

export async function selectTheme(page: Page, label: string): Promise<void> {
  await page.getByRole("button", { name: /^Theme:/ }).click()
  await page.getByRole("listbox").getByRole("option", { name: label }).click()
  await waitForStablePage(page)
}

export async function selectFont(page: Page, label: string): Promise<void> {
  await page.getByRole("button", { name: /^Font:/ }).click()
  await page.getByRole("listbox").getByRole("option", { name: label }).click()
  await waitForStablePage(page)
}
