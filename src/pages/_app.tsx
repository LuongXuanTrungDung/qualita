import { AppProps } from 'next/app';
import React from 'react';

import '@src/assets/general.css';
import '@src/react-i18n';
import { ThemeContextProvider } from '@src/contexts/themeContext';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <React.Fragment>
            <ThemeContextProvider>
                <Component {...pageProps} />
            </ThemeContextProvider>
        </React.Fragment>
    );
}