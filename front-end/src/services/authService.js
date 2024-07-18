// src/services/authService.js

import {API_BASE_URL} from './api';
import axios from 'axios';

export const signup = async (userData) => {
    try {
        const response =  await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.log("err",error);
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const login = async (userData) => {
    try {
        console.log("`${API_BASE_URL}/auth/login`",`${API_BASE_URL}/auth/login`);
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
 
        return response.data;
    } catch (error) {
        console.log("err",error);
        throw error.response ? error.response.data : new Error('Network Error');
    }
};



