import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/auth',
    withCredentials: true,
});

export const login = (email, password) =>
    API.post('/login', { email, password });

export const register = (name, email, password, role) =>
    API.post('/signup', { name, email, password, role });

export const logout = () =>
    API.post('/logout');

export const verifyToken = () =>
    API.get('/verify');
