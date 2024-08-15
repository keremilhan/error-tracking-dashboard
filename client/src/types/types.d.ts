import { IconType } from 'react-icons';

export interface MenuItem {
    text: string;
    href: string;
    icon: IconType;
}

export interface Errors {
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
}

export interface AuthContextType {
    authState: AuthState;
    login: (userData: AuthState) => void;
    logout: () => void;
}

export interface LoadingContextType {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

export type AlertType = 'success' | 'info' | 'warning' | 'danger';
