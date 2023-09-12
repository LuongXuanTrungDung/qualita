import { createContext, PropsWithChildren, useContext } from 'react'
import { useSelector } from 'react-redux'

import { ITask, ITaskContext } from '@interfaces/task.interface'
import { SelectTask } from '@store/task.slice'
import { IUpdate } from '@interfaces/update.interface'
import { UpdateContext } from './useUpdate'

const initialState: ITaskContext = {
  findTask: (code: string) => null,
}

export const TaskContext = createContext(initialState)
export function TaskProvider(props: PropsWithChildren) {
  const allTasks = useSelector(SelectTask).taskData
  const { findUpdate } = useContext(UpdateContext)

  const populateUpdate = (task: ITask) => {
    const updates: IUpdate[] = []
    task.updates.forEach((u) => {
      const findQuery = findUpdate(u as string)
      if (findQuery) updates.push(findQuery)
    })
    return updates
  }

  const findTask = (taskCode: string) => {
    const index = allTasks.findIndex((t) => t.code === taskCode)
    if (index > -1) {
      const task = allTasks[index]
      const result: ITask = {
        ...task,
        updates: populateUpdate(task)
      }
      return result
    }
    return null
  }

  return (
    <TaskContext.Provider value={{ findTask }}>
      {props.children}
    </TaskContext.Provider>
  )
}
