import { IBase } from "./base.interface"
import { IUpdate } from "./update.interface"

export interface ITask extends IBase {
  name: string
  description: string | null
  priority: number
  step: string
  updates: IUpdate[]
}

export interface ITaskData {
  code: string
  step: string
  updates: string[]
}

export interface ITaskSlice {
  currentTask: ITaskData
  taskData: ITask[]
}