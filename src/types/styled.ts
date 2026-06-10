import type { CSSProperties } from "react"

import type { Align, Edge, Justify } from "./box"

export interface StyledBoxTransientProps {
  $direction?: CSSProperties["flexDirection"]
  $align?: Align
  $justify?: Justify
  $margin?: Edge
  $padding?: Edge
  $flex?: string
  $wrap?: CSSProperties["flexWrap"]
  $height?: string
  $width?: string
  $overflow?: CSSProperties["overflow"]
  $background?: string
  $alignSelf?: Align
  $gridArea?: string
}

export interface StyledBoxGapTransientProps {
  $gap?: string
  $direction?: CSSProperties["flexDirection"]
}
