import { useContext } from 'react'
import { useSelector } from 'react-redux'

import { SxProps, Theme, Box, Button, Typography, Stack, Container } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { SelectProject } from '@store/project.slice'
import { LanguageContext } from '@contexts/useLanguage'
import { UIContext } from '@contexts/useUI'
import Footer from '@components/footer'
import ModalList from '@components/common/modalList'
import Header from '@components/header'

export default function Home() {
  const containerStyle: SxProps<Theme> = {
    maxWidth: '100vw',
    minHeight: '100vh',
    bgcolor: 'background.default',
    color: 'text.primary',
  }
  const boxStyle: SxProps = {
    px: { xs: 0, sm: 2 },
    pb: 2,
  }

  const { translate } = useContext(LanguageContext)
  const { openModal } = useContext(UIContext)
  const projects = useSelector(SelectProject).projectData

  const renderButtonSpace = () => {
    const marginValue = 2
    const buttonSpaceHeight = `calc(100vh - ${marginValue * 6}rem)`
    const buttonStyles: SxProps = {
      mx: 'auto', my: marginValue,
      height: buttonSpaceHeight, width: '100%',
      bgcolor: 'action.disabledBackground',
      ":hover": { bgcolor: 'action.selected' }
    }

    return (
      <Button
        onClick={() => openModal('create-project')}
        sx={buttonStyles}
      >
        <Stack flexDirection='column'>
          <AddCircleIcon sx={{ mx: 'auto', mb: 1 }} color='success' />
          <Typography sx={{ textAlign: 'center', mt: 1 }}>{translate('form:project.createTitle')}</Typography>
        </Stack>
      </Button>
    )
  }

  return (
    <Box sx={containerStyle} component='main'>
      <Header />
      <Box sx={boxStyle} component='section'>
        {projects.length === 0 && renderButtonSpace()}
        <Footer />
      </Box>

      <ModalList />
    </Box>
  )
}
