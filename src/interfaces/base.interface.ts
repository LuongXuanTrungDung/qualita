export interface IBase {
  code: string
  isDeleted: boolean
  createdTS: string
  lastEditedTS: string | null
}

export interface IMenuProps {
  anchorState: [HTMLElement | null, (el: HTMLElement | null) => void]
}

export type SwitchModeType = 'light' | 'dark' | null

export interface IMark {
  value: number
  label: string
}