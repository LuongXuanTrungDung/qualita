import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState } from '.'
import { HYDRATE } from 'next-redux-wrapper'
import { emptyUpdate } from '@utils/emptyObjects'
import { IUpdate, IUpdateSlice } from '@interfaces/update.interface'

// Initial state
const initialState: IUpdateSlice = {
  currentUpdate: emptyUpdate.code,
  updateData: [],
}

// Actual Slice
export const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    setCurrentUpdate(state, action: PayloadAction<string>) {
      const payload = action.payload
      const updateIndex = state.updateData.findIndex(u => u.code === payload)
      if (updateIndex > -1) {
        state.currentUpdate = state.updateData[updateIndex].code
      }
    },

    setUpdateData(state, action: PayloadAction<IUpdate[]>) {
      const payload = action.payload
      state.updateData = state.updateData.concat(payload)
    },

    addUpdate(state, action: PayloadAction<IUpdate>) {
      const payload = action.payload
      payload.createdTS = new Date().toLocaleDateString()
      state.updateData.push(payload)
    },

    editUpdate(state, action: PayloadAction<IUpdate>) {
      const payload = action.payload
      const updateIndex = state.updateData.findIndex(u => u.code === payload.code)

      if (updateIndex > -1) {
        const getUpdate = state.updateData[updateIndex]
        state.updateData[updateIndex] = {
          ...getUpdate,
          content: payload.content,
          isDeleted: payload.isDeleted,
          lastEditedTS: new Date().toLocaleDateString(),
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
  addUpdate,
  editUpdate,
  setCurrentUpdate,
  setUpdateData,
} = updateSlice.actions

export const SelectUpdate = (state: AppState) => state.update

export default updateSlice.reducer
