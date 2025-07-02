<?php

namespace Database\Factories;

use App\Models\Institucion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usuario>
 */
class UsuarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->name(),
            'documento' => fake()->unique()->numerify('##########'), // 10 dígitos
            'tipo' => fake()->randomElement(['natural', 'estudiante', 'empresa']),
            'institucion_id' => null, // Por defecto sin institución
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the user is a natural person.
     */
    public function natural(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'natural',
            'institucion_id' => null,
        ]);
    }

    /**
     * Indicate that the user is a student.
     */
    public function estudiante(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'estudiante',
        ]);
    }

    /**
     * Indicate that the user is a company.
     */
    public function empresa(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'empresa',
        ]);
    }

    /**
     * Associate the user with an institution.
     */
    public function conInstitucion(Institucion $institucion = null): static
    {
        return $this->state(fn (array $attributes) => [
            'institucion_id' => $institucion ? $institucion->id : Institucion::factory(),
        ]);
    }
} 