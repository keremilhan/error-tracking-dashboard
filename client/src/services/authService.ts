import { loginEndPoint, signUpEndPoint, usernameUpdateEndPoint, emailUpdateEndPoint, passwordUpdateEndPoint } from '../utils/constants/endpoints';
import axios from 'axios';

export const signIn = async (email: string | undefined, password: string | undefined) => {
    try {
        const response = await axios.post(loginEndPoint, { email, password });
        return response;
    } catch (error) {
        throw error;
    }
};

export const signUp = async (name: string | undefined, email: string | undefined, password: string | undefined) => {
    try {
        const response = await axios.post(signUpEndPoint, { name, email, password });
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateName = async (email: string | undefined, name: string | undefined) => {
    try {
        const response = await axios.post(usernameUpdateEndPoint, { email, name });
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateEmail = async (email: string | undefined, newEmail: string | undefined) => {
    try {
        const response = await axios.post(emailUpdateEndPoint, { email, newEmail });
        return response;
    } catch (error) {
        throw error;
    }
};

export const updatePassword = async (email: string | undefined, password: string | undefined, newPassword: string | undefined) => {
    try {
        const response = await axios.post(passwordUpdateEndPoint, { email, password, newPassword });
        return response;
    } catch (error) {
        throw error;
    }
};
