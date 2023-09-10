import { SyntheticEvent, useContext, useEffect, useState, MouseEvent, useRef, FormEvent } from "react"
import { Box, IconButton, SxProps, Tab, Tabs, MenuItem, Typography, useTheme, Switch, Select, SelectChangeEvent, ListItemIcon } from "@mui/material"

import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { SelectProject } from "@store/project.slice"
import { useSelector } from "react-redux"
import { UIContext } from "@contexts/useUI";
import KanbanBoard from "@components/kanban/board";
import HeaderMenu from "./menu/header.menu";

export default function Header() {
  const { openModal } = useContext(UIContext)
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

  return (
    <Box sx={tabStyle} component='header'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs onChange={handleSwitchTab} value={tab}>
          {projects.map((project, pIndex) => <Tab key={pIndex} label={project.name} />)}
          <IconButton sx={{ '&:hover': { borderRadius: 0 } }} onClick={() => openModal('create-project')}><AddIcon /></IconButton>
          <IconButton sx={{ '&:hover': { borderRadius: 0 } }} onClick={openMenu}><MoreHorizIcon /></IconButton>
        </Tabs>

        <HeaderMenu anchorState={[anchor, setAnchor]} />
      </Box>

      {projects.map((project, pIndex) => renderTabPanel(tab, pIndex))}
    </Box >
  )
}