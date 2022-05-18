import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import '@src/assets/general.css';
import { ThemeContextProvider } from '@src/contexts/themeContext';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <React.Fragment>
            <ThemeContextProvider>
                <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                </Head>
                <Component {...pageProps} />
            </ThemeContextProvider>
        </React.Fragment>
    );
}