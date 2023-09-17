import { IBase } from './base.interface'
import { ITask } from './task.interface'
import { IUpdate } from './update.interface'

export interface IProject extends IBase {
  name: string
  description: string
  tasks: ITask[] | string[]
  steps: string[]
  updates: IUpdate[] | string[]
}

export interface IProjectSlice {
  currentProject: string
  projectData: IProject[]
}