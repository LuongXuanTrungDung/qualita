import { FormEvent } from "react"

export interface IBase {
  code: string
  isDeleted: boolean
  createdTS: string
  lastEditedTS: string | null
}

export interface IUIContext {
  activeModal: string | null
  activeTab: string
  stepList: string[]
  priorityMarks: string[]
  openModal: (code: string) => void
  closeModal: () => void
  renameStep: (index: number, newName: string) => void
  addStep: (step: string) => void
  removeStep: (index: number) => void
  switchTab: (tab: string) => void
}

export interface IFileContext {
  exportData: () => void
  importData: (event: FormEvent<HTMLInputElement>) => Promise<void>
}

export interface IMenuProps {
  anchorState: [HTMLElement | null, (el: HTMLElement | null) => void]
}

export type SwitchModeType = 'light' | 'dark' | null

interface ILanguage {
  name: string,
  locale: string
}
export interface ILanguageContext {
  allLanguages: ILanguage[]
  currentLanguage: string
  translate: (text: string) => string
  switchLanguage: (lang: string) => void,
}

export interface IMark {
  value: number
  label: string
}