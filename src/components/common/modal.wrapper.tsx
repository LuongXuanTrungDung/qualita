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
  controlState: [boolean, (value: boolean) => void]
  title: string
  confirm: JSX.Element
}

export default function ModalWrapper(props: PropsWithChildren<modalProps>) {
  const { closeModal } = useContext(UIContext)
  const { translate } = useContext(LanguageContext)

  const { children, controlState, title, confirm } = props
  const [open, setOpen] = controlState

  const boxStyle: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    borderRadius: '1rem',
    boxShadow: 24,
  }

  const handleClose = () => {
    setOpen(false)
    closeModal()
  }

  return (
    <Modal
      open={open} onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={open}>
        <Box sx={boxStyle}>
          <Paper sx={{ p: 2 }} color='primary'>
            <Typography variant='h5' component='h5'>{title}</Typography>
          </Paper>
          <Box sx={{ p: 2 }}>
            {children}
          </Box>
          <Stack sx={{ p: 2 }} direction="row">
            <Box sx={{mr: 'auto'}}><Button onClick={handleClose} >{translate('common:Cancel')}</Button></Box>
            <Box sx={{ml: 'auto'}}>{confirm}</Box>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  )
}
