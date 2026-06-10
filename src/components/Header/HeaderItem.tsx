import React from "react"
import styled from "styled-components"
import type { Icon } from "react-feather"

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-100);
  width: 100%;
`

const ItemText = styled.span`
  text-align: right;
`

const StyledIcon = styled.div`
  flex-shrink: 0;
  width: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-alternative-text) !important;
`

interface HeaderItemProps {
  Icon: Icon
  content: React.ReactNode
  url?: string
}

const HeaderItem = ({ Icon, content, url }: HeaderItemProps) => {
  const text = <ItemText>{content}</ItemText>

  return (
    <ItemRow>
      {url ? <a href={url}>{text}</a> : text}
      <StyledIcon as={Icon} size="14" />
    </ItemRow>
  )
}

export default HeaderItem
