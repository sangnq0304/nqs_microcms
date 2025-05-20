import { createContext, useContext, useState } from 'react';
import Loading from '@/components/loading';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ setLoading }}>
            {children}
            {loading && <Loading />}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
} 