import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { AppState } from '.'
import { HYDRATE } from 'next-redux-wrapper'
import { generateID } from '@/utils/generateString'
import { ITask, TaskDTO, ITaskSlice } from '@/interfaces/task.interface'
import { definitions, emptyData } from '@/utils/constants'

// Initial state
const initialState: ITaskSlice = {
  showCreateModal: false,
  showEditModal: false,
  showDeleteModal: false,
  currentTask: emptyData.task,
  taskData: [],
}

// Actual Slice
export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTaskStatus(
      state,
      action: PayloadAction<{ id: string; status: string }>,
    ) {
      const payload = action.payload
      const taskIndex = state.taskData.findIndex((p) => p.id === payload.id)
      if (
        taskIndex > -1 &&
        definitions.kanbanColumns.includes(payload.status)
      ) {
        state.taskData[taskIndex].status = payload.status
      }
    },

    addTask(state, action: PayloadAction<TaskDTO>) {
      const payload = action.payload
      state.taskData.push({ id: generateID(16), ...payload })

      if (state.currentTask === emptyData.task) {
        state.currentTask = state.taskData[0]
      }
    },

    editTask(state, action: PayloadAction<ITask>) {
      const payload = action.payload
      const taskIndex = state.taskData.findIndex((p) => p.id === payload.id)
      if (taskIndex > -1) {
        const getTask = state.taskData[taskIndex]
        state.taskData[taskIndex] = {
          ...getTask,
          name: payload.name,
          code: payload.code,
          description: payload.description,
          priority: payload.priority,
          project: payload.project,
        }
      }
    },

    removeTask(state, action: PayloadAction<string>) {
      const payload = action.payload
      const taskIndex = state.taskData.findIndex((p) => p.id === payload)
      if (taskIndex > -1) {
        state.taskData.splice(taskIndex, 1)
      }
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action,
      }
    })
  },
})

export const {
  addTask,
  editTask,
  removeTask,
  updateTaskStatus,
} = taskSlice.actions

export const selectTask = (state: AppState) => state.task

export default taskSlice.reducer
