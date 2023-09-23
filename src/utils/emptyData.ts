import { IProject, IProjectData } from "@interfaces/project.interface";
import { ITask, ITaskData } from "@interfaces/task.interface";

export const emptyProjectData: IProjectData = {
  code: '', steps: ['To-Do', 'Doing', 'Done'], tasks: [], updates: []
}
export function getProjectData(obj: IProject): IProjectData {
  return {
    code: obj.code, steps: obj.steps,
    tasks: obj.tasks.map(t => t.code),
    updates: obj.updates.map(u => u.code)
  }
}

export const emptyTaskData: ITaskData = {
  code: '', step: 'To-Do', updates: []
}
export function getTaskData(obj: ITask) {
  return {
    code: obj.code, step: obj.step,
    updates: obj.updates.map(u => u.code)
  }
}