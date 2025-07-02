<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Institucion>
 */
class InstitucionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->company(),
            'tipo' => fake()->randomElement(['empresa', 'universidad', 'colegio']),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the institution is a company.
     */
    public function empresa(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'empresa',
        ]);
    }

    /**
     * Indicate that the institution is a university.
     */
    public function universidad(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'universidad',
        ]);
    }

    /**
     * Indicate that the institution is a school.
     */
    public function colegio(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'colegio',
        ]);
    }
} 