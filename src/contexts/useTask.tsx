import { createContext, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'

import { ITask } from '@/interfaces/task.interface'
import { selectTask } from '@/store/task.slice'
import { emptyContext, emptyData } from '@/utils/constants'

export const TaskContext = createContext(emptyContext.taskContext)
export function TaskProvider(props: PropsWithChildren) {
  const allTasks = useSelector(selectTask).taskData

  const findTask = (taskId: string) => {
    const index = allTasks.findIndex((p) => p.id === taskId)
    return index > -1 ? allTasks[index] : emptyData.task
  }

  const fetchTasks_byProject = (projectId: string) => {
    const result: ITask[] = []
    allTasks.forEach((t) => {
      if (t.project === projectId) result.push(t)
    })
    return result
  }

  return (
    <TaskContext.Provider value={{ findTask, fetchTasks_byProject }}>
      {props.children}
    </TaskContext.Provider>
  )
}
