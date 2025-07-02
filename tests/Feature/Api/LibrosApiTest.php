<?php

namespace Tests\Feature\Api;

use App\Models\Libro;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LibrosApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /** @test */
    public function it_can_list_libros()
    {
        $libros = Libro::factory()->count(5)->create();

        $response = $this->actingAs($this->user)
            ->getJson('/api/libros');

        $response->assertStatus(200)
            ->assertJsonCount(5, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'titulo',
                        'autor',
                        'isbn',
                        'disponible',
                        'created_at',
                        'updated_at',
                    ]
                ],
                'current_page',
                'per_page',
                'total',
            ]);
    }

    /** @test */
    public function it_can_show_a_libro()
    {
        $libro = Libro::factory()->create();

        $response = $this->actingAs($this->user)
            ->getJson("/api/libros/{$libro->id}");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $libro->id,
                    'titulo' => $libro->titulo,
                    'autor' => $libro->autor,
                    'isbn' => $libro->isbn,
                    'disponible' => $libro->disponible,
                ]
            ]);
    }

    /** @test */
    public function it_can_create_a_libro()
    {
        $libroData = [
            'titulo' => 'Nuevo Libro',
            'autor' => 'Nuevo Autor',
            'isbn' => '978-84-376-0494-7',
            'disponible' => true,
        ];

        $response = $this->actingAs($this->user)
            ->postJson('/api/libros', $libroData);

        $response->assertStatus(201)
            ->assertJson([
                'data' => [
                    'titulo' => 'Nuevo Libro',
                    'autor' => 'Nuevo Autor',
                    'isbn' => '978-84-376-0494-7',
                    'disponible' => true,
                ]
            ]);

        $this->assertDatabaseHas('libros', $libroData);
    }

    /** @test */
    public function it_validates_required_fields_when_creating()
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/libros', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['titulo', 'autor', 'isbn']);
    }

    /** @test */
    public function it_can_update_a_libro()
    {
        $libro = Libro::factory()->create();
        $updateData = [
            'titulo' => 'Título Actualizado',
            'disponible' => false,
        ];

        $response = $this->actingAs($this->user)
            ->putJson("/api/libros/{$libro->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $libro->id,
                    'titulo' => 'Título Actualizado',
                    'disponible' => false,
                ]
            ]);

        $this->assertDatabaseHas('libros', [
            'id' => $libro->id,
            'titulo' => 'Título Actualizado',
            'disponible' => false,
        ]);
    }

    /** @test */
    public function it_can_delete_a_libro()
    {
        $libro = Libro::factory()->create();

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/libros/{$libro->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('libros', [
            'id' => $libro->id,
        ]);
    }

    /** @test */
    public function it_returns_404_for_nonexistent_libro()
    {
        $response = $this->actingAs($this->user)
            ->getJson('/api/libros/999');

        $response->assertStatus(404);
    }

    /** @test */
    public function it_requires_authentication()
    {
        $response = $this->getJson('/api/libros');

        $response->assertStatus(401);
    }
} 