export const baseUrl = import.meta.env.VITE_BASE_URL;

export const loginEndPoint = `${baseUrl}/auth/login`;

export const signUpEndPoint = `${baseUrl}/auth/register`;

export const usernameUpdateEndPoint = `${baseUrl}/auth/user/name`;

export const emailUpdateEndPoint = `${baseUrl}/auth/user/email`;

export const passwordUpdateEndPoint = `${baseUrl}/auth/user/password`;
