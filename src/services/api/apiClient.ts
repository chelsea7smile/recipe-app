import axios, { AxiosResponse, AxiosError } from 'axios';
import { MEALDB_API_BASE_URL, API_TIMEOUT } from '@/constants/api';

const apiClient = axios.create({
  baseURL: MEALDB_API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API request failed:', error.message);

    return Promise.reject(error);
  }
);

export default apiClient;
