import { FormEvent } from "react"

export interface IBase {
  code: string
  isDeleted: boolean
  createdTS: string
  lastEditedTS: string | null
}

export interface IUIContext {
  activeModal: string | null
  stepList: string[]
  openModal: (code: string) => void
  closeModal: () => void
  renameStep: (index: number, newName: string) => void
  addStep: (step: string) => void
  removeStep: (index: number) => void
}

export interface IFileContext {
  exportData: () => void
  importData: (event: FormEvent<HTMLInputElement>) => Promise<void>
}

export interface ILanguageContext {
  allLanguages: string[]
  currentLanguage: string
  translate: (text: string) => string
  switchLanguage: (lang: string) => void,
}