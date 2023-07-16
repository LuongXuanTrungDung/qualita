import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState } from '.'
import {
  IProject,
  ProjectDTO,
  IProjectSlice,
} from '@/interfaces/project.interface'
import { HYDRATE } from 'next-redux-wrapper'
import { generateID } from '@/utils/generateString'
import { emptyData } from '@utils/constants'

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
    toggleProjectModal(state, action: PayloadAction<string>) {
      const payload = action.payload.toLowerCase()
      switch (payload) {
        case 'create':
          state.showCreateModal = !state.showCreateModal
          break
        case 'edit':
          state.showEditModal = !state.showEditModal
          break
        case 'delete':
          state.showDeleteModal = !state.showDeleteModal
          break
        default:
          break
      }
    },

    setProjectData(state, action: PayloadAction<IProject[]>) {
      const payload = action.payload
      state.projectData = state.projectData.concat(payload)
      state.currentProject = payload[0]
    },

    setCurrentProject(state, action: PayloadAction<string>) {
      const payload = action.payload
      const projectIndex = state.projectData.findIndex((p) => p.id === payload)
      if (projectIndex > -1) {
        state.currentProject = state.projectData[projectIndex]
      }
    },

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
  setProjectData,
  toggleProjectModal,
  setCurrentProject,
} = projectSlice.actions

export const selectProject = (state: AppState) => state.project

export default projectSlice.reducer
