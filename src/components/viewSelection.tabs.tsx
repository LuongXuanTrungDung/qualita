import { SyntheticEvent, useContext, useState } from 'react'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Tab } from '@mui/material'

import { LanguageContext } from '@contexts/useLanguage'
import { definitions } from '@utils/constants'
import TaskField from './task/taskField'
import TaskListTable from './task/taskList.table'
import { useDispatch } from 'react-redux'

export default function ViewSelection() {
  const { translate } = useContext(LanguageContext)
  const [mode, setMode] = useState('kanban')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setMode(newValue)
  }

  return (
    <TabContext value={mode}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange}>
          {definitions.viewModes.map((view, vIndex) => (
            <Tab
              key={vIndex}
              label={translate('common:' + view)}
              value={view}
            />
          ))}
        </TabList>
      </Box>

      <TabPanel
        sx={{ width: { xs: '100vw', sm: 'auto' }, px: { xs: 0, sm: 'auto' } }}
        value="kanban"
      >
        <TaskField />
      </TabPanel>
      <TabPanel
        sx={{ width: { xs: '100vw', sm: 'auto' }, px: { xs: 0, sm: 'auto' } }}
        value="taskList"
      >
        <TaskListTable />
      </TabPanel>
    </TabContext>
  )
}
