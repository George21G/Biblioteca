# 📚 Sistema de Gestión de Biblioteca

Un sistema completo de gestión de biblioteca desarrollado con **Laravel 12**, **React 19**, **TypeScript** e **Inertia.js**. Permite gestionar instituciones, usuarios, libros y préstamos de manera eficiente y moderna.

## 🚀 Características Principales

- **Gestión de Instituciones**: Administra escuelas, universidades, empresas y colegios
- **Gestión de Usuarios**: Control de usuarios naturales, estudiantes y empresas
- **Catálogo de Libros**: Gestión completa del inventario bibliográfico
- **Sistema de Préstamos**: Control de préstamos con fechas y costos
- **Dashboard Interactivo**: Panel de control con estadísticas en tiempo real
- **Interfaz Moderna**: UI/UX moderna con Tailwind CSS y componentes Radix UI
- **Autenticación Completa**: Sistema de login, registro y verificación de email
- **API REST**: Endpoints para integración con otros sistemas
- **Soft Deletes**: Eliminación segura de registros
- **Testing**: Suite completa de pruebas unitarias y de integración

## 🛠️ Stack Tecnológico

### Backend
- **Laravel 12** - Framework PHP
- **PHP 8.2+** - Lenguaje de programación
- **MySQL/PostgreSQL** - Base de datos
- **Laravel Sanctum** - Autenticación API
- **Inertia.js** - Renderizado del lado del servidor

### Frontend
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework de estilos
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconografía
- **Recharts** - Gráficos y visualizaciones

### Herramientas de Desarrollo
- **Vite** - Bundler y servidor de desarrollo
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Jest** - Testing framework
- **PHPUnit** - Testing PHP

## 📋 Requisitos Previos

- **PHP 8.2** o superior
- **Composer** 2.0 o superior
- **Node.js** 18.0 o superior
- **npm** o **yarn**
- **MySQL** 8.0 o **PostgreSQL** 13 o superior
- **Git**

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/George21G/Biblioteca
cd biblioteca
```

### 2. Instalar Dependencias PHP

```bash
composer install
```

### 3. Instalar Dependencias JavaScript

```bash
npm install
```

### 4. Configurar Variables de Entorno

```bash
cp .env.example .env
php artisan key:generate
```

Editar el archivo `.env` con tu configuración de base de datos:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=biblioteca
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
```

### 5. Ejecutar Migraciones

```bash
php artisan migrate
```

### 6. Ejecutar Seeders (Opcional)

```bash
php artisan db:seed
```

### 7. Compilar Assets

```bash
npm run build
```

### 8. Iniciar el Servidor

```bash
php artisan serve
```

El proyecto estará disponible en `http://localhost:8000`

## 🎯 Comandos de Desarrollo

### Desarrollo Completo
```bash
composer run dev
```
Este comando inicia:
- Servidor Laravel
- Cola de trabajos
- Logs en tiempo real
- Vite dev server

### Solo Frontend
```bash
npm run dev
```

### Testing
```bash
# Tests PHP
composer test

# Tests JavaScript
npm test
```

### Formateo de Código
```bash
# PHP
./vendor/bin/pint

# JavaScript/TypeScript
npm run format
```

## 📊 Estructura de la Base de Datos

### Entidades Principales

#### Instituciones
- `id` - Identificador único
- `nombre` - Nombre de la institución
- `tipo` - Tipo (escuela, universidad, empresa, colegio)
- `created_at`, `updated_at` - Timestamps

#### Usuarios
- `id` - Identificador único
- `nombre` - Nombre del usuario
- `documento` - Número de documento (único)
- `tipo` - Tipo (natural, estudiante, empresa)
- `institucion_id` - Relación con institución
- `created_at`, `updated_at` - Timestamps

#### Libros
- `id` - Identificador único
- `titulo` - Título del libro
- `autor` - Autor del libro
- `isbn` - ISBN (único)
- `disponible` - Estado de disponibilidad
- `created_at`, `updated_at` - Timestamps

#### Préstamos
- `id` - Identificador único
- `libro_id` - Relación con libro
- `usuario_id` - Relación con usuario
- `fecha_prestamo` - Fecha de préstamo
- `fecha_devolucion` - Fecha de devolución
- `costo` - Costo del préstamo
- `devuelto` - Estado de devolución
- `created_at`, `updated_at` - Timestamps

## 🔄 Relaciones del Modelo

```
Institucion (1) ←→ (N) Usuario
Usuario (1) ←→ (N) Prestamo
Libro (1) ←→ (N) Prestamo
```

## 🛣️ Rutas Principales

### Autenticación
- `GET /login` - Página de login
- `POST /login` - Procesar login
- `GET /register` - Página de registro
- `POST /register` - Procesar registro

