import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SxProps, Theme } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import {
  selectTask,
  toggleTaskModal,
  updateTaskStatus,
} from '@store/task.slice'
import { TaskCard } from './taskCard'
import { LanguageContext } from '@contexts/useLanguage'

interface colProps {
  name: string
  isFirst: boolean
  isLast: boolean
}

export default function TaskColumn(props: colProps) {
  const { name, isFirst, isLast } = props
  const dispatch = useDispatch()
  const tasks = useSelector(selectTask).taskData
  const { translate } = useContext(LanguageContext)

  const taskColStyle: SxProps<Theme> = {
    width: '100%',
    minHeight: { xs: '100%', sm: 200 },
    mt: { xs: isFirst ? 0 : 2, sm: 0 },
    mb: { xs: isLast ? 2 : 0, sm: 0 },
    ml: { xs: 0, sm: isFirst ? 0 : 2 },
    mr: { xs: 0, sm: isLast ? 2 : 0 },
    bgcolor: 'action.disabledBackground',
  }
  const taskTitleStyle: SxProps<Theme> = {
    marginLeft: 2,
    my: 2,
    marginRight: 1,
  }
  const taskCountStyle: SxProps<Theme> = {
    ml: 0.5,
    mb: 2,
    mt: '1.45rem',
    fontSize: 13,
    color: 'text.secondary',
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const taskId = event.dataTransfer.getData('text')
    dispatch(updateTaskStatus({ id: taskId, status: name }))
  }
  const colName = translate(name)
  const taskAmount = tasks.filter((task) => task.status === name).length

  return (
    <Paper
      component="div"
      sx={taskColStyle}
      onDragOver={(event: React.DragEvent<HTMLDivElement>) =>
        event.preventDefault()
      }
      onDrop={handleDrop}
      onDoubleClick={() => dispatch(toggleTaskModal('create'))}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant="h6" component="h6" sx={taskTitleStyle}>
          {colName}
        </Typography>
        <Typography component="p" sx={taskCountStyle}>
          {'(' + (taskAmount + '') + ')'}
        </Typography>
      </Box>

      {tasks.map((task, taskIndex) => {
        if (task.status === name)
          return <TaskCard key={taskIndex} index={taskIndex} task={task} />
      })}
    </Paper>
  )
}
