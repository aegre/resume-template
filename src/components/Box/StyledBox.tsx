import styled from "styled-components"

import { genericStyles, JUSTIFY_MAP, ALIGN_MAP } from "../../utils/styles"
import type { StyledBoxTransientProps } from "../../types/styled"

const StyledBox = styled.div<StyledBoxTransientProps>`
  display: flex;
  box-sizing: border-box;
  outline: 0px;

  ${genericStyles}

  ${(props) =>
    props.$justify && `justify-content: ${JUSTIFY_MAP[props.$justify]};`}
  ${(props) => props.$align && `align-items: ${ALIGN_MAP[props.$align]};`}
  flex-direction: ${(props) => props.$direction};
  ${(props) => props.$flex != null && `flex: ${props.$flex};`}
  ${(props) => props.$height != null && `height: ${props.$height};`}
  ${(props) => props.$width != null && `width: ${props.$width};`}
  ${(props) => props.$overflow != null && `overflow: ${props.$overflow};`}
  ${(props) => props.$wrap != null && `flex-wrap: ${props.$wrap};`}
  ${(props) => props.$background != null && `background: ${props.$background};`}
`

export default StyledBox
