Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('libros', LibroController::class);
    Route::apiResource('prestamos', PrestamoController::class);
    Route::apiResource('usuarios', UsuarioController::class);
    Route::apiResource('instituciones', InstitucionController::class);
});

// Endpoints públicos para selects en el frontend (devuelven JSON)
Route::get('api/libros-todos', [App\Http\Controllers\LibroController::class, 'apiIndex']);
Route::get('api/usuarios-todos', [App\Http\Controllers\UsuarioController::class, 'apiIndex']);
Route::get('api/instituciones-simple', [App\Http\Controllers\InstitucionController::class, 'apiIndex']);