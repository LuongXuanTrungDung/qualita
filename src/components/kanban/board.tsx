import { SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import TaskColumn from './column'
import { useContext } from 'react'
import { UIContext } from '@contexts/useUI'

export default function KanbanBoard() {
  const { stepList } = useContext(UIContext)
  const fieldStyle: SxProps<Theme> = {
    display: 'flex',
    alignContent: 'center',
    pb: 2,
    pt: 1,
    flexDirection: { xs: 'column', sm: 'row' },
  }

  return (
    <Box component="section" sx={fieldStyle}>
      {stepList.map((colName, colIndex) => {
        return (
          <TaskColumn
            isFirstColumn={colIndex === 0}
            isLastColumn={colIndex === stepList.length - 1}
            columnName={colName}
            key={colIndex}
          />
        )
      })}
    </Box>
  )
}
