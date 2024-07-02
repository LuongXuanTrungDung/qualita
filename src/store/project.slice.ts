import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState } from '.'
import {
  IProject,
  ProjectDTO,
  IProjectSlice,
} from '@/interfaces/project.interface'
import { HYDRATE } from 'next-redux-wrapper'
import { generateID } from '@/utils/generateString'
import { emptyData } from '@/utils/constants'

// Initial state
const initialState: IProjectSlice = {
  showCreateModal: false,
  showEditModal: false,
  showDeleteModal: false,
  currentProject: emptyData.project,
  projectData: [],
}

// Actual Slice
export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<ProjectDTO>) {
      const payload = action.payload
      const project = { id: generateID(16), ...payload }
      state.projectData.push(project)
      state.currentProject = project
    },

    editProject(state, action: PayloadAction<IProject>) {
      const payload = action.payload
      const projectIndex = state.projectData.findIndex(
        (p) => p.id === payload.id,
      )
      if (projectIndex > -1) {
        const getProject = state.projectData[projectIndex]
        state.projectData[projectIndex] = {
          ...getProject,
          name: payload.name,
          description: payload.description,
        }
      }
    },

    removeProject(state, action: PayloadAction<string>) {
      const payload = action.payload
      const projectIndex = state.projectData.findIndex((p) => p.id === payload)
      if (projectIndex > -1) {
        state.projectData.splice(projectIndex, 1)
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
  removeProject,
} = projectSlice.actions

export const selectProject = (state: AppState) => state.project

export default projectSlice.reducer
