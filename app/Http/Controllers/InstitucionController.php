<?php

namespace App\Http\Controllers;

use App\Models\Institucion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class InstitucionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $instituciones = Institucion::withCount('usuarios')
            ->orderBy('nombre')
            ->paginate(10);

        // Obtener contadores por tipo
        $contadores = [
            'total' => Institucion::count(),
            'empresas' => Institucion::where('tipo', 'empresa')->count(),
            'universidades' => Institucion::where('tipo', 'universidad')->count(),
            'colegios' => Institucion::where('tipo', 'colegio')->count(),
        ];

        return Inertia::render('Instituciones/Index', [
            'instituciones' => $instituciones,
            'contadores' => $contadores,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Instituciones/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|in:escuela,universidad,empresa,colegio',
        ]);

        Institucion::create($request->only(['nombre', 'tipo']));

        return redirect()->route('instituciones.index')
            ->with('success', 'Institución creada exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Institucion $institucion): Response
    {
        $institucion->load(['usuarios' => function($query) {
            $query->withCount('prestamos');
        }]);

        return Inertia::render('Instituciones/Show', [
            'institucion' => $institucion
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Institucion $institucion): Response
    {
        return Inertia::render('Instituciones/Edit', [
            'institucion' => $institucion
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Institucion $institucion)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|in:escuela,universidad,empresa,colegio',
        ]);

        $institucion->update($request->only(['nombre', 'tipo']));

        return redirect()->route('instituciones.index')
            ->with('success', 'Institución actualizada exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Institucion $institucion)
    {
        // Verificar si tiene usuarios asociados
        if ($institucion->usuarios()->count() > 0) {
            return redirect()->route('instituciones.index')
                ->with('error', 'No se puede eliminar la institución porque tiene usuarios asociados');
        }

        try {
            $institucion->delete();
            
            return redirect()->route('instituciones.index')
                ->with('success', 'Institución eliminada exitosamente');
        } catch (\Exception $e) {
            return redirect()->route('instituciones.index')
                ->with('error', 'Error al eliminar la institución: ' . $e->getMessage());
        }
    }

    /**
     * Eliminar institución usando POST (método alternativo)
     */
    public function eliminar(Institucion $institucion)
    {
        // Verificar si tiene usuarios asociados
        if ($institucion->usuarios()->count() > 0) {
            return redirect()->route('instituciones.index')
                ->with('error', 'No se puede eliminar la institución porque tiene usuarios asociados');
        }

        try {
            $institucion->delete();
            
            return redirect()->route('instituciones.index')
                ->with('success', 'Institución eliminada exitosamente');
        } catch (\Exception $e) {
            return redirect()->route('instituciones.index')
                ->with('error', 'Error al eliminar la institución: ' . $e->getMessage());
        }
    }

    /**
     * Actualizar institución usando POST (método alternativo)
     */
    public function actualizar(Request $request, Institucion $institucion)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|in:empresa,universidad,colegio',
        ]);

        try {
            $institucion->update($request->only(['nombre', 'tipo']));
            
            return redirect()->route('instituciones.index')
                ->with('success', 'Institución actualizada exitosamente');
        } catch (\Exception $e) {
            return redirect()->route('instituciones.index')
                ->with('error', 'Error al actualizar la institución: ' . $e->getMessage());
        }
    }

    /**
     * API endpoint para obtener todas las instituciones (para selects)
     */
    public function apiIndex(): JsonResponse
    {
        $instituciones = Institucion::select('id', 'nombre', 'tipo')
            ->orderBy('nombre')
            ->get();

        return response()->json($instituciones);
    }
}
