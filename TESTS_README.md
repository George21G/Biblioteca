# Guía de Pruebas Unitarias - Biblioteca

Esta guía explica cómo organizar y ejecutar las pruebas unitarias en tu aplicación Laravel + React.

## 📁 Estructura de Pruebas

### Backend (Laravel - PHPUnit)

```
tests/
├── Feature/                    # Pruebas de integración/feature
│   ├── Auth/                   # Pruebas de autenticación
│   ├── Api/                    # Pruebas de endpoints API
│   │   ├── LibrosApiTest.php
│   │   ├── UsuariosApiTest.php
│   │   ├── InstitucionesApiTest.php
│   │   └── PrestamosApiTest.php
│   ├── Web/                    # Pruebas de rutas web
│   └── Database/               # Pruebas de base de datos
├── Unit/                       # Pruebas unitarias puras
│   ├── Models/                 # Pruebas de modelos
│   │   ├── LibroTest.php
│   │   ├── UsuarioTest.php
│   │   ├── InstitucionTest.php
│   │   └── PrestamoTest.php
│   ├── Services/               # Pruebas de servicios
│   └── Helpers/                # Pruebas de helpers
└── Factories/                  # Factories para datos de prueba
    ├── LibroFactory.php
    ├── UsuarioFactory.php
    └── ...
```

### Frontend (React - Jest + Testing Library)

```
tests/
├── components/                 # Pruebas de componentes
│   ├── ui/                     # Componentes UI
│   ├── forms/                  # Formularios
│   └── layout/                 # Layouts
├── pages/                      # Pruebas de páginas
├── services/                   # Pruebas de servicios
├── hooks/                      # Pruebas de hooks personalizados
└── utils/                      # Pruebas de utilidades
```

## 🚀 Instalación y Configuración

### 1. Backend (Laravel)

Las dependencias ya están incluidas en Laravel. Solo necesitas:

```bash
# Ejecutar migraciones para las pruebas
php artisan migrate --env=testing

# Ejecutar las pruebas
php artisan test
```

### 2. Frontend (React)

Instalar las dependencias de testing:

```bash
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event jest jest-environment-jsdom @types/jest ts-jest
```

## 📝 Ejecutar Pruebas

### Backend

```bash
# Ejecutar todas las pruebas
php artisan test

# Ejecutar solo pruebas unitarias
php artisan test --testsuite=Unit

# Ejecutar solo pruebas de feature
php artisan test --testsuite=Feature

# Ejecutar pruebas específicas
php artisan test tests/Unit/Models/LibroTest.php

# Ejecutar con cobertura
php artisan test --coverage
```

### Frontend

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar en modo watch
npm run test:watch

# Ejecutar con cobertura
npm run test:coverage
```

## 🏭 Factories Creadas

### LibroFactory
```php
// Crear un libro básico
$libro = Libro::factory()->create();

// Crear un libro disponible
$libro = Libro::factory()->disponible()->create();

// Crear un libro no disponible
$libro = Libro::factory()->noDisponible()->create();
```

### InstitucionFactory
```php
// Crear una institución básica
$institucion = Institucion::factory()->create();

// Crear una empresa
$empresa = Institucion::factory()->empresa()->create();

// Crear una universidad
$universidad = Institucion::factory()->universidad()->create();

// Crear un colegio
$colegio = Institucion::factory()->colegio()->create();
```

### UsuarioFactory
```php
// Crear un usuario básico
$usuario = Usuario::factory()->create();

// Crear una persona natural
$natural = Usuario::factory()->natural()->create();

// Crear un estudiante
$estudiante = Usuario::factory()->estudiante()->create();

// Crear un usuario con institución
$usuario = Usuario::factory()->conInstitucion($institucion)->create();
```

### PrestamoFactory
```php
// Crear un préstamo básico
$prestamo = Prestamo::factory()->create();

// Crear un préstamo activo
$activo = Prestamo::factory()->activo()->create();

// Crear un préstamo completado
$completado = Prestamo::factory()->completado()->create();

// Crear un préstamo vencido
$vencido = Prestamo::factory()->vencido()->create();
```

## 📋 Ejemplos de Pruebas

### Backend - Prueba de Modelo

```php
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
```

### Backend - Prueba de API

```php
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
                ]
            ],
        ]);
}
```

### Frontend - Prueba de Servicio

```typescript
describe('librosService', () => {
  it('should fetch all books with pagination', async () => {
    const mockResponse = {
      data: {
        data: [
          { id: 1, titulo: 'Libro 1', autor: 'Autor 1' },
          { id: 2, titulo: 'Libro 2', autor: 'Autor 2' },
        ],
        current_page: 1,
        per_page: 10,
        total: 2,
      },
    };

    const { api } = require('@/lib/api');
    api.get.mockResolvedValue(mockResponse);

    const result = await librosService.getAll();

    expect(api.get).toHaveBeenCalledWith('/libros');
    expect(result).toEqual(mockResponse.data);
  });
});
```

## 🎯 Mejores Prácticas

### Backend
1. **Usa factories** para crear datos de prueba
2. **Usa `RefreshDatabase`** para limpiar la BD entre pruebas
3. **Prueba casos edge** (errores, validaciones, etc.)
4. **Usa `@test`** o métodos que empiecen con `test_`
5. **Agrupa pruebas relacionadas** en la misma clase

### Frontend
1. **Usa Testing Library** para pruebas centradas en el usuario
2. **Mockea dependencias externas** (API, localStorage, etc.)
3. **Prueba comportamiento, no implementación**
4. **Usa `screen.getByRole()`** cuando sea posible
5. **Agrupa pruebas relacionadas** en `describe`

## 🔧 Configuración Adicional

### Backend - phpunit.xml
Ya configurado para usar SQLite en memoria para pruebas.

### Frontend - jest.config.js
Configurado para:
- TypeScript
- Mapeo de alias (@/components, etc.)
- Cobertura de código
- Entorno jsdom

## 📊 Cobertura de Código

### Backend
```bash
php artisan test --coverage
```

### Frontend
```bash
npm run test:coverage
```

Los reportes se generan en:
- Backend: `coverage/`
- Frontend: `coverage/`

## 🚨 Troubleshooting

### Backend
- **Error de base de datos**: Ejecuta `php artisan migrate:fresh --env=testing`
- **Error de factory**: Verifica que el modelo tenga `HasFactory`

### Frontend
- **Error de módulo no encontrado**: Verifica los alias en `jest.config.js`
- **Error de TypeScript**: Ejecuta `npm run types` para verificar tipos

## 📚 Recursos Adicionales

- [Laravel Testing Documentation](https://laravel.com/docs/testing)
- [PHPUnit Documentation](https://phpunit.de/documentation.html)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started) 