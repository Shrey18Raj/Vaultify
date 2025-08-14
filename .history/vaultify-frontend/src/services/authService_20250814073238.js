import api from "./api";

export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('vailtify_token', response.data.token);
    }
    return response.data;
};

export const registerUser = async (userData) => {
    return await api.post('./auth/register', userData);
};

export const logoutUser = () => {
    localStorage.removeItem('vaultify_token');
};