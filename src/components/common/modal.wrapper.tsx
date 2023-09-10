import { PropsWithChildren, useContext } from 'react'
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Paper,
  Stack,
  SxProps,
  Typography,
} from '@mui/material'
import { UIContext } from '@contexts/useUI'
import { LanguageContext } from '@contexts/useLanguage'

interface modalProps {
  controlState: boolean
  closeFn: Function
  title: string
  confirm: JSX.Element
}

export default function ModalWrapper(props: PropsWithChildren<modalProps>) {
  const { closeModal } = useContext(UIContext)
  const { translate } = useContext(LanguageContext)

  const { children, controlState, title, confirm, closeFn } = props

  const boxStyle: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    '& > div': { p: 3 }
  }

  const handleClose = () => {
    closeFn()
    closeModal()
  }

  return (
    <Modal
      open={controlState} onClose={handleClose}
      closeAfterTransition
      keepMounted
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={controlState}>
        <Box sx={boxStyle}>
          <Paper>
            <Typography variant='h5' component='h5'>{title}</Typography>
          </Paper>
          <Box>
            {children}
          </Box>
          <Stack direction="row">
            <Box sx={{ mr: 'auto' }}><Button onClick={handleClose} >{translate('common:Cancel')}</Button></Box>
            <Box sx={{ ml: 'auto' }}>{confirm}</Box>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  )
}
