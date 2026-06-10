/*
LICENSE
Apache License
Version 2.0, January 2004


COPYRIGHT
Groomet

https://github.com/grommet/grommet/blob/8d59c6f466dbe15168dfd02ea87ba8e26903fb4b/src/js/utils/styles.js
*/

import { css, RuleSet } from "styled-components"

import type { Align, Edge, Justify } from "../types/box"
import type { StyledBoxTransientProps } from "../types/styled"

const ALIGN_SELF_MAP = {
  center: "center",
  end: "flex-end",
  start: "flex-start",
  stretch: "stretch",
} as const satisfies Record<Align, string>

const JUSTIFY_MAP = {
  around: "space-around",
  between: "space-between",
  center: "center",
  end: "flex-end",
  evenly: "space-evenly",
  start: "flex-start",
} as const satisfies Record<Justify, string>

const spaceSize: Record<string, string> = {
  none: "0",
  hair: "1px",
  "space-100": "4px",
  "space-200": "8px",
  "space-300": "12px",
  "space-400": "16px",
  "space-500": "20px",
  "space-600": "36px",
  "space-700": "42px",
  "space-800": "60px",
}

interface Breakpoint {
  value?: number
}

const breakpointStyle = (
  breakpoint: Breakpoint,
  content: RuleSet<object>
) => css`
  @media only screen ${breakpoint.value &&
    `and (max-width: ${breakpoint.value}px)`} {
    ${content};
  }
`

const edgeStyle = (kind: "margin" | "padding", data: Edge) => {
  if (typeof data === "string") {
    return css`
      ${kind}: ${spaceSize[data] || data};
    `
  }

  const result: RuleSet<object>[] = []

  if (data.horizontal) {
    result.push(css`
      ${kind}-left: ${spaceSize[data.horizontal] || data.horizontal};
      ${kind}-right: ${spaceSize[data.horizontal] || data.horizontal};
    `)
  }
  if (data.vertical) {
    result.push(css`
      ${kind}-top: ${spaceSize[data.vertical] || data.vertical};
      ${kind}-bottom: ${spaceSize[data.vertical] || data.vertical};
    `)
  }
  if (data.top) {
    result.push(css`
      ${kind}-top: ${spaceSize[data.top] || data.top};
    `)
  }
  if (data.bottom) {
    result.push(css`
      ${kind}-bottom: ${spaceSize[data.bottom] || data.bottom};
    `)
  }
  if (data.left) {
    result.push(css`
      ${kind}-left: ${spaceSize[data.left] || data.left};
    `)
  }
  if (data.right) {
    result.push(css`
      ${kind}-right: ${spaceSize[data.right] || data.right};
    `)
  }

  return result
}

const genericStyles = css<StyledBoxTransientProps>`
  ${(props) =>
    props.$alignSelf && `align-self: ${ALIGN_SELF_MAP[props.$alignSelf]};`}
  ${(props) => props.$gridArea && `grid-area: ${props.$gridArea};`}
  ${(props) => props.$padding && edgeStyle("padding", props.$padding)}
  ${(props) => props.$margin && edgeStyle("margin", props.$margin)}
`

export {
  spaceSize,
  genericStyles,
  breakpointStyle,
  edgeStyle,
  ALIGN_SELF_MAP as ALIGN_MAP,
  JUSTIFY_MAP,
}
