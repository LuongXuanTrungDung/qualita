import { IBase } from './base.interface'
import { ITask } from './task.interface'
import { IUpdate } from './update.interface'

export interface IProject extends IBase {
  name: string
  description: string
  tasks: ITask[]
  steps: string[]
  updates: IUpdate[]
}

export interface IProjectData {
  code: string
  steps: string[]
  tasks: string[]
  updates: string[]
}

export interface IProjectSlice {
  currentProject: IProjectData,
  projectData: IProject[]
}