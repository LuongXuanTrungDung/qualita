import { createContext, PropsWithChildren, useContext, FormEvent } from 'react'
import { useDispatch } from 'react-redux'

import { ProjectContext } from './useProject'
import { setProjectData } from '@store/project.slice'
import { IProject, IProjectData } from '@interfaces/project.interface'
import { ITask } from '@interfaces/task.interface'
import { setTaskData } from '@store/task.slice'
import { generateID } from '@utils/generateString'
import { emptyContext } from '@utils/constants'

export const FileContext = createContext(emptyContext.fileContext)
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
      const importedData: IProjectData[] = JSON.parse(fileContent)
      const importedProjects: IProject[] = []
      let importedTasks: ITask[] = []

      importedData.forEach((pData) => {
        const { tasks, ...project } = pData
        project.id = project.id !== '' ? project.id : generateID(16)
        tasks.forEach((t) => {
          t.id = t.id !== '' ? t.id : generateID(16)
        })

        importedProjects.push(project)
        importedTasks = importedTasks.concat(tasks)
      })
      dispatch(setProjectData(importedProjects))
      dispatch(setTaskData(importedTasks))
    }
  }

  return (
    <FileContext.Provider value={{ exportData, importData }}>
      {props.children}
    </FileContext.Provider>
  )
}
