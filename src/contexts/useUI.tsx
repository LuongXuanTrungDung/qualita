import { IUIContext } from '@interfaces/base.interface'
import { createContext, PropsWithChildren, useState } from 'react'

const initialState = {
  activeModal: '',
  openModal: (code: string) => { },
  closeModal: () => { },
  stepList: ['To-Do', 'Doing', 'Done'],
  addStep: (step: string) => { },
  removeStep: (index: number) => { },
  renameStep: (index: number, name: string) => { },
  priorityMarks: ['lowest', 'low', 'medium', 'high', 'highest'],
  activeTab: 'default',
  switchTab: (tab: string) => { }
}

export const UIContext = createContext(initialState)
export function UIProvider(props: PropsWithChildren) {
  const [modal, setModal] = useState<string>(initialState.activeModal)
  const openModal = (value: string) => setModal(value)
  const closeModal = () => setModal('')

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

  const [activeTab, setActiveTab] = useState<string>(initialState.activeTab)
  const switchTab = (tab: string) => setActiveTab(tab)

  const handlers = {
    openModal, closeModal, switchTab,
    removeStep, renameStep, addStep
  }
  const states = {
    stepList: steps, activeModal: modal, activeTab: activeTab,
    priorityMarks: initialState.priorityMarks
  }

  return (
    <UIContext.Provider value={{ ...handlers, ...states }}>
      {props.children}
    </UIContext.Provider>
  )
}
