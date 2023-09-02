import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);
