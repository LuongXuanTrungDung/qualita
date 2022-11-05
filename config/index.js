import en from '../locales/en'
import vi from '../locales/vi'

export const I18N = {
  locales: [
    {
      code: 'en',
      name: 'English'
    },
    {
      code: 'vi',
      name: 'Tiếng Việt'
    },
  ],
  defaultLocale: 'vi',
  routes: {
    // about: {
    //   vi: '/gioi-thieu',
    //   en: '/about-us'
    // }
  },
  vueI18n: {
    fallbackLocale: 'vi',
    messages: { en, vi }
  }
}
