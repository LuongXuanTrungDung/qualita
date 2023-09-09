import { createContext, PropsWithChildren } from 'react'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'
import { ILanguageContext } from '@interfaces/base.interface'

const initialState: ILanguageContext = {
  allLanguages: [],
  currentLanguage: 'vi',
  translate: (text) => '',
  switchLanguage: (lang) => { }
}

export const LanguageContext = createContext(initialState)
export function LanguageProvider(props: PropsWithChildren) {
  const { t, lang } = useTranslation('common')
  const languages = ['en', 'vi']

  const translate = (text: string) => {
    return t(text)
  }
  const switchLanguage = (lang: string) => {
    if (languages.includes(lang)) setLanguage(lang)
  }

  return (
    <LanguageContext.Provider
      value={{ translate, switchLanguage, allLanguages: languages, currentLanguage: lang }}
    >
      {props.children}
    </LanguageContext.Provider>
  )
}
