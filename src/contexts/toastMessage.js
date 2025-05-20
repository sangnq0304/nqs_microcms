import { createContext, useContext } from "react";

export const ToastMessage = createContext({
    showToast: (message, type) => {},
});

export const useToast = () => useContext(ToastMessage);