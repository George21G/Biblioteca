import api from '../lib/api';
import { Prestamo, CreatePrestamoRequest, UpdatePrestamoRequest, PaginatedResponse } from '../types/api';

export const prestamosService = {
    // Obtener todos los préstamos con paginación
    async getAll(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Prestamo>> {
        const response = await api.get(`/prestamos?page=${page}&per_page=${perPage}`);
        return response.data;
    },

    // Obtener un préstamo por ID
    async getById(id: number): Promise<Prestamo> {
        const response = await api.get(`/prestamos/${id}`);
        return response.data;
    },

    // Crear un nuevo préstamo
    async create(prestamo: CreatePrestamoRequest): Promise<Prestamo> {
        const response = await api.post('/prestamos', prestamo);
        return response.data;
    },

    // Actualizar un préstamo
    async update(id: number, prestamo: UpdatePrestamoRequest): Promise<Prestamo> {
        const response = await api.put(`/prestamos/${id}`, prestamo);
        return response.data;
    },

    // Eliminar un préstamo
    async delete(id: number): Promise<void> {
        await api.delete(`/prestamos/${id}`);
    },

    // Marcar préstamo como devuelto
    async devolver(id: number): Promise<Prestamo> {
        const response = await api.patch(`/prestamos/${id}/devolver`);
        return response.data;
    },

    // Obtener préstamos por estado
    async getByEstado(estado: 'activo' | 'devuelto' | 'vencido', page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Prestamo>> {
        const response = await api.get(`/prestamos?estado=${estado}&page=${page}&per_page=${perPage}`);
        return response.data;
    },

    // Obtener préstamos por usuario
    async getByUsuario(usuarioId: number, page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Prestamo>> {
        const response = await api.get(`/prestamos?usuario_id=${usuarioId}&page=${page}&per_page=${perPage}`);
        return response.data;
    },

    // Obtener préstamos por libro
    async getByLibro(libroId: number, page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Prestamo>> {
        const response = await api.get(`/prestamos?libro_id=${libroId}&page=${page}&per_page=${perPage}`);
        return response.data;
    },

    // Obtener préstamos vencidos
    async getVencidos(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Prestamo>> {
        const response = await api.get(`/prestamos?vencidos=1&page=${page}&per_page=${perPage}`);
        return response.data;
    }
}; 