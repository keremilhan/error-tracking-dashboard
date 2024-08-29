import { createContext, useReducer, ReactNode } from 'react';
import { getUserFromLocalStorage, removeUserFromLocalStorage, saveUserToLocalStorage } from '../utils/functions';
import { AuthContextType } from '../types/types';

// Define types
interface AuthState {
    name: string;
    accessToken: string;
    email: string;
}

// Initial state function that gets initial state from localStorage or sets default values
const getInitialState = (): AuthState => {
    const userFromLocalStorage = getUserFromLocalStorage();
    return userFromLocalStorage || { name: '', accessToken: '', email: '' };
};

// Create context with initial empty value (just for TypeScript)
const initialAuthContext: AuthContextType = {
    authState: getInitialState(),
    login: () => {},
    logout: () => {},
    update: () => {},
};

// Create context
const AuthContext = createContext<AuthContextType>(initialAuthContext);

// Define props type for AuthProvider
interface AuthProviderProps {
    children: ReactNode; // ReactNode allows any valid React children
}

// Reducer function for handling state updates
const authReducer = (state: AuthState, action: { type: string; payload?: AuthState }): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            saveUserToLocalStorage(action.payload!);
            return {
                ...state,
                ...action.payload,
            };
        case 'LOGOUT':
            removeUserFromLocalStorage();
            return {
                name: '',
                accessToken: '',
                email: '',
            };
        case 'UPDATE':
            saveUserToLocalStorage({ ...state, ...action.payload });
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

// AuthProvider component
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, dispatch] = useReducer(authReducer, getInitialState());

    const login = (userData: AuthState) => {
        dispatch({ type: 'LOGIN', payload: userData });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const update = (userData: AuthState) => {
        dispatch({ type: 'UPDATE', payload: userData });
    };

    // Value passed to provider should match the context type
    const contextValue: AuthContextType = {
        authState,
        login,
        logout,
        update,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
