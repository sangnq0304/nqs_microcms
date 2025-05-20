import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/store";
import { LoadingProvider } from '@/contexts/LoadingContext';

import ToastProvider from "../contexts/ToastProvider";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
    const router = useRouter();
    useEffect(() => {
        const handleForceLogin = () => {
            router.push("/login");
        };
        window.addEventListener("force-login", handleForceLogin);
        return () => {
            window.removeEventListener("force-login", handleForceLogin);
        };
    }, [router]);

    return (
        <ToastProvider>
            <Provider store={store}>
                <LoadingProvider>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </LoadingProvider>
            </Provider>
        </ToastProvider>
    );
}
