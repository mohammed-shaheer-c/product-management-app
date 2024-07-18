// src/services/authService.js

import {API_BASE_URL} from './api';
import axios from 'axios';

export const addCategory = async (data) => {
    try {
        console.log("data",data);
        const response =  await axios.post(`${API_BASE_URL}/add/category`, data);
        return response.data;
    } catch (error) {
        console.log("err",error);
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const addSubCategory = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add/sub-category`, data);
 
        return response.data;
    } catch (error) {
        console.log("err",error);
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getCategoryWithSubCategory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
 
        return response.data;
    } catch (error) {
        console.log("err",error);
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

