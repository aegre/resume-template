import React, { Children } from "react"

import type { BoxProps } from "../../types/box"

import StyledBox from "./StyledBox"
import StyledBoxGap from "./StyledBoxGap"

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      a11yTitle = "",
      children = null,
      direction = "column",
      as = "",
      height,
      width,
      overflow,
      wrap,
      flex,
      padding = "none",
      gap,
      align,
      justify,
      margin = "none",
      background,
      alignSelf,
      gridArea,
      className,
      style,
    },
    ref
  ) => {
    let contents: React.ReactNode = children

    if (gap) {
      const gapContents: React.ReactNode[] = []
      let isFirstElement = true

      Children.forEach(children, (child, index) => {
        if (child) {
          if (isFirstElement) {
            isFirstElement = false
          } else {
            gapContents.push(
              <StyledBoxGap
                key={`gap-${index}`}
                $gap={gap}
                $direction={direction}
              />
            )
          }
        }
        gapContents.push(child)
      })

      contents = gapContents
    }

    return (
      <StyledBox
        ref={ref}
        className={className}
        style={style}
        as={as || undefined}
        aria-label={a11yTitle || undefined}
        $direction={direction}
        $align={align}
        $justify={justify}
        $margin={margin}
        $padding={padding}
        $flex={flex}
        $wrap={wrap}
        $height={height}
        $width={width}
        $overflow={overflow}
        $background={background}
        $alignSelf={alignSelf}
        $gridArea={gridArea}
      >
        {contents}
      </StyledBox>
    )
  }
)

Box.displayName = "Box"

export default Box
