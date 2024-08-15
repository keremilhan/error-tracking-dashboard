import { getUserFromLocalStorage } from './functions';

const getAuthHeader = () => {
    const user = getUserFromLocalStorage();
    const headers: any = {};

    if (user) {
        headers.authorization = `Bearer ${user.accessToken}`;
    }

    return { headers };
};

export default getAuthHeader;
