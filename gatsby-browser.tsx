import "./src/styles/global.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/inter/400.css"
import "@fontsource/source-sans-3/400.css"
import "@fontsource/ibm-plex-sans/400.css"
import { applyFont, getStoredFont } from "./src/utils/font"
import { applyTheme, getStoredTheme } from "./src/utils/theme"

export const onClientEntry = () => {
  applyTheme(getStoredTheme())
  applyFont(getStoredFont())
}
