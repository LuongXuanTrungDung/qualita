import { PropsWithChildren } from 'react'

import { ProjectProvider } from '@contexts/useProject'
import { TaskProvider } from '@contexts/useTask'
import { FileProvider } from '@contexts/useFile'
import { ColorModeProvider } from '@contexts/useColorMode'
import { LanguageProvider } from '@contexts/useLanguage'

export default function AppWrapper(props: PropsWithChildren) {
  return (
    <LanguageProvider>
      <ColorModeProvider>
        <TaskProvider>
          <ProjectProvider>
            <FileProvider>{props.children}</FileProvider>
          </ProjectProvider>
        </TaskProvider>
      </ColorModeProvider>
    </LanguageProvider>
  )
}
