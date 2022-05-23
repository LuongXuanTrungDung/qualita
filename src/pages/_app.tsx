import { AppProps } from 'next/app';
import React from 'react';

import '@src/assets/general.css';
import { ThemeContextProvider } from '@src/contexts/themeContext';
import { ContactModalContextrovider } from '@src/contexts/contactModalContext';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <React.Fragment>
            <ContactModalContextrovider>
                <ThemeContextProvider>
                    <Component {...pageProps} />
                </ThemeContextProvider>
            </ContactModalContextrovider>
        </React.Fragment>
    );
}