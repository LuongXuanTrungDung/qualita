import { useState, MouseEvent, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { IconButton, List, Stack, Box } from '@mui/material'

import SettingsIcon from '@mui/icons-material/Settings'

import { selectProject } from '@/store/project.slice'
import SettingsMenu from '@components/settings.menu'
import { emptyData } from '@utils/constants'
import ProjectSelect from './project/project.select'

export default function Header() {
  const currentProject = useSelector(selectProject).currentProject

  const [current, setCurrent] = useState(false)
  const [settingsMenu, setSettingsMenu] = useState<null | HTMLElement>(null)

  const openSettingsMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setSettingsMenu(event.currentTarget)
  }

  useEffect(() => {
    setCurrent(currentProject !== emptyData.project)
  }, [currentProject])

  return (
    <Box component="header" sx={{ py: 1 }}>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          justifyItems: 'center',
        }}
        component="nav"
      >
        {current && (
          <Stack flexDirection="row" spacing={2} sx={{ marginRight: 'auto' }}>
            <ProjectSelect />
          </Stack>
        )}

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
