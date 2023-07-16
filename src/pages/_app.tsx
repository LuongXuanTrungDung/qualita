import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import '@/assets/global.css'
import { wrapper } from '@/store'
import AppWrapper from '@components/common/app.wrapper'

export default function MyApp(appProps: AppProps) {
  const { Component } = appProps
  const { store, props } = wrapper.useWrappedStore(appProps)

  return (
    <Provider store={store}>
      <AppWrapper>
        <Component {...appProps} />
      </AppWrapper>
    </Provider>
  )
}
