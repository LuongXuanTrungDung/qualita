export interface TaskDTO {
    name: string
    code: string
    description: string
    priority: number
    status: string
    project: string
  }

  export interface ITask extends TaskDTO {
    id: string
  }

  export interface ITaskSlice {
    showCreateModal: boolean
    showEditModal: boolean
    showDeleteModal: boolean
    currentTask: ITask
    taskData: ITask[]
  }
