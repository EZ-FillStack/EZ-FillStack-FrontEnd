import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '';
console.log('API baseURL:', baseURL);

const clientAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

clientAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default clientAPI;
