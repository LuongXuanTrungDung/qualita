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