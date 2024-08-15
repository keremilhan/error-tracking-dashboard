import { loginEndPoint, signUpEndPoint } from '../utils/constants/endpoints';
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
