import { SyntheticEvent, useContext, useEffect, useState, MouseEvent } from "react"
import { Box, IconButton, MenuItem, SxProps, Tab, Tabs } from "@mui/material"

import AddIcon from '@mui/icons-material/Add'

import { UIContext } from "@contexts/useUI";
import { LanguageContext } from "@contexts/useLanguage";
import KanbanBoard from "@components/kanban/board";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ProjectContext } from "@contexts/useProject";
import DefaultSpace from "./defaultSpace";

export default function Header() {
  const { openModal, switchTab, activeTab } = useContext(UIContext)
  const { translate } = useContext(LanguageContext)

  const { fetchProjects } = useContext(ProjectContext)
  const [projectTabs, setProjectTabs] = useState(fetchProjects())
  const tabStyle: SxProps = { width: '100%', py: 2 }
  useEffect(() => {
    if (projectTabs.length === 0) {
      setProjectTabs(fetchProjects())
    }
  }, [fetchProjects, projectTabs.length])

  const handleSwitchTab = (event: SyntheticEvent, newTab: string) => switchTab(newTab)
  const renderTabs = () => {
    if (projectTabs.length === 0) {
      return <Tab label={translate('form:project.createTitle')} value={'default'} />
    } else {
      return (
        <>
          {projectTabs.map((project, pIndex) => (
            <MenuItem key={pIndex} value={project.code}>{project.name}</MenuItem>
          ))}
          <IconButton sx={{ '&:hover': { borderRadius: 0 } }} onClick={() => openModal('create-project')}><AddIcon /></IconButton>
        </>
      )
    }
  }

  return (
    <Box sx={tabStyle} component='header'>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} component='nav'>
          <TabList onChange={handleSwitchTab}>
            {renderTabs()}
            <Tab label={translate('common:Settings')} value={'settings'} />
          </TabList>
        </Box>

        {
          projectTabs.length === 0
            ? <TabPanel value="default"><DefaultSpace /></TabPanel>
            : projectTabs.map((project, pIndex) => (
              <TabPanel key={pIndex} value={project.code}><KanbanBoard /></TabPanel>
            ))
        }
        <TabPanel value="settings"></TabPanel>
      </TabContext>
    </Box>
  )
}