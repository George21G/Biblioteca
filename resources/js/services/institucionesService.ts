import api from '../lib/api';
import { Institucion, CreateInstitucionRequest, UpdateInstitucionRequest, PaginatedResponse } from '../types/api';

export const institucionesService = {
    // Obtener todas las instituciones con paginación
    async getAll(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Institucion>> {
        const response = await api.get(`/instituciones?page=${page}&per_page=${perPage}`);
        return response.data;
    },

    // Obtener una institución por ID
    async getById(id: number): Promise<Institucion> {
        const response = await api.get(`/instituciones/${id}`);
        return response.data;
    },

    // Crear una nueva institución
    async create(institucion: CreateInstitucionRequest): Promise<Institucion> {
        const response = await api.post('/instituciones', institucion);
        return response.data;
    },

    // Actualizar una institución
    async update(id: number, institucion: UpdateInstitucionRequest): Promise<Institucion> {
        const response = await api.put(`/instituciones/${id}`, institucion);
        return response.data;
    },

    // Eliminar una institución
    async delete(id: number): Promise<void> {
        await api.delete(`/instituciones/${id}`);
    },

    // Buscar instituciones por nombre
    async search(query: string, page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Institucion>> {
        const response = await api.get(`/instituciones?search=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`);
        return response.data;
    },

    // Obtener todas las instituciones (sin paginación para selects)
    async getAllSimple(): Promise<Institucion[]> {
        const response = await api.get('/instituciones');
        return response.data;
    }
}; 