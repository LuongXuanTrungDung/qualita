import { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { SxProps, Theme, Box, Tab, IconButton, Button, Paper, Typography, Stack } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { SelectProject } from '@store/project.slice'
import { LanguageContext } from '@contexts/useLanguage'
import { UIContext } from '@contexts/useUI'
import Footer from '@components/footer'
import ModalList from '@components/common/modalList'

export default function Home() {
  const mainStyle: SxProps<Theme> = {
    width: '100%',
    px: { xs: 0, sm: 2 },
    bgcolor: 'background.default',
    color: 'text.primary',
  }

  const { translate } = useContext(LanguageContext)
  const { openModal } = useContext(UIContext)

  const projects = useSelector(SelectProject).projectData
  const [projectTab, setProjectTab] = useState<string | null>(null)
  useEffect(() => {
    if (projectTab === null && projects.length > 0) {
      setProjectTab(projects[0].code)
    }
  }, [projectTab, projects])

  const handleSwitchTab = (event: SyntheticEvent, newTab: string) => setProjectTab(newTab)
  return (
    <>
      <Box sx={mainStyle} component='main'>
        {projectTab && projects.length > 0 ?
          (
            <TabContext value={projectTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleSwitchTab}>
                  {projects.map((project, pIndex) => <Tab key={pIndex} label={project.name} value={project.code} />)}
                  <IconButton sx={{ '&:hover': { borderRadius: 0 } }} onClick={() => openModal('create-project')}><AddIcon /></IconButton>
                  <IconButton sx={{ '&:hover': { borderRadius: 0 } }} onClick={() => openModal('project-settings')}><MoreHorizIcon /></IconButton>
                </TabList>
              </Box>

              {projects.map((project, pIndex) => <TabPanel key={pIndex} value={project.code}></TabPanel>)}
            </TabContext>
          ) : (
            <Button
              onClick={() => openModal('create-project')}
              sx={{
                mx: 'auto', my: 2, height: 'calc(100vh - 4rem)', width: '100%', bgcolor: 'action.disabledBackground',
                ":hover": { bgcolor: 'action.selected' }
              }}
            >
              <Stack flexDirection='column'>
                <AddCircleIcon sx={{ mx: 'auto', mb: 1 }} color='success' />
                <Typography sx={{ textAlign: 'center', mt: 1 }}>{translate('form:project.createTitle')}</Typography>
              </Stack>
            </Button>
          )}

        <Footer />
      </Box>

      <ModalList />
    </>
  )
}
