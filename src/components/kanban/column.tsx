import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SxProps, Theme } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { SelectTask } from '@store/task.slice'
// import { TaskCard } from './taskCard'
import { LanguageContext } from '@contexts/useLanguage'
import { UIContext } from '@contexts/useUI'

interface colProps {
  columnName: string
  isFirstColumn: boolean
  isLastColumn: boolean
}

export default function TaskColumn(props: colProps) {
  const { columnName, isFirstColumn, isLastColumn } = props
  const dispatch = useDispatch()
  const tasks = useSelector(SelectTask).taskData
  const { translate } = useContext(LanguageContext)
  const { openModal } = useContext(UIContext)

  const taskColStyle: SxProps<Theme> = {
    width: '100%',
    minHeight: { xs: '100%', sm: 200 },
    mt: { xs: isFirstColumn ? 0 : 2, sm: 0 },
    mb: { xs: isLastColumn ? 2 : 0, sm: 0 },
    ml: { xs: 0, sm: isFirstColumn ? 0 : 2 },
    mr: { xs: 0, sm: isLastColumn ? 2 : 0 },
    bgcolor: 'action.disabledBackground',
  }
  const taskTitleStyle: SxProps<Theme> = {
    marginLeft: 2,
    my: 2,
    marginRight: 1,
  }
  const taskCountStyle: SxProps<Theme> = {
    mb: 2,
    mt: 3,
    fontSize: 13,
    color: 'text.secondary',
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const taskId = event.dataTransfer.getData('text')
    // dispatch(updateTaskStatus({ id: taskId, status: name }))
  }
  const colName = translate(columnName)
  const taskAmount = tasks.filter((task) => task.step === columnName).length

  return (
    <Paper
      component="div"
      sx={taskColStyle}
      onDragOver={(event: React.DragEvent<HTMLDivElement>) =>
        event.preventDefault()
      }
      onDrop={handleDrop}
      onDoubleClick={() => openModal('create-task')}
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
        if (task.step === columnName)
          // return <TaskCard key={taskIndex} index={taskIndex} task={task} />
          return (<></>)
      })}
    </Paper>
  )
}
