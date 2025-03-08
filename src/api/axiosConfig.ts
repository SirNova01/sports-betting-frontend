import axios from 'axios';
import { store } from '../store'; 

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:3000',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token; 

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
