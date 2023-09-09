import { IBase } from './base.interface'
import { ITask } from './task.interface'
import { IUpdate } from './update.interface'

export interface IProject extends IBase {
  name: string
  description: string | null
  tasks: ITask[] | string[]
  steps: string[]
  updates: IUpdate[] | string[]
}

export interface IProjectSlice {
  currentProject: string | null
  projectData: IProject[]
}

export interface IProjectContext {
  findProject: (code: string) => IProject | null
  fetchProjects: () => IProject[]
}
