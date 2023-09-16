import { SxProps, Theme, Box, Stack } from '@mui/material'
import { useContext } from 'react'
import { UIContext } from '@contexts/useUI'

import Footer from '@components/footer'
import ModalList from '@components/common/modalList'
import Header from '@components/header'
import Sidebar from '@components/sidebar'
import DefaultSpace from '@components/defaultSpace'

export default function Home() {
  const containerStyle: SxProps<Theme> = {
    maxWidth: '100vw',
    minHeight: '100vh',
    bgcolor: 'background.default',
    color: 'text.primary',
  }
  const boxStyle: SxProps = {
    width: '95%', mx: 'auto',
    px: { xs: 0, sm: 4 },
  }

  const { activeTab } = useContext(UIContext)

  return (
    <Stack sx={containerStyle} component='main' flexDirection='row'>
      {activeTab !== null && <Sidebar />}

      <Box sx={boxStyle} component='section'>
        <Header />
        {activeTab === null && <DefaultSpace />}
        <Footer />
      </Box>

      <ModalList />
    </Stack>
  )
}
