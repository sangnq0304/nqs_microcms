import ToastProvider from "../contexts/ToastProvider";

import MainLayout from "@/layout/MainLayout";

import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
    return (
        <ToastProvider>
            <MainLayout categories={pageProps.categories}>
                <Component {...pageProps} />
            </MainLayout>
        </ToastProvider>
    );
}
