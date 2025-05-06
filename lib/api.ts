import { getToken } from '@/store/useAuthstore';
import axios from 'axios';
// small helper to read JWT token from secure storage

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_URL, // example: http://localhost:4000/api
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
