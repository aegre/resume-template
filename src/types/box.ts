import type { CSSProperties, ElementType, ReactNode } from "react"

export type SpaceToken =
  | "none"
  | "hair"
  | "space-100"
  | "space-200"
  | "space-300"
  | "space-400"
  | "space-500"
  | "space-600"
  | "space-700"
  | "space-800"

export type EdgeSize = SpaceToken | (string & {})

export type Edge =
  | EdgeSize
  | {
      horizontal?: EdgeSize
      vertical?: EdgeSize
      top?: EdgeSize
      bottom?: EdgeSize
      left?: EdgeSize
      right?: EdgeSize
    }

export type Align = "center" | "end" | "start" | "stretch"

export type Justify =
  | "around"
  | "between"
  | "center"
  | "end"
  | "evenly"
  | "start"

export interface BoxProps {
  a11yTitle?: string
  children?: ReactNode
  direction?: CSSProperties["flexDirection"]
  margin?: Edge
  padding?: Edge
  align?: Align
  justify?: Justify
  alignSelf?: Align
  as?: ElementType
  wrap?: CSSProperties["flexWrap"]
  overflow?: CSSProperties["overflow"]
  height?: string
  width?: string
  flex?: string
  gap?: SpaceToken | (string & {})
  background?: string
  gridArea?: string
  className?: string
  style?: CSSProperties
}
