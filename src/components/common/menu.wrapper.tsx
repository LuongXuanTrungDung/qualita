import { Menu, SxProps } from "@mui/material"
import { PropsWithChildren } from "react"

interface menuProps {
  anchorState: [HTMLElement | null, (el: HTMLElement | null) => void]
}

export default function MenuWrapper(props: PropsWithChildren<menuProps>) {
  const { anchorState, children } = props
  const [anchor, setAnchor] = anchorState
  const menuStyles: SxProps = { p: 2 }

  return (
    <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)} sx={menuStyles}>
      {children}
    </Menu>
  )
}