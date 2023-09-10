import { SyntheticEvent, useContext, useEffect, useState, MouseEvent } from "react"
import { Stack, Box, IconButton, SxProps, Tab, Tabs, MenuItem, Typography, useTheme, Switch, Select, SelectChangeEvent, FormControl } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { SelectProject } from "@store/project.slice"
import { useSelector } from "react-redux"
import { UIContext } from "@contexts/useUI";
import KanbanBoard from "@components/kanban/board";
import MenuWrapper from "@components/common/menu.wrapper";
import { LanguageContext } from "@contexts/useLanguage";
import { ColorModeContext } from "@contexts/useColorMode";

export default function Header() {
  const { openModal } = useContext(UIContext)
  const theme = useTheme()
  const { toggleColorMode } = useContext(ColorModeContext)

  const { translate, currentLanguage, allLanguages, switchLanguage } = useContext(LanguageContext)
  const handleChange = (event: SelectChangeEvent) => {
    switchLanguage(event.target.value)
  }

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const openMenu = (event: MouseEvent<HTMLElement>) => setAnchor(event.currentTarget)

  const [tab, setTab] = useState(0)
  const projects = useSelector(SelectProject).projectData
  const [projectTab, setProjectTab] = useState<string>('')
  const tabStyle: SxProps = { p: 2 }

  useEffect(() => {
    if (projectTab === null && projects.length > 0) {
      setProjectTab(projects[0].code)
    }
  }, [projectTab, projects])
  const handleSwitchTab = (event: SyntheticEvent, newTab: string) => setProjectTab(newTab)

  const renderTabPanel = (value: number, index: number) => {
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && (
          <KanbanBoard />
        )}
      </div>
    )
  }

  const renderMenu = () => {
    return (
      <MenuWrapper anchorState={[anchor, setAnchor]}>
        <Stack flexDirection='row' sx={{ justifyContent: 'center', alignItems: 'center', px: 2, py: 1 }}>
          <Stack flexDirection='row' sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>{translate('common:lightMode')}</Typography>
            <LightModeIcon />
          </Stack>
          <Switch checked={theme.palette.mode === 'dark'} onChange={toggleColorMode} />
          <Stack flexDirection='row' sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <DarkModeIcon />
            <Typography sx={{ ml: 1 }}>{translate('common:darkMode')}</Typography>
          </Stack>
        </Stack>
        <Stack flexDirection='row' sx={{ justifyContent: 'center', alignItems: 'center', px: 2, py: 1 }}>
          <Typography sx={{ mr: 1 }}>{translate('common:setLanguage')}</Typography>
          <Select value={currentLanguage} onChange={handleChange} variant="standard" sx={{ ml: 1 }}>
            {allLanguages.map((l, lIndex) => (
              <MenuItem sx={{ width: '100%', px: 2, py: 1 }} key={lIndex} value={l.locale}>
                {translate('common:' + l.name)}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </MenuWrapper>
    )
  }

  return (
    <Box sx={tabStyle} component='header'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs onChange={handleSwitchTab} value={tab}>
          {projects.map((project, pIndex) => <Tab key={pIndex} label={project.name} />)}
          <IconButton sx={{ '&:hover': { borderRadius: 0 } }} onClick={() => openModal('create-project')}><AddIcon /></IconButton>
          <IconButton sx={{ '&:hover': { borderRadius: 0 } }} onClick={openMenu}><MoreHorizIcon /></IconButton>
        </Tabs>

        {renderMenu()}
      </Box>

      {projects.map((project, pIndex) => renderTabPanel(tab, pIndex))}
    </Box >
  )
}