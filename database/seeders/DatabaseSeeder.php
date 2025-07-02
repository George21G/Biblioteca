<?php

namespace Database\Seeders;

use App\Models\Libro;
use App\Models\User;
use App\Models\Institucion;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Borra todos los libros antes de insertar
        Libro::truncate();

        // Libros de prueba
        Libro::create([
            'titulo' => 'Cien años de soledad',
            'autor' => 'Gabriel García Márquez',
            'isbn' => '978-0307474728',
            'disponible' => true,
        ]);

        Libro::create([
            'titulo' => 'El Quijote',
            'autor' => 'Miguel de Cervantes',
            'isbn' => '978-84-376-0494-7',
            'disponible' => true,
        ]);

        Libro::create([
            'titulo' => 'Don Juan Tenorio',
            'autor' => 'José Zorrilla',
            'isbn' => '978-84-376-0495-4',
            'disponible' => false,
        ]);

        Libro::create([
            'titulo' => 'La Celestina',
            'autor' => 'Fernando de Rojas',
            'isbn' => '978-84-376-0496-1',
            'disponible' => true,
        ]);

        Libro::create([
            'titulo' => 'El Lazarillo de Tormes',
            'autor' => 'Anónimo',
            'isbn' => '978-84-376-0497-8',
            'disponible' => true,
        ]);

        // Libros de prueba adicionales
        Libro::create([
            'titulo' => 'Crimen y castigo',
            'autor' => 'Fiódor Dostoyevski',
            'isbn' => '978-84-376-0499-2',
            'disponible' => false,
        ]);
        Libro::create([
            'titulo' => 'Orgullo y prejuicio',
            'autor' => 'Jane Austen',
            'isbn' => '978-84-376-0500-5',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'La Odisea',
            'autor' => 'Homero',
            'isbn' => '978-84-376-0501-2',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Hamlet',
            'autor' => 'William Shakespeare',
            'isbn' => '978-84-376-0502-9',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => '1984',
            'autor' => 'George Orwell',
            'isbn' => '978-84-376-0503-6',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Matar a un ruiseñor',
            'autor' => 'Harper Lee',
            'isbn' => '978-84-376-0504-3',
            'disponible' => false,
        ]);
        Libro::create([
            'titulo' => 'La metamorfosis',
            'autor' => 'Franz Kafka',
            'isbn' => '978-84-376-0505-0',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'El extranjero',
            'autor' => 'Albert Camus',
            'isbn' => '978-84-376-0506-7',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Rayuela',
            'autor' => 'Julio Cortázar',
            'isbn' => '978-84-376-0507-4',
            'disponible' => false,
        ]);
        Libro::create([
            'titulo' => 'Pedro Páramo',
            'autor' => 'Juan Rulfo',
            'isbn' => '978-84-376-0508-1',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Fahrenheit 451',
            'autor' => 'Ray Bradbury',
            'isbn' => '978-84-376-0509-8',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'El principito',
            'autor' => 'Antoine de Saint-Exupéry',
            'isbn' => '978-84-376-0510-4',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Anna Karenina',
            'autor' => 'León Tolstói',
            'isbn' => '978-84-376-0511-1',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'La divina comedia',
            'autor' => 'Dante Alighieri',
            'isbn' => '978-84-376-0512-8',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Drácula',
            'autor' => 'Bram Stoker',
            'isbn' => '978-84-376-0513-5',
            'disponible' => false,
        ]);
        Libro::create([
            'titulo' => 'Frankenstein',
            'autor' => 'Mary Shelley',
            'isbn' => '978-84-376-0514-2',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Tom Sawyer',
            'autor' => 'Mark Twain',
            'isbn' => '978-84-376-0515-9',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Dorian Gray',
            'autor' => 'Oscar Wilde',
            'isbn' => '978-84-376-0516-6',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Madame Bovary',
            'autor' => 'Gustave Flaubert',
            'isbn' => '978-84-376-0517-3',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Tiempo perdido',
            'autor' => 'Marcel Proust',
            'isbn' => '978-84-376-0518-0',
            'disponible' => false,
        ]);
        Libro::create([
            'titulo' => 'La tregua',
            'autor' => 'Mario Benedetti',
            'isbn' => '978-84-376-0519-7',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Sobre héroes y tumbas',
            'autor' => 'Ernesto Sabato',
            'isbn' => '978-84-376-0520-3',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Sombra del viento',
            'autor' => 'Carlos Ruiz Zafón',
            'isbn' => '978-84-376-0521-0',
            'disponible' => false,
        ]);
        Libro::create([
            'titulo' => 'Ensayo sobre la ceguera',
            'autor' => 'José Saramago',
            'isbn' => '978-84-376-0522-7',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Amor en los tiempos del cólera',
            'autor' => 'Gabriel García Márquez',
            'isbn' => '978-84-376-0523-4',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Colmillo Blanco',
            'autor' => 'Jack London',
            'isbn' => '978-84-376-0524-1',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Rebelión en la granja',
            'autor' => 'George Orwell',
            'isbn' => '978-84-376-0525-8',
            'disponible' => false,
        ]);
        Libro::create([
            'titulo' => 'El viejo y el mar',
            'autor' => 'Ernest Hemingway',
            'isbn' => '978-84-376-0526-5',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Siddhartha',
            'autor' => 'Hermann Hesse',
            'isbn' => '978-84-376-0527-2',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Demian',
            'autor' => 'Hermann Hesse',
            'isbn' => '978-84-376-0528-9',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Trópico de Cáncer',
            'autor' => 'Henry Miller',
            'isbn' => '978-84-376-0529-6',
            'disponible' => false,
        ]);
        Libro::create([
            'titulo' => 'El perfume',
            'autor' => 'Patrick Süskind',
            'isbn' => '978-84-376-0530-2',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Viaje al centro de la Tierra',
            'autor' => 'Julio Verne',
            'isbn' => '978-84-376-0531-9',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => '20.000 leguas de viaje submarino',
            'autor' => 'Julio Verne',
            'isbn' => '978-84-376-0532-6',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Gulliver',
            'autor' => 'Jonathan Swift',
            'isbn' => '978-84-376-0533-3',
            'disponible' => false,
        ]);
        Libro::create([
            'titulo' => 'Donde viven los monstruos',
            'autor' => 'Maurice Sendak',
            'isbn' => '978-84-376-0534-0',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'La isla del tesoro',
            'autor' => 'Robert L. Stevenson',
            'isbn' => '978-84-376-0535-7',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Corazón',
            'autor' => 'Edmondo De Amicis',
            'isbn' => '978-84-376-0536-4',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'El Aleph',
            'autor' => 'Jorge Luis Borges',
            'isbn' => '978-84-376-0537-1',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'Ficciones',
            'autor' => 'Jorge Luis Borges',
            'isbn' => '978-84-376-0538-8',
            'disponible' => false,
        ]);
        Libro::create([
            'titulo' => 'El túnel',
            'autor' => 'Ernesto Sabato',
            'isbn' => '978-84-376-0539-5',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'La casa de los espíritus',
            'autor' => 'Isabel Allende',
            'isbn' => '978-84-376-0540-1',
            'disponible' => true,
        ]);
        Libro::create([
            'titulo' => 'La muerte de Artemio Cruz',
            'autor' => 'Carlos Fuentes',
            'isbn' => '978-84-376-0541-8',
            'disponible' => true,
        ]);

        // Borra todos los usuarios antes de insertar
        User::truncate();

        // Usuario de prueba
        User::create([
            'name' => 'Yodyi Robles',
            'email' => 'yodyirobles@gmail.com',
            'password' => 'password', // Se hasheará automáticamente por el cast
        ]);

        // Borra todas las instituciones antes de insertar
        Institucion::truncate();

        // Instituciones de prueba - Empresas
        Institucion::create([
            'nombre' => 'Microsoft',
            'tipo' => 'empresa',
        ]);
        Institucion::create([
            'nombre' => 'Millonarios FC',
            'tipo' => 'empresa',
        ]);
        Institucion::create([
            'nombre' => 'Holding VML',
            'tipo' => 'empresa',
        ]);
        Institucion::create([
            'nombre' => 'CAD Zona 4',
            'tipo' => 'empresa',
        ]);

        // Instituciones de prueba - Universidades
        Institucion::create([
            'nombre' => 'Universidad Iberoamericana de Colombia',
            'tipo' => 'universidad',
        ]);
        Institucion::create([
            'nombre' => 'Universidad de La Salle',
            'tipo' => 'universidad',
        ]);
        Institucion::create([
            'nombre' => 'Universidad Nacional',
            'tipo' => 'universidad',
        ]);
        Institucion::create([
            'nombre' => 'Universidad Agraria de Colombia',
            'tipo' => 'universidad',
        ]);

        // Instituciones de prueba - Colegios
        Institucion::create([
            'nombre' => 'Colegio Enrique Olaya Herrera',
            'tipo' => 'colegio',
        ]);
        Institucion::create([
            'nombre' => 'Colegio Manuelita Sáenz',
            'tipo' => 'colegio',
        ]);
        Institucion::create([
            'nombre' => 'Colegio Gustavo Restrepo',
            'tipo' => 'colegio',
        ]);
        Institucion::create([
            'nombre' => 'Colegio El Libertador',
            'tipo' => 'colegio',
        ]);
    }
}
