import { createContext, useState, ReactNode } from 'react';
import { LoadingContextType } from '../types/types';

const initialLoadingContext: LoadingContextType = {
    isLoading: false,
    showLoading: () => {},
    hideLoading: () => {},
};

const LoadingContext = createContext<LoadingContextType>(initialLoadingContext);

interface LoadingProviderProps {
    children: ReactNode;
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    // Value passed to provider should match the context type
    const contextValue: LoadingContextType = {
        isLoading,
        showLoading,
        hideLoading,
    };

    return <LoadingContext.Provider value={contextValue}>{children}</LoadingContext.Provider>;
};

export { LoadingContext, LoadingProvider };
