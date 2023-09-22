import { createContext, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'

import { IProject } from '@interfaces/project.interface'
import { SelectProject } from '@store/project.slice'
import { emptyProject } from '@utils/emptyObjects'

const initialState = {
  findProject: (code: string) => emptyProject,
  fetchProjects: () => [emptyProject]
}

export const ProjectContext = createContext(initialState)
export function ProjectProvider(props: PropsWithChildren) {
  const allProjects = useSelector(SelectProject).projectData

  const findProject = (code: string) => {
    const index = allProjects.findIndex((p) => p.code === code)
    return index > -1 ? allProjects[index] : emptyProject
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
