import type { GatsbySSR } from "gatsby"

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHtmlAttributes,
}) => {
  setHtmlAttributes({
    "data-theme": "dark",
    "data-font": "open-sans",
  } as React.HtmlHTMLAttributes<HTMLHtmlElement>)
}
