import { PropsWithChildren } from 'react'

import { ProjectProvider } from '@/contexts/useProject'
import { TaskProvider } from '@/contexts/useTask'
import { ColorModeProvider } from '@/contexts/useColorMode'
import { LanguageProvider } from '@/contexts/useLanguage'

export default function AppWrapper(props: PropsWithChildren) {
    return (
        <LanguageProvider>
            <ColorModeProvider>
                <TaskProvider>
                    <ProjectProvider>{props.children}
                    </ProjectProvider>
                </TaskProvider>
            </ColorModeProvider>
        </LanguageProvider>
    )
}
