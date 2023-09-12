import { createContext, PropsWithChildren, useContext } from 'react'
import { useSelector } from 'react-redux'

import { IProject, IProjectContext } from '@interfaces/project.interface'
import { SelectProject } from '@store/project.slice'
import { TaskContext } from './useTask'
import { ITask } from '@interfaces/task.interface'
import { IUpdate } from '@interfaces/update.interface'
import { UpdateContext } from './useUpdate'

const initialState: IProjectContext = {
  findProject: (code: string) => null,
  fetchProjects: () => []
}

export const ProjectContext = createContext(initialState)
export function ProjectProvider(props: PropsWithChildren) {
  const allProjects = useSelector(SelectProject).projectData
  const { findTask } = useContext(TaskContext)
  const { findUpdate } = useContext(UpdateContext)

  const populateTask = (project: IProject) => {
    const tasks: ITask[] = []
    if (project.tasks.length > 0) {
      project.tasks.forEach((t) => {
        const findQuery = findTask(t as string)
        if (findQuery) tasks.push(findQuery)
      })
    }
    return tasks
  }

  const populateUpdate = (project: IProject) => {
    const updates: IUpdate[] = []
    if (project.updates.length > 0) {
      project.updates.forEach((u) => {
        const findQuery = findUpdate(u as string)
        if (findQuery) updates.push(findQuery)
      })
    }
    return updates
  }

  const findProject = (code: string) => {
    const index = allProjects.findIndex((p) => p.code === code)
    if (index > -1) {
      const project = allProjects[index]
      const result: IProject = {
        ...project,
        tasks: populateTask(project), // Populate project's tasks
        updates: populateUpdate(project) // Populate project's updates
      }
      return result
    }
    return null
  }

  const fetchProjects = () => {
    const result: IProject[] = []
    allProjects.forEach((p) => {
      const foundProject = findProject(p.code)
      if (foundProject && !result.includes(foundProject)) {
        result.push(foundProject)
      }
    })
    return result
  }

  return (
    <ProjectContext.Provider value={{ findProject, fetchProjects }}>
      {props.children}
    </ProjectContext.Provider>
  )
}
