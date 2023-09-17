import { IBase } from "./base.interface"
import { IUpdate } from "./update.interface"

export interface ITask extends IBase {
  name: string
  description: string | null
  priority: number
  step: string
  updates: IUpdate[] | string[]
}

export interface ITaskSlice {
  currentTask: string | null
  taskData: ITask[]
}