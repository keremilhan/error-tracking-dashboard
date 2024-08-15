import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { LoadingProvider } from './LoadingContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <LoadingProvider>{children}</LoadingProvider>
        </AuthProvider>
    );
};
