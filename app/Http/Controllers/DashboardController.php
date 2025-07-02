<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Institucion;
use App\Models\Usuario;
use App\Models\Libro;
use App\Models\Prestamo;

class DashboardController extends Controller
{
    public function index()
    {
        // Obtener estadísticas
        $stats = [
            'instituciones' => [
                'total' => Institucion::count(),
                'escuelas' => Institucion::where('tipo', 'escuela')->count(),
                'universidades' => Institucion::where('tipo', 'universidad')->count(),
                'empresas' => Institucion::where('tipo', 'empresa')->count(),
            ],
            'usuarios' => [
                'total' => Usuario::count(),
                'natural' => Usuario::where('tipo', 'natural')->count(),
                'estudiante' => Usuario::where('tipo', 'estudiante')->count(),
                'empresa' => Usuario::where('tipo', 'empresa')->count(),
            ],
            'libros' => [
                'total' => Libro::count(),
                'disponibles' => Libro::where('disponible', true)->count(),
                'prestados' => Libro::where('disponible', false)->count(),
            ],
            'prestamos' => [
                'total' => Prestamo::count(),
                'activos' => Prestamo::where('devuelto', false)->count(),
                'devueltos' => Prestamo::where('devuelto', true)->count(),
                'vencidos' => Prestamo::where('devuelto', false)
                    ->where('fecha_devolucion', '<', now())
                    ->count(),
            ],
        ];

        // Obtener actividad reciente
        $recentActivity = [
            'prestamos' => Prestamo::with(['libro', 'usuario.institucion'])
                ->latest()
                ->take(5)
                ->get(),
            'libros' => Libro::latest()->take(5)->get(),
            'usuarios' => Usuario::with('institucion')->latest()->take(5)->get(),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
        ]);
    }
} 