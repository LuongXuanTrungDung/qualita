import { AppProps } from 'next/app';
import React from 'react';
import '@src/assets/general.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <React.Fragment>
            <Component {...pageProps} />
        </React.Fragment>
    );
}