import { ToastMessage } from "./toastMessage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider({children}) {
    const showToast = (message, type = "info") => {
        toast[type](message);
    };

    return (
        <ToastMessage.Provider value={{ showToast }}>
            {children}
            <ToastContainer position="bottom-center" />
        </ToastMessage.Provider>
    )
}