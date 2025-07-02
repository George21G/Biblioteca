<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Agregar deleted_at a instituciones
        Schema::table('instituciones', function (Blueprint $table) {
            $table->softDeletes();
        });

        // Agregar deleted_at a usuarios
        Schema::table('usuarios', function (Blueprint $table) {
            $table->softDeletes();
        });

        // Agregar deleted_at a libros
        Schema::table('libros', function (Blueprint $table) {
            $table->softDeletes();
        });

        // Agregar deleted_at a prestamos
        Schema::table('prestamos', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remover deleted_at de instituciones
        Schema::table('instituciones', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        // Remover deleted_at de usuarios
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        // Remover deleted_at de libros
        Schema::table('libros', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        // Remover deleted_at de prestamos
        Schema::table('prestamos', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
