import { createContext, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'

import { SelectUpdate } from '@store/update.slice'
import { emptyUpdate } from '@utils/emptyObjects'

const initialState = {
  findUpdate: (code: string) => emptyUpdate,
}

export const UpdateContext = createContext(initialState)
export function UpdateProvider(props: PropsWithChildren) {
  const allUpdates = useSelector(SelectUpdate).updateData

  const findUpdate = (updateCode: string) => {
    const index = allUpdates.findIndex((u) => u.code === updateCode)
    return index > -1 ? allUpdates[index] : emptyUpdate
  }

  return (
    <UpdateContext.Provider value={{ findUpdate }}>
      {props.children}
    </UpdateContext.Provider>
  )
}
