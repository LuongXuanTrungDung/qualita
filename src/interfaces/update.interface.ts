import { IBase } from "./base.interface";

export interface IUpdate extends IBase {
  content: string
}

export interface IUpdateSlice {
  currentUpdate: string | null
  updateData: IUpdate[]
}

export interface IUpdateContext {
  findUpdate: (updateCode: string) => IUpdate | null
}