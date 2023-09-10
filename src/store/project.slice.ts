import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState } from '.'
import {
  IProject, IProjectSlice,
} from '@/interfaces/project.interface'
import { HYDRATE } from 'next-redux-wrapper'
import { emptyProject } from '@utils/emptyObjects'

// Initial state
const initialState: IProjectSlice = {
  currentProject: emptyProject.code,
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
      state.currentProject = payload[0].code
    },

    setCurrentProject(state, action: PayloadAction<string>) {
      const payload = action.payload
      state.currentProject = payload
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
        state.currentProject = payload.code
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

    addTask_intoProject(state, action: PayloadAction<string>) {
      if (state.currentProject) {
        const payload = action.payload
        const projectIndex = state.projectData.findIndex(
          (p) => p.code === state.currentProject,
        )

        const project = state.projectData[projectIndex]
        const projectTasks = project.tasks as string[]
        if (!projectTasks.includes(payload)) {
          projectTasks.push(payload)
        }
      }
    },

    addUpdate_intoProject(state, action: PayloadAction<string>) {
      if (state.currentProject) {
        const payload = action.payload
        const projectIndex = state.projectData.findIndex(
          (p) => p.code === state.currentProject,
        )

        const project = state.projectData[projectIndex]
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
  addProject,
  editProject,
  setProjectData,
  setCurrentProject,
  addTask_intoProject,
  addUpdate_intoProject
} = projectSlice.actions

export const SelectProject = (state: AppState) => state.project

export default projectSlice.reducer
