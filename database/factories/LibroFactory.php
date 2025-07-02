<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Libro>
 */
class LibroFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titulo' => fake()->sentence(3),
            'autor' => fake()->name(),
            'isbn' => fake()->unique()->isbn13(),
            'disponible' => fake()->boolean(80), // 80% de probabilidad de estar disponible
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the book is available.
     */
    public function disponible(): static
    {
        return $this->state(fn (array $attributes) => [
            'disponible' => true,
        ]);
    }

    /**
     * Indicate that the book is not available.
     */
    public function noDisponible(): static
    {
        return $this->state(fn (array $attributes) => [
            'disponible' => false,
        ]);
    }
} 