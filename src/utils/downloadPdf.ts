const RESUME_CONTENT_ID = "resume-content"
const FLOATING_CONTROLS_SELECTOR = "[data-floating-controls]"

export async function downloadResumePdf(documentTitle: string): Promise<void> {
  const element = document.getElementById(RESUME_CONTENT_ID)

  if (element == null) {
    throw new Error("Resume content not found")
  }

  const controls = document.querySelector<HTMLElement>(
    FLOATING_CONTROLS_SELECTOR
  )

  if (controls != null) {
    controls.style.display = "none"
  }

  try {
    const html2pdf = (await import("html2pdf.js")).default
    const backgroundColor = getComputedStyle(document.body).backgroundColor

    await html2pdf()
      .set({
        margin: 0,
        filename: `${documentTitle}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor,
          logging: false,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save()
  } finally {
    if (controls != null) {
      controls.style.display = ""
    }
  }
}
