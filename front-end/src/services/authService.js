// src/services/authService.js

import api from './api';

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data;
        localStorage.setItem('authToken', token);
        return user;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const signup = async (userData) => {
    try {
        const response = await api.post('/auth/signup', userData);
        const { token, user } = response.data;
        localStorage.setItem('authToken', token);
        return user;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const logout = () => {
    localStorage.removeItem('authToken');
    // Additional logout logic, like redirecting to login page
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data.user;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};
