import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({ children, categories }) {
    return (
        <div className="main-layout">
            <Header categories={categories} />

            <main className="main-body">{children}</main>
            
            <Footer />
        </div>
    );
}
