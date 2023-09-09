import { createContext, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'

import { IUpdateContext } from '@interfaces/update.interface'
import { SelectUpdate } from '@store/update.slice'

const initialState: IUpdateContext = {
  findUpdate: (code: string) => null,
}

export const UpdateContext = createContext(initialState)
export function UpdateProvider(props: PropsWithChildren) {
  const allUpdates = useSelector(SelectUpdate).updateData

  const findUpdate = (updateCode: string) => {
    const index = allUpdates.findIndex((u) => u.code === updateCode)
    return index > -1 ? allUpdates[index] : null
  }

  return (
    <UpdateContext.Provider value={{ findUpdate }}>
      {props.children}
    </UpdateContext.Provider>
  )
}
