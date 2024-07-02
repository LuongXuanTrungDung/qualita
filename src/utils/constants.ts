import { FormEvent } from 'react'

export const definitions = {
  kanbanColumns: ['To-Do', 'Doing', 'Done'],
  viewModes: ['kanban', 'taskList'],
  defaultLanguage: 'vi',
  priorityMarks: [
    { value: 1, label: 'Rất thấp' },
    { value: 2, label: 'Thấp' },
    { value: 3, label: 'Trung bình' },
    { value: 4, label: 'Cao' },
    { value: 5, label: 'Rất cao' },
  ],
  languages: [
    { locale: 'en', name: 'English' },
    { locale: 'vi', name: 'Vietnamese' },
  ],
}

export const emptyObject = {
  project: { name: '', description: '', code: '' },
  task: {
    name: '',
    description: '',
    code: '',
    project: '',
    priority: 1,
    status: 'To-Do',
  },
}

export const emptyData = {
  project: { id: '', ...emptyObject.project },
  task: { id: '', ...emptyObject.task },
}

export const emptyResult = {
  project: { id: '', ...emptyObject.project, tasks: [{ ...emptyData.task }] },
}

export const emptyContext = {
  projectContext: {
    findProject: (id: string) => emptyResult.project,
    fetchProjects: () => [emptyResult.project],
  },
  taskContext: {
    findTask: (taskId: string) => emptyData.task,
    fetchTasks_byProject: (projectId: string) => [emptyData.task],
  },
  fileContext: {
    exportData: () => {},
    importData: (event: FormEvent<HTMLInputElement>) =>
      new Promise<void>(() => {}),
  },
  languageContext: {
    translate: (text: string) => '',
    currentLanguage: () => '',
    switchLanguage: (locale: string) => {},
  },
  drawerContext: {
    isDrawn: () => false,
    toDraw: (state: boolean) => {},
  },
}
