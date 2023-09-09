import { PropsWithChildren } from 'react'

import { ProjectProvider } from '@contexts/useProject'
import { TaskProvider } from '@contexts/useTask'
import { FileProvider } from '@contexts/useFile'
import { ColorModeProvider } from '@contexts/useColorMode'
import { LanguageProvider } from '@contexts/useLanguage'
import { UpdateProvider } from '@contexts/useUpdate'
import { UIProvider } from '@contexts/useUI'

export default function AppWrapper(props: PropsWithChildren) {
  return (
    <LanguageProvider>
      <ColorModeProvider>
        <UIProvider>
          <UpdateProvider>
            <TaskProvider>
              <ProjectProvider>
                <FileProvider>{props.children}</FileProvider>
              </ProjectProvider>
            </TaskProvider>
          </UpdateProvider>
        </UIProvider>
      </ColorModeProvider>
    </LanguageProvider>
  )
}
