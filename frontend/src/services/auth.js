import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
};

export const register = async (name, email, password, role) => {
    const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password, role });
    return response.data;
};

export const logout = async () => {
    const response = await axios.get(`${API_URL}/auth/logout`);
    return response.data;
};