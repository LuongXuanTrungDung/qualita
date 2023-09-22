import { createContext, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'

import { SelectTask } from '@store/task.slice'
import { emptyTask } from '@utils/emptyObjects'

const initialState = {
  findTask: (code: string) => emptyTask,
}

export const TaskContext = createContext(initialState)
export function TaskProvider(props: PropsWithChildren) {
  const allTasks = useSelector(SelectTask).taskData

  const findTask = (taskCode: string) => {
    const index = allTasks.findIndex((t) => t.code === taskCode)
    return index > -1 ? allTasks[index] : emptyTask
  }

  return (
    <TaskContext.Provider value={{ findTask }}>
      {props.children}
    </TaskContext.Provider>
  )
}
