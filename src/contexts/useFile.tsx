import { createContext, PropsWithChildren, useContext, FormEvent } from 'react'
import { useDispatch } from 'react-redux'

import { ProjectContext } from './useProject'
import { setProjectData } from '@store/project.slice'
import { IProject } from '@interfaces/project.interface'
import { ITask } from '@interfaces/task.interface'
import { setTaskData } from '@store/task.slice'
import { IUpdate } from '@interfaces/update.interface'
import { setUpdateData } from '@store/update.slice'

const initialState = {
  exportData: () => { },
  importData: (event: FormEvent<HTMLInputElement>) => new Promise<void>(() => { }),
}

export const FileContext = createContext(initialState)
export function FileProvider(props: PropsWithChildren) {
  const dispatch = useDispatch()
  const { fetchProjects } = useContext(ProjectContext)

  const exportData = () => {
    const allProjects = fetchProjects ? fetchProjects() : []
    const downloadContent = JSON.stringify(allProjects)
    const voidElement = document.createElement('a')

    voidElement.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(downloadContent),
    )
    voidElement.setAttribute('download', 'qualita_projects.json')
    voidElement.style.display = 'none'

    document.body.append(voidElement)
    voidElement.click()
    document.body.removeChild(voidElement)
  }

  const importData = async (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget && event.currentTarget.files) {
      const fileContent = await event.currentTarget.files[0].text()
      const importedData: IProject[] = JSON.parse(fileContent)
      const importedProjects: IProject[] = []
      let importedTasks: ITask[] = []
      let importedUpdates: IUpdate[] = []

      importedData.forEach((pData) => {
        importedProjects.push(pData)
        importedTasks = importedTasks.concat(pData.tasks as ITask[])
        importedUpdates = importedUpdates.concat(pData.updates as IUpdate[])
      })
      dispatch(setProjectData(importedProjects))
      dispatch(setTaskData(importedTasks))
      dispatch(setUpdateData(importedUpdates))
    }
  }

  return (
    <FileContext.Provider value={{ exportData, importData }}>
      {props.children}
    </FileContext.Provider>
  )
}
