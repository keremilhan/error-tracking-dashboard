import { AuthState } from './data';

export const validateNameRequirements = (value: string | undefined) => {
    if (!value) {
        return 'Name field can not be empty.';
    }

    if (value.length < 3) {
        return 'Name must be at least 3 characters long.';
    }
    if (value.length > 50) {
        return 'Name cannot be more than 50 characters long.';
    }

    return;
};
export const validateEmailRequirements = (value: string | undefined) => {
    if (!value) {
        return 'Email field can not be empty.';
    }
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!emailRegex.test(value)) {
        return 'Please provide a valid email.';
    }
};
// Validation function for email
export const validatePasswordRequirements = (value: string | undefined) => {
    if (!value) {
        return 'Email field can not be empty.';
    }
    const errors = [];

    if (value.length < 6) {
        errors.push('6 characters');
    }
    if (!/(?=.*[a-z])/.test(value)) {
        errors.push('one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(value)) {
        errors.push('one uppercase letter');
    }
    if (!/(?=.*\d)/.test(value)) {
        errors.push('one digit');
    }

    if (errors.length > 0) {
        return `Password must include at least ${errors.join(', ')}.`;
    }
};

export const saveUserToLocalStorage = (user: AuthState) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const isSafari = () => {
    const userAgent = navigator.userAgent;
    const chromeAgent = userAgent.includes('Chrome');
    let safariAgent = userAgent.includes('Safari');

    if (chromeAgent && safariAgent) safariAgent = false;

    return safariAgent;
};
