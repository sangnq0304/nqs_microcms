import Head from 'next/head';
import ToastProvider from "../contexts/ToastProvider";
import MainLayout from "@/layout/MainLayout";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
    return (
        <ToastProvider>
            <Head>
                <title>{`Tin tức trong nước và nước ngoài`}</title>
                <link rel="icon" href={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`} />
                <meta key="og:title" property="og:title" content="Tin tức trong nước và nước ngoài" />
                <meta key="og:description" property="og:description" content="Tin tức trong nước và nước ngoài" />
                <meta key="og:image" property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`} />
                <meta key="og:url" property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
            </Head>
            <MainLayout categories={pageProps.categories}>
                <Component {...pageProps} />
            </MainLayout>
        </ToastProvider>
    );
}
