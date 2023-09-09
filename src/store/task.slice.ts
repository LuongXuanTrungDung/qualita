import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState } from '.'
import { HYDRATE } from 'next-redux-wrapper'
import { ITask, ITaskSlice } from '@interfaces/task.interface'
import { emptyTask } from '@utils/constants'

// Initial state
const initialState: ITaskSlice = {
  currentTask: emptyTask.code,
  taskData: [],
}

// Actual Slice
export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTask(state, action: PayloadAction<string>) {
      const payload = action.payload
      const taskIndex = state.taskData.findIndex(t => t.code === payload)
      if (taskIndex > -1) {
        state.currentTask = state.taskData[taskIndex].code
      }
    },

    setTaskData(state, action: PayloadAction<ITask[]>) {
      const payload = action.payload
      state.taskData = state.taskData.concat(payload)
    },

    addTask(state, action: PayloadAction<ITask>) {
      const payload = action.payload
      payload.createdTS = new Date().toLocaleDateString()
      state.taskData.push(payload)
    },

    editTask(state, action: PayloadAction<ITask>) {
      const payload = action.payload
      const taskIndex = state.taskData.findIndex(t => t.code === payload.code)

      if (taskIndex > -1) {
        const getTask = state.taskData[taskIndex]
        state.taskData[taskIndex] = {
          ...getTask,
          name: payload.name,
          code: payload.code,
          description: payload.description,
          priority: payload.priority,
          step: payload.step,
          isDeleted: payload.isDeleted,
          lastEditedTS: new Date().toLocaleDateString(),
          updates: payload.updates
        }
      }
    },

    addUpdate_intoTask(state, action: PayloadAction<string>) {
      if (state.currentTask) {
        const payload = action.payload
        const projectIndex = state.taskData.findIndex(
          t => t.code === state.currentTask,
        )

        const project = state.taskData[projectIndex]
        const projectUpdates = project.updates as string[]
        if (!projectUpdates.includes(payload)) {
          projectUpdates.push(payload)
        }
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
  setCurrentTask,
  setTaskData,
  addUpdate_intoTask
} = taskSlice.actions

export const SelectTask = (state: AppState) => state.task

export default taskSlice.reducer
