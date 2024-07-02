import { createContext, PropsWithChildren } from 'react'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'
import { emptyContext } from '@/utils/constants'

export const LanguageContext = createContext(emptyContext.languageContext)
export function LanguageProvider(props: PropsWithChildren) {
  const { t, lang } = useTranslation('common')

  const translate = (text: string) => {
    return t(text)
  }
  const currentLanguage = () => lang
  const switchLanguage = (lang: string) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider
      value={{ translate, currentLanguage, switchLanguage }}
    >
      {props.children}
    </LanguageContext.Provider>
  )
}
