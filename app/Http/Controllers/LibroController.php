<?php

namespace App\Http\Controllers;

use App\Models\Libro;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class LibroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Forzar JSON si la ruta es /api/libros
        if ($request->is('api/libros')) {
            $libros = Libro::select('id', 'titulo', 'autor', 'isbn', 'disponible')
                ->orderBy('titulo')
                ->get();
            return response()->json($libros);
        }
        // Si no, devolver la vista de Inertia
        $libros = Libro::orderBy('titulo')->paginate(10);
        return Inertia::render('Libros/Index', [
            'libros' => $libros
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Libros/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'isbn' => 'required|string|max:50|unique:libros,isbn',
            'disponible' => 'boolean',
        ]);

        $libro = Libro::create($request->only(['titulo', 'autor', 'isbn', 'disponible']));

        return response()->json([
            'message' => 'Libro creado exitosamente',
            'libro' => $libro
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Libro $libro): Response
    {
        $libro->load('prestamos');
        return Inertia::render('Libros/Show', [
            'libro' => $libro
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Libro $libro): Response
    {
        return Inertia::render('Libros/Edit', [
            'libro' => $libro
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Libro $libro): JsonResponse
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'isbn' => 'required|string|max:50|unique:libros,isbn,' . $libro->id,
            'disponible' => 'boolean',
        ]);

        $libro->update($request->only(['titulo', 'autor', 'isbn', 'disponible']));

        return response()->json([
            'message' => 'Libro actualizado exitosamente',
            'libro' => $libro
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Libro $libro): JsonResponse
    {
        // Verificar si tiene préstamos asociados
        if ($libro->prestamos()->count() > 0) {
            return response()->json([
                'message' => 'No se puede eliminar el libro porque tiene préstamos asociados'
            ], 422);
        }

        $libro->delete();

        return response()->json([
            'message' => 'Libro eliminado exitosamente'
        ]);
    }

    /**
     * API endpoint para obtener todos los libros (para selects)
     */
    public function apiIndex(): JsonResponse
    {
        $libros = Libro::select('id', 'titulo', 'autor', 'isbn', 'disponible')
            ->orderBy('titulo')
            ->get();

        return response()->json($libros);
    }
}
