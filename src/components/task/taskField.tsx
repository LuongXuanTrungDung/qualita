import { SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import { definitions } from '@/utils/constants'
import TaskColumn from './taskColumn'

export default function TaskField() {
  const taskCols = definitions.kanbanColumns
  const fieldStyle: SxProps<Theme> = {
    display: 'flex',
    alignContent: 'center',
    pb: 2,
    pt: 1,
    flexDirection: { xs: 'column', sm: 'row' },
  }

  return (
    <Box component="section" sx={fieldStyle}>
      {taskCols.map((colName, colIndex) => {
        return (
          <TaskColumn
            isFirst={colIndex === 0}
            isLast={colIndex === taskCols.length - 1}
            name={colName}
            key={colIndex}
          />
        )
      })}
    </Box>
  )
}
