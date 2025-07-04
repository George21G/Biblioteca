<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InstitucionController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\LibroController;
use App\Http\Controllers\PrestamoController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Rutas para instituciones
    Route::resource('instituciones', InstitucionController::class)->parameters([
        'instituciones' => 'institucion'
    ]);
    Route::post('instituciones/{institucion}/eliminar', [InstitucionController::class, 'eliminar'])->name('instituciones.eliminar');
    Route::post('instituciones/{institucion}/actualizar', [InstitucionController::class, 'actualizar'])->name('instituciones.actualizar');
    Route::get('api/instituciones', [InstitucionController::class, 'apiIndex'])->name('instituciones.api');

    // Rutas para usuarios
    Route::resource('/usuarios', UsuarioController::class);
    Route::get('api/usuarios', [UsuarioController::class, 'apiIndex'])->name('usuarios.api');

    // Rutas para libros
    Route::resource('libros', LibroController::class);
    Route::get('api/libros', [LibroController::class, 'apiIndex'])->name('libros.api');

    // Rutas para préstamos
    Route::resource('prestamos', PrestamoController::class);
    Route::get('api/prestamos', [PrestamoController::class, 'apiIndex'])->name('prestamos.api');
    Route::post('prestamos/{prestamo}/devolver', [PrestamoController::class, 'devolver'])->name('prestamos.devolver');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
