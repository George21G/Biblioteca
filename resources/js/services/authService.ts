import api from '../lib/api';

export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

export interface AuthResponse {
    user: {
        id: number;
        name: string;
        email: string;
    };
    token: string;
}

export const authService = {
    // Iniciar sesión
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post('/login', credentials);
        const { token, user } = response.data;
        
        // Guardar token en localStorage
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return response.data;
    },

    // Cerrar sesión
    async logout(): Promise<void> {
        try {
            await api.post('/logout');
        } catch (error) {
            // Si hay error, continuar con el logout local
            console.warn('Error en logout del servidor:', error);
        } finally {
            // Limpiar datos locales
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
        }
    },

    // Obtener usuario actual
    getCurrentUser(): any {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Verificar si está autenticado
    isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token');
    },

    // Obtener token
    getToken(): string | null {
        return localStorage.getItem('auth_token');
    },

    // Verificar si el token está expirado (implementación básica)
    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;
        
        try {
            // Decodificar el token JWT (implementación básica)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch (error) {
            return true;
        }
    }
}; 