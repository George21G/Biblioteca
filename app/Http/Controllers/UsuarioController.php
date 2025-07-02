<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Models\Institucion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Forzar JSON si la ruta es /api/usuarios
        if ($request->is('api/usuarios')) {
            $usuarios = Usuario::with('institucion')
                ->select('id', 'nombre', 'documento', 'tipo', 'institucion_id')
                ->orderBy('nombre')
                ->get();
            return response()->json($usuarios);
        }
        // Si no, devolver la vista de Inertia
        $usuarios = Usuario::with('institucion')
            ->orderBy('nombre')
            ->paginate(10);
        return Inertia::render('Usuarios/Index', [
            'usuarios' => $usuarios
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $instituciones = Institucion::orderBy('nombre')->get(['id', 'nombre']);
        return Inertia::render('Usuarios/Create', [
            'instituciones' => $instituciones
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'documento' => 'required|string|max:50|unique:usuarios,documento',
            'tipo' => 'required|in:natural,estudiante,empresa',
            'institucion_id' => 'required_if:tipo,estudiante,empresa|nullable|exists:instituciones,id',
        ]);

        $usuario = Usuario::create($request->only(['nombre', 'documento', 'tipo', 'institucion_id']));

        return response()->json([
            'message' => 'Usuario creado exitosamente',
            'usuario' => $usuario
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuario $usuario): Response
    {
        $usuario->load('institucion', 'prestamos');
        return Inertia::render('Usuarios/Show', [
            'usuario' => $usuario
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usuario $usuario): Response
    {
        $instituciones = Institucion::orderBy('nombre')->get(['id', 'nombre']);
        return Inertia::render('Usuarios/Edit', [
            'usuario' => $usuario,
            'instituciones' => $instituciones
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Usuario $usuario)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'documento' => 'required|string|max:50|unique:usuarios,documento,' . $usuario->id,
            'tipo' => 'required|in:natural,estudiante,empresa',
            'institucion_id' => 'required_if:tipo,estudiante,empresa|nullable|exists:instituciones,id',
        ]);

        $usuario->update($request->only(['nombre', 'documento', 'tipo', 'institucion_id']));

        // Si la petición espera Inertia, redirigir con mensaje flash
        if (!$request->wantsJson()) {
            return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado exitosamente');
        }

        // Si es API, devolver JSON
        return response()->json([
            'message' => 'Usuario actualizado exitosamente',
            'usuario' => $usuario
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Usuario $usuario)
    {
        // Verificar si tiene préstamos asociados
        if ($usuario->prestamos()->count() > 0) {
            return response()->json([
                'message' => 'No se puede eliminar el usuario porque tiene préstamos asociados'
            ], 422);
        }

        $usuario->delete();

        // Si la petición espera Inertia, redirigir con mensaje flash
        if (!$request->wantsJson()) {
            return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado exitosamente');
        }

        // Si es API, devolver JSON
        return response()->json([
            'message' => 'Usuario eliminado exitosamente'
        ]);
    }

    /**
     * API endpoint para obtener todos los usuarios (para selects)
     */
    public function apiIndex(): JsonResponse
    {
        $usuarios = Usuario::select('id', 'nombre', 'documento', 'tipo', 'institucion_id')
            ->orderBy('nombre')
            ->get();

        return response()->json($usuarios);
    }
}
