// Tipos base para las entidades
export interface Libro {
    id: number;
    titulo: string;
    autor: string;
    isbn: string;
    anio_publicacion: number;
    editorial: string;
    cantidad_disponible: number;
    cantidad_total: number;
    created_at: string;
    updated_at: string;
}

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    telefono?: string;
    direccion?: string;
    institucion_id: number;
    created_at: string;
    updated_at: string;
}

export interface Institucion {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Prestamo {
    id: number;
    libro_id: number;
    usuario_id: number;
    fecha_prestamo: string;
    fecha_devolucion_esperada: string;
    fecha_devolucion_real?: string;
    estado: 'activo' | 'devuelto' | 'vencido';
    created_at: string;
    updated_at: string;
    // Relaciones
    libro?: Libro;
    usuario?: Usuario;
}

// Tipos para crear/actualizar entidades
export interface CreateLibroRequest {
    titulo: string;
    autor: string;
    isbn: string;
    anio_publicacion: number;
    editorial: string;
    cantidad_total: number;
}

export interface UpdateLibroRequest extends Partial<CreateLibroRequest> {}

export interface CreateUsuarioRequest {
    nombre: string;
    email: string;
    telefono?: string;
    direccion?: string;
    institucion_id: number;
}

export interface UpdateUsuarioRequest extends Partial<CreateUsuarioRequest> {}

export interface CreateInstitucionRequest {
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
}

export interface UpdateInstitucionRequest extends Partial<CreateInstitucionRequest> {}

export interface CreatePrestamoRequest {
    libro_id: number;
    usuario_id: number;
    fecha_devolucion_esperada: string;
}

export interface UpdatePrestamoRequest extends Partial<CreatePrestamoRequest> {}

// Tipos para respuestas de la API
export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
} 