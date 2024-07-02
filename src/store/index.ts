import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { projectSlice } from './project.slice'
import { taskSlice } from './task.slice'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    reducer: {
      [projectSlice.name]: projectSlice.reducer,
      [taskSlice.name]: taskSlice.reducer,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)
