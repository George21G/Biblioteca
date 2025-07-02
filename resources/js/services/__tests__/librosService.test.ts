import { librosService } from '../librosService';

// Mock del módulo api
jest.mock('@/lib/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('librosService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch all books with pagination', async () => {
      const mockResponse = {
        data: {
          data: [
            { id: 1, titulo: 'Libro 1', autor: 'Autor 1' },
            { id: 2, titulo: 'Libro 2', autor: 'Autor 2' },
          ],
          current_page: 1,
          per_page: 10,
          total: 2,
        },
      };

      const { api } = require('@/lib/api');
      api.get.mockResolvedValue(mockResponse);

      const result = await librosService.getAll();

      expect(api.get).toHaveBeenCalledWith('/libros');
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle API errors', async () => {
      const { api } = require('@/lib/api');
      api.get.mockRejectedValue(new Error('API Error'));

      await expect(librosService.getAll()).rejects.toThrow('API Error');
    });
  });

  describe('getById', () => {
    it('should fetch a book by id', async () => {
      const mockBook = { id: 1, titulo: 'Libro 1', autor: 'Autor 1' };
      const mockResponse = { data: mockBook };

      const { api } = require('@/lib/api');
      api.get.mockResolvedValue(mockResponse);

      const result = await librosService.getById(1);

      expect(api.get).toHaveBeenCalledWith('/libros/1');
      expect(result).toEqual(mockBook);
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const bookData = { titulo: 'Nuevo Libro', autor: 'Nuevo Autor', isbn: '1234567890' };
      const mockResponse = { data: { id: 1, ...bookData } };

      const { api } = require('@/lib/api');
      api.post.mockResolvedValue(mockResponse);

      const result = await librosService.create(bookData);

      expect(api.post).toHaveBeenCalledWith('/libros', bookData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('update', () => {
    it('should update an existing book', async () => {
      const bookData = { titulo: 'Libro Actualizado' };
      const mockResponse = { data: { id: 1, ...bookData } };

      const { api } = require('@/lib/api');
      api.put.mockResolvedValue(mockResponse);

      const result = await librosService.update(1, bookData);

      expect(api.put).toHaveBeenCalledWith('/libros/1', bookData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      const { api } = require('@/lib/api');
      api.delete.mockResolvedValue({});

      await librosService.delete(1);

      expect(api.delete).toHaveBeenCalledWith('/libros/1');
    });
  });
}); 