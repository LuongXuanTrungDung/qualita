import { IBase } from '@interfaces/base.interface'
import { IProject } from '@interfaces/project.interface'
import { ITask } from '@interfaces/task.interface'
import { IUpdate } from '@interfaces/update.interface'

const emptyBase: IBase = {
  code: '', isDeleted: false, createdTS: '', lastEditedTS: null
}
export const emptyProject: IProject = {
  ...emptyBase, name: '', description: null,
  tasks: [], steps: ['To-Do', 'Doing', 'Done'], updates: []
}
export const emptyTask: ITask = {
  ...emptyBase, name: '', description: null, priority: 1,
  step: 'To-Do', updates: []
}
export const emptyUpdate: IUpdate = {
  ...emptyBase, content: ''
}