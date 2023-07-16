import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SxProps, Theme, Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import ModalList from '@components/common/modalList'
import Header from '@components/header'
import ViewSelection from '@components/viewSelection.tabs'
import { toggleTaskModal } from '@store/task.slice'
import { selectProject } from '@store/project.slice'
import { emptyData } from '@utils/constants'
import { LanguageContext } from '@contexts/useLanguage'

export default function Home() {
  const mainStyle: SxProps<Theme> = {
    width: '100%',
    px: { xs: 0, sm: 2 },
    minHeight: '100vh',
    bgcolor: 'background.default',
    color: 'text.primary',
  }

  const { translate } = useContext(LanguageContext)
  const dispatch = useDispatch()
  const currentProject = useSelector(selectProject).currentProject
  const [current, setCurrent] = useState(false)

  useEffect(() => {
    setCurrent(currentProject !== emptyData.project)
  }, [currentProject])

  return (
    <Box component="main" sx={mainStyle}>
      <Header />
      {current && <ViewSelection />}

      <ModalList />

      {current && (
        <Fab
          color="success"
          variant="extended"
          onClick={() => dispatch(toggleTaskModal('create'))}
        >
          <AddIcon sx={{ mr: 1 }} />
          {translate('form:task.createTitle')}
        </Fab>
      )}
    </Box>
  )
}
