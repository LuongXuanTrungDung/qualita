import { createContext, PropsWithChildren, useContext } from 'react'
import { useSelector } from 'react-redux'

import { IProjectData } from '@interfaces/project.interface'
import { selectProject } from '@store/project.slice'
import { TaskContext } from './useTask'
import { emptyContext, emptyResult } from '@utils/constants'

export const ProjectContext = createContext(emptyContext.projectContext)
export function ProjectProvider(props: PropsWithChildren) {
  const allProjects = useSelector(selectProject).projectData
  const { fetchTasks_byProject } = useContext(TaskContext)

  const PFindProject = (id: string) => {
    const index = allProjects.findIndex((p) => p.id === id)
    return index > -1 ? allProjects[index] : emptyResult.project
  }
  const findProject = (id: string) => {
    const findResult = PFindProject(id)
    const projectTasks =
      fetchTasks_byProject !== undefined ? fetchTasks_byProject(id) : []
    return { ...findResult, tasks: projectTasks ? projectTasks : [] }
  }

  const fetchProjects = () => {
    const result: IProjectData[] = []
    allProjects.forEach((p) => {
      const foundProject = findProject(p.id)
      if (foundProject) result.push(foundProject)
    })
    return result
  }

  return (
    <ProjectContext.Provider value={{ findProject, fetchProjects }}>
      {props.children}
    </ProjectContext.Provider>
  )
}
