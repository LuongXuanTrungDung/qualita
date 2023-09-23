import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState } from '.'
import {
  IProject, IProjectSlice,
} from '@/interfaces/project.interface'
import { HYDRATE } from 'next-redux-wrapper'
import { ITask } from '@interfaces/task.interface'
import { IUpdate } from '@interfaces/update.interface'
import { emptyProjectData, getProjectData } from '@utils/emptyData'

// Initial state
const initialState: IProjectSlice = {
  currentProject: emptyProjectData,
  projectData: [],
}

// Actual Slice
export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectData(state, action: PayloadAction<IProject[]>) {
      const payload = action.payload
      state.projectData = state.projectData.concat(payload)
      state.currentProject = getProjectData(payload[0])
    },

    setCurrentProject(state, action: PayloadAction<string>) {
      const payload = action.payload
      const projectIndex = state.projectData.findIndex(
        (p) => p.code === payload,
      )
      if (projectIndex === -1) {
        state.currentProject = getProjectData(state.projectData[projectIndex])
      }
    },

    addProject(state, action: PayloadAction<IProject>) {
      const payload = action.payload
      payload.createdTS = new Date().toLocaleDateString()

      // Prevent duplicate project code
      const projectIndex = state.projectData.findIndex(
        (p) => p.code === payload.code,
      )
      if (projectIndex === -1) {
        state.projectData.push(payload)
        state.currentProject = getProjectData(payload)
      }
    },

    editProject(state, action: PayloadAction<IProject>) {
      const payload = action.payload
      const projectIndex = state.projectData.findIndex(
        (p) => p.code === payload.code,
      )

      if (projectIndex > -1) {
        const getProject = state.projectData[projectIndex]
        state.projectData[projectIndex] = {
          ...getProject,
          name: payload.name,
          description: payload.description,
          isDeleted: payload.isDeleted,
          lastEditedTS: new Date().toLocaleDateString(),
          steps: payload.steps,
          tasks: payload.tasks,
          updates: payload.updates
        }
      }
    },

    addTask_intoProject(state, action: PayloadAction<ITask>) {
      if (state.currentProject) {
        const payload = action.payload
        const projectIndex = state.projectData.findIndex(
          (p) => p.code === state.currentProject.code,
        )

        const project = state.projectData[projectIndex]
        const projectTasks = project.tasks
        if (!projectTasks.includes(payload)) {
          projectTasks.push(payload)
          state.currentProject.tasks.push(payload.code)
        }
      }
    },

    addUpdate_intoProject(state, action: PayloadAction<IUpdate>) {
      if (state.currentProject) {
        const payload = action.payload
        const projectIndex = state.projectData.findIndex(
          (p) => p.code === state.currentProject.code,
        )

        const project = state.projectData[projectIndex]
        const projectUpdates = project.updates
        if (!projectUpdates.includes(payload)) {
          projectUpdates.push(payload)
          state.currentProject.updates.push(payload.code)
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
  addProject,
  editProject,
  setProjectData,
  setCurrentProject,
  addTask_intoProject,
  addUpdate_intoProject
} = projectSlice.actions

export const SelectProject = (state: AppState) => state.project

export default projectSlice.reducer
