import { useState, MouseEvent, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IconButton, List, Stack, Box, Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SettingsIcon from '@mui/icons-material/Settings'

import { selectProject, toggleProjectModal } from '@/store/project.slice'
import SettingsMenu from '@components/settings.menu'
import { emptyData } from '@utils/constants'
import ProjectSelect from './project/project.select'
import { LanguageContext } from '@contexts/useLanguage'

export default function Header() {
  const dispatch = useDispatch()
  const currentProject = useSelector(selectProject).currentProject
  const { translate } = useContext(LanguageContext)

  const [current, setCurrent] = useState(false)
  const [settingsMenu, setSettingsMenu] = useState<null | HTMLElement>(null)

  const openSettingsMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setSettingsMenu(event.currentTarget)
  }

  const handleCreate = () => {
    setSettingsMenu(null)
    dispatch(toggleProjectModal('create'))
  }

  useEffect(() => {
    setCurrent(currentProject !== emptyData.project)
  }, [currentProject])

  const renderSelect = () => {
    if (current) {
      return <ProjectSelect />
    } else {
      return (
        <Button
          color="success"
          startIcon={<AddCircleIcon />}
          onClick={handleCreate}
        >
          {translate('form:project.createTitle')}
        </Button>
      )
    }
  }

  return (
    <Box component="header" sx={{ pb: 1 }}>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          justifyItems: 'center',
        }}
        component="nav"
      >
        <Stack flexDirection="row" spacing={2} sx={{ marginRight: 'auto' }}>
          {renderSelect()}
        </Stack>

        <Stack direction="row" sx={{ ml: 'auto' }}>
          <IconButton color="info" onClick={openSettingsMenu}>
            <SettingsIcon />
          </IconButton>
        </Stack>
      </List>

      <SettingsMenu controlState={[settingsMenu, setSettingsMenu]} />
    </Box>
  )
}
