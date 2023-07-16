import { ITask } from './task.interface'

export interface ProjectDTO {
  name: string
  description: string
  code: string
}

export interface IProject extends ProjectDTO {
  id: string
}

export interface IProjectData extends IProject {
  tasks: ITask[]
}

export interface IProjectSlice {
  showCreateModal: boolean
  showEditModal: boolean
  showDeleteModal: boolean
  currentProject: IProject
  projectData: IProject[]
}

export interface IProjectContext {
  findProject?: (id: string) => IProjectData | null
  fetchProjects?: () => IProjectData[]
}
