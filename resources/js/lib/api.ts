import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Configuración base de la API
const API_BASE_URL = '/api';

// Crear instancia de axios
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 