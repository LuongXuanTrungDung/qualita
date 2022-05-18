import React from 'react';
import Header from '@src/partials/header';
import Footer from '@src/partials/footer';
import Head from 'next/head';

export default function Home() {
    return (
        <React.Fragment>
            <Head>
                <title>Trang chủ</title>
            </Head>

            <Header />
            <main></main>
            <Footer />
        </React.Fragment>
    );
}