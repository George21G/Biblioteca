Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('libros', LibroController::class);
    Route::apiResource('prestamos', PrestamoController::class);
    Route::apiResource('usuarios', UsuarioController::class);
    Route::apiResource('instituciones', InstitucionController::class);
});