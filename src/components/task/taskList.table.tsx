import { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MaterialReactTable } from 'material-react-table'
import { type MRT_ColumnDef } from 'material-react-table'

import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import { selectTask, setCurrentTask, toggleTaskModal } from '@store/task.slice'
import { LanguageContext } from '@contexts/useLanguage'
import { ITask } from '@interfaces/task.interface'
import { TTaskListColumns, TaskListColumns } from '@utils/tableColumns'

export default function TaskListTable() {
  const dispatch = useDispatch()
  const tasks = useSelector(selectTask).taskData
  const { translate } = useContext(LanguageContext)
  const [data, setData] = useState(tasks)

  const handleEdit = (id: string) => {
    dispatch(setCurrentTask(id))
    dispatch(toggleTaskModal('edit'))
  }

  useEffect(() => {
    setData(tasks)
  }, [tasks])

  const defineColumns = useMemo<MRT_ColumnDef<ITask>[]>(
    () =>
      TaskListColumns.map((def) => {
        var col: MRT_ColumnDef<ITask> = {
          header: translate('table:task.' + def),
          accessorKey: def as TTaskListColumns,
        }

        if (def === 'id') {
          col = {
            ...col,
            header: '',
            Cell: ({ renderedCellValue }) => (
              <Button
                color="secondary"
                startIcon={<EditIcon />}
                onClick={() => handleEdit(renderedCellValue as string)}
              >
                {translate('form:task.editTitle')}
              </Button>
            ),
          }
        }

        return col
      }),
    [],
  )

  return (
    <MaterialReactTable
      columns={defineColumns}
      data={data}
      enableColumnResizing
      enableColumnOrdering
      enableColumnDragging={false}
    />
  )
}
