<?php

namespace App\Http\Controllers;

use App\Models\Prestamo;
use App\Models\Libro;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class PrestamoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $prestamos = Prestamo::with(['libro', 'usuario.institucion'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Prestamos/Index', [
            'prestamos' => $prestamos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $libros = Libro::where('disponible', true)->orderBy('titulo')->get(['id', 'titulo', 'autor']);
        $usuarios = Usuario::orderBy('nombre')->get(['id', 'nombre', 'documento']);
        
        return Inertia::render('Prestamos/Create', [
            'libros' => $libros,
            'usuarios' => $usuarios
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'libro_id' => 'required|exists:libros,id',
            'usuario_id' => 'required|exists:usuarios,id',
            'fecha_prestamo' => 'required|date',
            'fecha_devolucion' => 'required|date|after:fecha_prestamo',
            'costo' => 'required|numeric|min:0',
        ]);

        // Verificar que el libro esté disponible
        $libro = Libro::find($request->libro_id);
        if (!$libro->disponible) {
            return response()->json([
                'message' => 'El libro no está disponible para préstamo'
            ], 422);
        }

        // Validar costo según si el usuario tiene institución
        $usuario = Usuario::with('institucion')->find($request->usuario_id);
        if ($usuario->institucion) {
            $costo = 0;
        } else {
            $costo = $request->costo;
            if ($costo <= 0) {
                return response()->json([
                    'message' => 'El costo debe ser mayor a 0 para usuarios sin institución'
                ], 422);
            }
        }

        // Crear el préstamo
        $prestamo = Prestamo::create([
            'libro_id' => $request->libro_id,
            'usuario_id' => $request->usuario_id,
            'fecha_prestamo' => $request->fecha_prestamo,
            'fecha_devolucion' => $request->fecha_devolucion,
            'costo' => $costo,
        ]);

        // Marcar el libro como no disponible
        $libro->update(['disponible' => false]);

        return response()->json([
            'message' => 'Préstamo creado exitosamente',
            'prestamo' => $prestamo
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Prestamo $prestamo): Response
    {
        $prestamo->load(['libro', 'usuario.institucion']);
        return Inertia::render('Prestamos/Show', [
            'prestamo' => $prestamo
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prestamo $prestamo): Response
    {
        $libros = Libro::orderBy('titulo')->get(['id', 'titulo', 'autor']);
        $usuarios = Usuario::orderBy('nombre')->get(['id', 'nombre', 'documento']);
        
        return Inertia::render('Prestamos/Edit', [
            'prestamo' => $prestamo,
            'libros' => $libros,
            'usuarios' => $usuarios
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Prestamo $prestamo): JsonResponse
    {
        $request->validate([
            'libro_id' => 'required|exists:libros,id',
            'usuario_id' => 'required|exists:usuarios,id',
            'fecha_prestamo' => 'required|date',
            'fecha_devolucion' => 'required|date|after:fecha_prestamo',
            'costo' => 'required|numeric|min:0',
            'devuelto' => 'boolean',
        ]);

        $prestamo->update($request->only([
            'libro_id', 'usuario_id', 'fecha_prestamo', 'fecha_devolucion', 'costo', 'devuelto'
        ]));

        // Si se marca como devuelto, marcar el libro como disponible
        if ($request->devuelto) {
            $libro = Libro::find($request->libro_id);
            $libro->update(['disponible' => true]);
        }

        return response()->json([
            'message' => 'Préstamo actualizado exitosamente',
            'prestamo' => $prestamo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prestamo $prestamo): JsonResponse
    {
        // Marcar el libro como disponible si no está devuelto
        if (!$prestamo->devuelto) {
            $prestamo->libro->update(['disponible' => true]);
        }

        $prestamo->delete();

        return response()->json([
            'message' => 'Préstamo eliminado exitosamente'
        ]);
    }

    /**
     * Marcar préstamo como devuelto
     */
    public function devolver(Prestamo $prestamo): JsonResponse
    {
        if ($prestamo->devuelto) {
            return response()->json([
                'message' => 'El préstamo ya está marcado como devuelto'
            ], 422);
        }

        $prestamo->update([
            'devuelto' => true,
            'fecha_devolucion' => now()
        ]);

        // Marcar el libro como disponible
        $prestamo->libro->update(['disponible' => true]);

        return response()->json([
            'message' => 'Préstamo marcado como devuelto exitosamente',
            'prestamo' => $prestamo
        ]);
    }

    /**
     * API endpoint para obtener todos los préstamos (para selects)
     */
    public function apiIndex(): JsonResponse
    {
        $prestamos = Prestamo::with(['libro', 'usuario'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($prestamos);
    }
}
