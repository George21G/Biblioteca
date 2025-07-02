<?php

namespace Database\Factories;

use App\Models\Libro;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prestamo>
 */
class PrestamoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fechaPrestamo = fake()->dateTimeBetween('-6 months', 'now');
        $fechaDevolucion = fake()->dateTimeBetween($fechaPrestamo, '+3 months');
        
        return [
            'libro_id' => Libro::factory(),
            'usuario_id' => Usuario::factory(),
            'fecha_prestamo' => $fechaPrestamo,
            'fecha_devolucion' => $fechaDevolucion,
            'costo' => fake()->numberBetween(1000, 50000), // Entre $1,000 y $50,000
            'created_at' => $fechaPrestamo,
            'updated_at' => fake()->dateTimeBetween($fechaPrestamo, 'now'),
        ];
    }

    /**
     * Indicate that the loan is active (not returned).
     */
    public function activo(): static
    {
        return $this->state(fn (array $attributes) => [
            'fecha_devolucion' => fake()->dateTimeBetween('now', '+1 month'),
        ]);
    }

    /**
     * Indicate that the loan is completed (returned).
     */
    public function completado(): static
    {
        $fechaPrestamo = fake()->dateTimeBetween('-3 months', '-1 month');
        $fechaDevolucion = fake()->dateTimeBetween($fechaPrestamo, 'now');
        
        return $this->state(fn (array $attributes) => [
            'fecha_prestamo' => $fechaPrestamo,
            'fecha_devolucion' => $fechaDevolucion,
        ]);
    }

    /**
     * Indicate that the loan is overdue.
     */
    public function vencido(): static
    {
        $fechaPrestamo = fake()->dateTimeBetween('-2 months', '-1 month');
        $fechaDevolucion = fake()->dateTimeBetween('-1 month', 'now');
        
        return $this->state(fn (array $attributes) => [
            'fecha_prestamo' => $fechaPrestamo,
            'fecha_devolucion' => $fechaDevolucion,
        ]);
    }
} 