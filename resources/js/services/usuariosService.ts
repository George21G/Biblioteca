import api from '../lib/api';
import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest, PaginatedResponse } from '../types/api';

export const usuariosService = {
    // Obtener todos los usuarios con paginación
    async getAll(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Usuario>> {
        const response = await api.get(`/usuarios?page=${page}&per_page=${perPage}`);
        return response.data;
    },

    // Obtener un usuario por ID
    async getById(id: number): Promise<Usuario> {
        const response = await api.get(`/usuarios/${id}`);
        return response.data;
    },

    // Crear un nuevo usuario
    async create(usuario: CreateUsuarioRequest): Promise<Usuario> {
        const response = await api.post('/api/usuarios', usuario);
        return response.data;
    },

    // Actualizar un usuario
    async update(id: number, usuario: UpdateUsuarioRequest): Promise<Usuario> {
        const response = await api.put(`/usuarios/${id}`, usuario);
        return response.data;
    },

    // Eliminar un usuario
    async delete(id: number): Promise<void> {
        await api.delete(`/usuarios/${id}`);
    },

    // Buscar usuarios por nombre o email
    async search(query: string, page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Usuario>> {
        const response = await api.get(`/usuarios?search=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`);
        return response.data;
    },

    // Obtener usuarios por institución
    async getByInstitucion(institucionId: number, page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Usuario>> {
        const response = await api.get(`/usuarios?institucion_id=${institucionId}&page=${page}&per_page=${perPage}`);
        return response.data;
    }
}; 