### Dashboard
- `GET /dashboard` - Panel principal

### Instituciones
- `GET /instituciones` - Lista de instituciones
- `GET /instituciones/create` - Crear institución
- `POST /instituciones` - Guardar institución
- `GET /instituciones/{id}` - Ver institución
- `GET /instituciones/{id}/edit` - Editar institución
- `PUT /instituciones/{id}` - Actualizar institución
- `DELETE /instituciones/{id}` - Eliminar institución

### Usuarios
- `GET /usuarios` - Lista de usuarios
- `GET /usuarios/create` - Crear usuario
- `POST /usuarios` - Guardar usuario
- `GET /usuarios/{id}` - Ver usuario
- `GET /usuarios/{id}/edit` - Editar usuario
- `PUT /usuarios/{id}` - Actualizar usuario
- `DELETE /usuarios/{id}` - Eliminar usuario

### Libros
- `GET /libros` - Lista de libros
- `GET /libros/create` - Crear libro
- `POST /libros` - Guardar libro
- `GET /libros/{id}` - Ver libro
- `GET /libros/{id}/edit` - Editar libro
- `PUT /libros/{id}` - Actualizar libro
- `DELETE /libros/{id}` - Eliminar libro

### Préstamos
- `GET /prestamos` - Lista de préstamos
- `GET /prestamos/create` - Crear préstamo
- `POST /prestamos` - Guardar préstamo
- `GET /prestamos/{id}` - Ver préstamo
- `GET /prestamos/{id}/edit` - Editar préstamo
- `PUT /prestamos/{id}` - Actualizar préstamo
- `DELETE /prestamos/{id}` - Eliminar préstamo
- `POST /prestamos/{id}/devolver` - Marcar como devuelto

## 🔌 API Endpoints

### Instituciones
- `GET /api/instituciones` - Lista de instituciones

### Usuarios
- `GET /api/usuarios` - Lista de usuarios

### Libros
- `GET /api/libros` - Lista de libros

### Préstamos
- `GET /api/prestamos` - Lista de préstamos

## 🧪 Testing

### Tests PHP
```bash
# Ejecutar todos los tests
composer test

# Tests específicos
./vendor/bin/phpunit --filter=LibroTest
```

### Tests JavaScript
```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
biblioteca/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # Controladores
│   │   ├── Middleware/      # Middleware
│   │   └── Requests/        # Form Requests
│   ├── Models/              # Modelos Eloquent
│   └── Providers/           # Service Providers
├── database/
│   ├── factories/           # Factories para testing
│   ├── migrations/          # Migraciones de BD
│   └── seeders/             # Seeders
├── resources/
│   └── js/
│       ├── components/      # Componentes React
│       ├── pages/           # Páginas de la aplicación
│       ├── services/        # Servicios API
│       └── types/           # Tipos TypeScript
├── routes/                  # Definición de rutas
├── tests/                   # Tests PHP
└── public/                  # Archivos públicos
```

## 🎨 Componentes UI

El proyecto utiliza una biblioteca de componentes personalizada basada en:
- **Radix UI** - Componentes primitivos accesibles
- **Tailwind CSS** - Utilidades de estilos
- **Class Variance Authority** - Variantes de componentes
- **Lucide React** - Iconografía

### Componentes Principales
- `Button` - Botones con variantes
- `Card` - Tarjetas de contenido
- `Input` - Campos de entrada
- `Select` - Selectores
- `Dialog` - Modales
- `Table` - Tablas de datos
- `Badge` - Etiquetas
- `Avatar` - Avatares de usuario

## 🔐 Autenticación y Autorización

- **Laravel Sanctum** para autenticación API
- **Middleware de autenticación** en rutas protegidas
- **Verificación de email** opcional
- **Reset de contraseñas** implementado
- **Sesiones seguras** con CSRF protection

## 📈 Dashboard y Estadísticas

El dashboard incluye:
- **Estadísticas generales** del sistema
- **Gráficos de actividad** reciente
- **Accesos rápidos** a módulos principales
- **Indicadores de estado** en tiempo real
- **Actividad reciente** de préstamos y usuarios

## 🚀 Despliegue

### Producción
1. Configurar variables de entorno de producción
2. Ejecutar `composer install --optimize-autoloader --no-dev`
3. Ejecutar `npm run build`
4. Configurar servidor web (Apache/Nginx)
5. Configurar base de datos de producción

### Docker (Opcional)
```bash
# Construir imagen
docker build -t biblioteca .

# Ejecutar contenedor
docker run -p 8000:8000 biblioteca
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Jorge Eduardo Robles Niño** - *Biblioteca* - [George21G](https://github.com/George21G)

**¡Gracias por usar nuestro Sistema de Gestión de Biblioteca!** 📚✨ 