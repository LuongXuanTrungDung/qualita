import React, { RefObject, useRef } from 'react';
import Head from 'next/head';

import Header from '@src/partials/header';
import Footer from '@src/partials/footer';

export default function Home() {
    const headerRef = useRef<null | HTMLElement>(null);

    return (
        <React.Fragment>
            <Head>
                <title>Trang chủ</title>
            </Head>

            <div className="dark:bg-black">
                <Header />
                <main className="dark:text-white mx-6">
                    <p className="my-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p className="my-4">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                    <p className="my-4">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                    <p className="my-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    <p className="my-4">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                    <p className="my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id dictum felis, euismod volutpat diam. Duis vitae neque nec erat ultrices tincidunt in at mauris. Pellentesque gravida, ipsum eu ornare venenatis, erat augue ornare nunc, a egestas nibh sapien in turpis. Ut vehicula placerat est in efficitur. Curabitur pharetra erat commodo dolor ultrices dictum. Morbi non purus vel mi feugiat interdum eget id lorem. Nulla vitae elit libero. Morbi gravida semper nisi sit amet pellentesque. In cursus vehicula turpis, eget aliquam eros viverra at. Nunc vestibulum eros ut arcu iaculis consectetur. Integer facilisis in metus in vulputate. Fusce eu auctor lectus. Pellentesque sed blandit ex, sit amet elementum quam. Nulla nec ante vestibulum, varius magna vel, malesuada erat. Suspendisse nec libero porta, eleifend elit id, hendrerit risus.</p>
                    <p className="my-4">Sed pharetra pellentesque lorem a vehicula. Nam eleifend risus odio, sit amet bibendum magna dapibus nec. Nulla quis hendrerit ante, sed bibendum tortor. Donec ac sem a massa hendrerit consectetur. Vestibulum sollicitudin eu eros eget ultrices. Phasellus eleifend ullamcorper pulvinar. Proin vel nunc nisl. Integer commodo, magna tempus sodales blandit, arcu turpis blandit dolor, non mollis dui velit eu nisi. Cras tempus interdum purus ut convallis. Aenean efficitur elit nec commodo feugiat. Morbi id purus gravida quam imperdiet bibendum sed nec dui. Aliquam vestibulum, sapien nec ultrices tincidunt, ligula nibh tempor nisl, et consequat odio felis et nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel mattis magna, eu feugiat arcu. Suspendisse a nisi non orci laoreet viverra. Nam tempor fermentum tellus, eget commodo quam.</p>
                </main>
                <Footer />
            </div>
        </React.Fragment>
    );
}