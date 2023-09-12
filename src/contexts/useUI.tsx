import { IUIContext } from '@interfaces/base.interface'
import { createContext, PropsWithChildren, useState } from 'react'

const initialState: IUIContext = {
  activeModal: null,
  openModal: (code) => { },
  closeModal: () => { },
  stepList: ['To-Do', 'Doing', 'Done'],
  addStep: (step) => { },
  removeStep: (index) => { },
  renameStep: (index, name) => { },
  priorityMarks: ['lowest', 'low', 'medium', 'high', 'highest']
}

export const UIContext = createContext(initialState)
export function UIProvider(props: PropsWithChildren) {
  const [modal, setModal] = useState<string | null>(initialState.activeModal)
  const openModal = (value: string) => setModal(value)
  const closeModal = () => setModal(null)

  const [steps, setSteps] = useState<string[]>(initialState.stepList)
  const addStep = (step: string) => {
    const newList = steps.concat([step])
    setSteps(newList)
  }
  const removeStep = (index: number) => {
    const newList = steps.splice(index, 1)
    setSteps(newList)
  }
  const renameStep = (index: number, step: string) => {
    const newList = steps
    newList[index] = step
    setSteps(newList)
  }

  const handlers = { openModal, closeModal, removeStep, renameStep, addStep }
  const states = {
    stepList: steps, activeModal: modal,
    priorityMarks: initialState.priorityMarks
  }

  return (
    <UIContext.Provider value={{ ...handlers, ...states }}>
      {props.children}
    </UIContext.Provider>
  )
}
