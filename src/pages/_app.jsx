import Head from 'next/head';
import ToastProvider from "../contexts/ToastProvider";
import MainLayout from "@/layout/MainLayout";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
    return (
        <ToastProvider>
            <Head>
                <title>{`Tin tức trong nước và nước ngoài`}</title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <MainLayout categories={pageProps.categories}>
                <Component {...pageProps} />
            </MainLayout>
        </ToastProvider>
    );
}
