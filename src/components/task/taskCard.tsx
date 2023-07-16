import { useDispatch } from 'react-redux'

import { SxProps, Theme } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

import { ITask } from '@interfaces/task.interface'
import { setCurrentTask, toggleTaskModal } from '@store/task.slice'

interface cardProps {
  task: ITask
  index: number
}

const cardStyle: SxProps<Theme> = {
  mt: 2,
  ml: 2,
  mb: 2,
  mr: '1.5rem',
  bgcolor: 'divider',
}

export function TaskCard(props: cardProps) {
  const { task, index } = props
  const dispatch = useDispatch()

  const renderIcon = (prio: number) => {
    switch (prio) {
      case 5:
        return (
          <KeyboardDoubleArrowUpIcon
            color="error"
            sx={{ marginLeft: 'auto' }}
          />
        )
      case 4:
        return (
          <KeyboardArrowUpIcon color="warning" sx={{ marginLeft: 'auto' }} />
        )
      case 3:
        return <DragHandleIcon color="success" sx={{ marginLeft: 'auto' }} />
      case 2:
        return (
          <KeyboardArrowDownIcon color="info" sx={{ marginLeft: 'auto' }} />
        )
      case 1:
        return (
          <KeyboardDoubleArrowDownIcon
            color="secondary"
            sx={{ marginLeft: 'auto' }}
          />
        )
      default:
        break
    }
  }

  const handleClick = () => {
    dispatch(setCurrentTask(task.id))
    dispatch(toggleTaskModal('edit'))
  }

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string,
  ) => {
    event.dataTransfer.setData('text', taskId)
  }

  return (
    <Card
      component="div"
      onClick={handleClick}
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
      sx={cardStyle}
    >
      <CardContent>
        <Stack direction="row" alignContent="center">
          <Typography
            sx={{ marginRight: 'auto', fontSize: 12 }}
            color="text.secondary"
            gutterBottom
          >
            {task.code}
          </Typography>
          {renderIcon(task.priority)}
        </Stack>
        <Typography color="text.primary" sx={{ m: 2 }}>
          {task.name}
        </Typography>
      </CardContent>
    </Card>
  )
}
