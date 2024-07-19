// src/services/authService.js

import {API_BASE_URL} from './api';
import axios from 'axios';

export const addNewProduct = async (data) => {
    try {

        const formData = new FormData();

        // Append basic fields to formData
        formData.append('title', data.title);
        formData.append('subCategory', data.subCategory);
        formData.append('description', data.description);

        // Append variants as a JSON string
        formData.append('variants', JSON.stringify(data.variants));


        // Append new images (file objects)
        data.newImages.forEach((image, index) => {
            formData.append(`images`, image.file);
        });
        const response =  await axios.post(`${API_BASE_URL}/add/product`, formData);
        return response.data;
    } catch (error) {
        console.log("err",error);
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const editProduct = async (data) => {
    try {

        const formData = new FormData();

        // Append basic fields to formData
        formData.append('productId', data.productId);
        formData.append('title', data.title);
        formData.append('subCategory', data.subCategory);
        formData.append('description', data.description);

        // Append variants as a JSON string
        formData.append('variants', JSON.stringify(data.variants));

        // Append new images (file objects)
        data.newImages.forEach((image, index) => {
            formData.append(`images`, image.file);
        });
        const response = await axios.post(`${API_BASE_URL}/edit/product`, data);
 
        return response.data;
    } catch (error) {
        console.log("err",error);
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getParticularProduct = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
 
        return response.data;
    } catch (error) {
        console.log("err",error);
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getAllProductWithSearch = async (searchFilterValues) => {
    try {

        const response = await axios.post(`${API_BASE_URL}/packages`,searchFilterValues); 
        return response.data;
    } catch (error) {
        console.log("err",error);
        throw error.response ? error.response.data : new Error('Network Error');
    }
};
