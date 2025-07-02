<?php

namespace Tests\Unit\Models;

use App\Models\Libro;
use App\Models\Prestamo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LibroTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_libro()
    {
        $libro = Libro::factory()->create([
            'titulo' => 'El Quijote',
            'autor' => 'Miguel de Cervantes',
            'isbn' => '978-84-376-0494-7',
            'disponible' => true,
        ]);

        $this->assertDatabaseHas('libros', [
            'id' => $libro->id,
            'titulo' => 'El Quijote',
            'autor' => 'Miguel de Cervantes',
            'isbn' => '978-84-376-0494-7',
            'disponible' => true,
        ]);
    }

    /** @test */
    public function it_can_update_a_libro()
    {
        $libro = Libro::factory()->create();
        
        $libro->update([
            'titulo' => 'Nuevo Título',
            'disponible' => false,
        ]);

        $this->assertDatabaseHas('libros', [
            'id' => $libro->id,
            'titulo' => 'Nuevo Título',
            'disponible' => false,
        ]);
    }

    /** @test */
    public function it_can_delete_a_libro()
    {
        $libro = Libro::factory()->create();
        
        $libro->delete();

        $this->assertDatabaseMissing('libros', [
            'id' => $libro->id,
        ]);
    }

    /** @test */
    public function it_has_many_prestamos()
    {
        $libro = Libro::factory()->create();
        $prestamos = Prestamo::factory()->count(3)->create([
            'libro_id' => $libro->id,
        ]);

        $this->assertCount(3, $libro->prestamos);
        $this->assertTrue($libro->prestamos->contains($prestamos->first()));
    }

    /** @test */
    public function it_can_scope_available_books()
    {
        Libro::factory()->disponible()->count(3)->create();
        Libro::factory()->noDisponible()->count(2)->create();

        $disponibles = Libro::where('disponible', true)->get();

        $this->assertCount(3, $disponibles);
        $this->assertTrue($disponibles->every(fn($libro) => $libro->disponible));
    }

    /** @test */
    public function it_validates_required_fields()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);
        
        Libro::create([]);
    }

    /** @test */
    public function it_has_unique_isbn()
    {
        $isbn = '978-84-376-0494-7';
        
        Libro::factory()->create(['isbn' => $isbn]);
        
        $this->expectException(\Illuminate\Database\QueryException::class);
        
        Libro::factory()->create(['isbn' => $isbn]);
    }
} 