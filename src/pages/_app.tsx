import { AppProps } from 'next/app';
import '@src/assets/general.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}