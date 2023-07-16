import { PropsWithChildren } from 'react'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

interface dialogProps {
  controlValue: boolean
  closeFn: Function
  title: string
  actions?: JSX.Element
}

export default function DialogWrapper(props: PropsWithChildren<dialogProps>) {
  const { children, controlValue, title, actions } = props

  return (
    <Dialog open={controlValue}>
      <Box sx={{ p: 1 }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ pb: 1 }}>{children}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Box>
    </Dialog>
  )
}
