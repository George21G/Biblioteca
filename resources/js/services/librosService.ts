import api from '../lib/api';
import { Libro, CreateLibroRequest, UpdateLibroRequest, PaginatedResponse } from '../types/api';

export const librosService = {
    // Obtener todos los libros con paginación
    async getAll(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Libro>> {
        const response = await api.get(`/libros?page=${page}&per_page=${perPage}`);
        return response.data;
    },

    // Obtener un libro por ID
    async getById(id: number): Promise<Libro> {
        const response = await api.get(`/libros/${id}`);
        return response.data;
    },

    // Crear un nuevo libro
    async create(libro: CreateLibroRequest): Promise<Libro> {
        const response = await api.post('/libros', libro);
        return response.data;
    },

    // Actualizar un libro
    async update(id: number, libro: UpdateLibroRequest): Promise<Libro> {
        const response = await api.put(`/libros/${id}`, libro);
        return response.data;
    },

    // Eliminar un libro
    async delete(id: number): Promise<void> {
        await api.delete(`/libros/${id}`);
    },

    // Buscar libros por título o autor
    async search(query: string, page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Libro>> {
        const response = await api.get(`/libros?search=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`);
        return response.data;
    },

    // Obtener libros disponibles (con stock)
    async getDisponibles(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Libro>> {
        const response = await api.get(`/libros?disponible=1&page=${page}&per_page=${perPage}`);
        return response.data;
    }
}; 