import React, { useState } from 'react';
import Head from 'next/head';

import Header from '@src/partials/header';
import Footer from '@src/partials/footer';
import Carousel from '@src/partials/carousel';
import Contact from '@src/partials/contact';

export default function Home() {
    return (
        <React.Fragment>
            <Head>
                <title>Trang chủ</title>
            </Head>

            <Header />
            <main className="m-6 grid grid-rows-[7rem_auto] grid-cols-3 gap-6">
                <div className="col-span-2 flex">
                    <img src="/portrait.jpg" className="w-28 h-28 rounded-full mr-4" />
                    <div className="ml-4">
                        <h1>Xin chào, tôi là <span className="text-dark dark:text-light">Dũng</span></h1>
                        <p className="mt-1">Tôi là một nhà phát triển web full-stack đến từ Thành phố Hồ Chí
                            Minh, Việt Nam, với mong muốn tạo ra các sản phẩm được thiết kế khoa
                            học và có tính nghệ thuật, để mang đến những trải nghiệm tiện lợi và
                            hữu ích nhất cho người sử dụng.
                        </p>
                    </div>
                </div>
                <Carousel className="row-start-2 col-span-2" />
                <div className="col-start-3 row-span-3 bg-blue-300"></div>
            </main>
            <Footer />
            <Contact />
        </React.Fragment>
    );
}