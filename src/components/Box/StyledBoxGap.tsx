import styled from "styled-components"

import { spaceSize } from "../../utils/styles"
import type { StyledBoxGapTransientProps } from "../../types/styled"

const gapStyle = (
  direction: StyledBoxGapTransientProps["$direction"],
  gap: string
) => {
  const isColumn = direction === "column"

  return [`${isColumn ? "height" : "width"}: ${spaceSize[gap] || gap};`]
}

const StyledBoxGap = styled.div<StyledBoxGapTransientProps>`
  flex: 0 0 auto;
  ${(props) => props.$gap && gapStyle(props.$direction, props.$gap)};
`

export default StyledBoxGap
