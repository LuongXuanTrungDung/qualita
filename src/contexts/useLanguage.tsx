import { createContext, PropsWithChildren } from 'react'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'

const initialState = {
  allLanguages: [{ name: '', locale: '' }],
  currentLanguage: 'vi',
  translate: (text: string) => '',
  switchLanguage: (lang: string) => { }
}

export const LanguageContext = createContext(initialState)
export function LanguageProvider(props: PropsWithChildren) {
  const { t, lang } = useTranslation('common')
  const locales = ['en', 'vi']
  const allLanguages = [{ name: 'English', locale: 'en' }, { name: 'Vietnamese', locale: 'vi' }]

  const translate = (text: string) => {
    return t(text)
  }
  const switchLanguage = (lang: string) => {
    if (locales.includes(lang)) setLanguage(lang)
  }

  return (
    <LanguageContext.Provider
      value={{ translate, switchLanguage, allLanguages, currentLanguage: lang }}
    >
      {props.children}
    </LanguageContext.Provider>
  )
}
