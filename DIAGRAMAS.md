# 📊 Diagramas del Sistema de Gestión de Biblioteca

Este documento contiene todos los diagramas técnicos del sistema, incluyendo diagramas UML, de arquitectura, flujos de datos y más.

## 🏗️ Diagrama de Arquitectura General

```mermaid
graph TB
    subgraph "Frontend (React + TypeScript)"
        A[Pages] --> B[Components]
        B --> C[Services]
        C --> D[Types]
        E[Inertia.js] --> A
    end
    
    subgraph "Backend (Laravel 12)"
        F[Controllers] --> G[Models]
        G --> H[Database]
        I[Middleware] --> F
        J[Routes] --> F
    end
    
    subgraph "Database (MySQL/PostgreSQL)"
        K[instituciones]
        L[usuarios]
        M[libros]
        N[prestamos]
    end
    
    E --> F
    G --> K
    G --> L
    G --> M
    G --> N
```

## 📋 Diagrama de Clases UML

```mermaid
classDiagram
    class User {
        +int id
        +string name
        +string email
        +string password
        +timestamp email_verified_at
        +timestamp created_at
        +timestamp updated_at
        +rememberToken()
        +hasVerifiedEmail()
        +markEmailAsVerified()
    }
    
    class Institucion {
        +int id
        +string nombre
        +enum tipo
        +timestamp created_at
        +timestamp updated_at
        +timestamp deleted_at
        +usuarios() HasMany
        +scopePorTipo()
        +getNombreFormateadoAttribute()
    }
    
    class Usuario {
        +int id
        +string nombre
        +string documento
        +enum tipo
        +int institucion_id
        +timestamp created_at
        +timestamp updated_at
        +timestamp deleted_at
        +institucion() BelongsTo
        +prestamos() HasMany
        +scopePorTipo()
        +getNombreMayusculasAttribute()
    }
    
    class Libro {
        +int id
        +string titulo
        +string autor
        +string isbn
        +boolean disponible
        +timestamp created_at
        +timestamp updated_at
        +timestamp deleted_at
        +prestamos() HasMany
    }
    
    class Prestamo {
        +int id
        +int libro_id
        +int usuario_id
        +date fecha_prestamo
        +date fecha_devolucion
        +float costo
        +boolean devuelto
        +timestamp created_at
        +timestamp updated_at
        +timestamp deleted_at
        +libro() BelongsTo
        +usuario() BelongsTo
    }
    
    Institucion ||--o{ Usuario : "tiene"
    Usuario ||--o{ Prestamo : "realiza"
    Libro ||--o{ Prestamo : "es prestado en"
```

## 🔄 Diagrama de Secuencia - Autenticación

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant C as Controller
    participant M as Model
    participant DB as Database
    participant S as Session
    
    U->>F: Accede a /login
    F->>U: Renderiza formulario de login
    U->>F: Ingresa credenciales
    F->>C: POST /login
    C->>M: Auth::attempt(credentials)
    M->>DB: SELECT * FROM users WHERE email = ?
    DB->>M: Retorna usuario
    M->>C: Verifica password
    alt Credenciales válidas
        C->>S: Crear sesión
        C->>F: Redirect a /dashboard
        F->>U: Muestra dashboard
    else Credenciales inválidas
        C->>F: Error de autenticación
        F->>U: Muestra error
    end
```

## 🔄 Diagrama de Secuencia - Crear Préstamo

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant C as PrestamoController
    participant L as LibroModel
    participant P as PrestamoModel
    participant DB as Database
    
    U->>F: Accede a /prestamos/create
    F->>C: GET /prestamos/create
    C->>L: Libro::where('disponible', true)->get()
    L->>DB: SELECT * FROM libros WHERE disponible = 1
    DB->>L: Retorna libros disponibles
    C->>F: Renderiza formulario con datos
    F->>U: Muestra formulario de préstamo
    
    U->>F: Completa formulario y envía
    F->>C: POST /prestamos
    C->>C: Validar datos
    C->>L: Libro::find(libro_id)
    L->>DB: SELECT * FROM libros WHERE id = ?
    DB->>L: Retorna libro
    C->>L: Verificar disponibilidad
    alt Libro disponible
        C->>P: Prestamo::create(data)
        P->>DB: INSERT INTO prestamos
        C->>L: Marcar libro como no disponible
        L->>DB: UPDATE libros SET disponible = 0
        C->>F: Redirect a /prestamos
        F->>U: Muestra lista de préstamos
    else Libro no disponible
        C->>F: Error: Libro no disponible
        F->>U: Muestra error
    end
```

## 🗄️ Diagrama Entidad-Relación (ERD)

```mermaid
erDiagram
    USERS {
        int id PK
        string name
        string email UK
        string password
        timestamp email_verified_at
        timestamp created_at
        timestamp updated_at
    }
    
    INSTITUCIONES {
        int id PK
        string nombre
        enum tipo
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }
    
    USUARIOS {
        int id PK
        string nombre
        string documento UK
        enum tipo
        int institucion_id FK
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }
    
    LIBROS {
        int id PK
        string titulo
        string autor
        string isbn UK
        boolean disponible
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }
    
    PRESTAMOS {
        int id PK
        int libro_id FK
        int usuario_id FK
        date fecha_prestamo
        date fecha_devolucion
        float costo
        boolean devuelto
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at
    }
    
    PERSONAL_ACCESS_TOKENS {
        int id PK
        int tokenable_id
        string tokenable_type
        string name
        string token UK
        text abilities
        timestamp last_used_at
        timestamp expires_at
        timestamp created_at
        timestamp updated_at
    }
    
    INSTITUCIONES ||--o{ USUARIOS : "tiene"
    USUARIOS ||--o{ PRESTAMOS : "realiza"
    LIBROS ||--o{ PRESTAMOS : "es prestado en"
    USERS ||--o{ PERSONAL_ACCESS_TOKENS : "genera"
```

## 🎯 Diagrama de Componentes React

```mermaid
graph TD
    A[App.tsx] --> B[AppLayout]
    A --> C[AuthLayout]
    
    B --> D[AppHeader]
    B --> E[AppSidebar]
    B --> F[AppContent]
    
    D --> G[AppLogo]
    D --> H[UserMenu]
    D --> I[AppearanceDropdown]
    
    E --> J[NavMain]
    E --> K[NavUser]
    E --> L[NavFooter]
    
    F --> M[Breadcrumbs]
    F --> N[Page Content]
    
    C --> O[AuthCardLayout]
    C --> P[AuthSimpleLayout]
    
    N --> Q[Dashboard]
    N --> R[Instituciones]
    N --> S[Usuarios]
    N --> T[Libros]
    N --> U[Prestamos]
    
    R --> V[Index]
    R --> W[Create]
    R --> X[Edit]
    R --> Y[Show]
    
    S --> Z[Index]
    S --> AA[Create]
    S --> BB[Edit]
    S --> CC[Show]
    
    T --> DD[Index]
    T --> EE[Create]
    
    U --> FF[Index]
    U --> GG[Create]
```

## 🔧 Diagrama de Servicios y API

```mermaid
graph LR
    subgraph "Frontend Services"
        A[authService.ts]
        B[institucionesService.ts]
        C[usuariosService.ts]
        D[librosService.ts]
        E[prestamosService.ts]
    end
    
    subgraph "API Endpoints"
        F[POST /login]
        G[GET /api/instituciones]
        H[GET /api/usuarios]
        I[GET /api/libros]
        J[GET /api/prestamos]
    end
    
    subgraph "Controllers"
        K[AuthController]
        L[InstitucionController]
        M[UsuarioController]
        N[LibroController]
        O[PrestamoController]
    end
    
    A --> F
    B --> G
    C --> H
    D --> I
    E --> J
    
    F --> K
    G --> L
    H --> M
    I --> N
    J --> O
```

## 🔄 Diagrama de Flujo - Proceso de Préstamo

```mermaid
flowchart TD
    A[Usuario accede al sistema] --> B{¿Está autenticado?}
    B -->|No| C[Redirigir a login]
    B -->|Sí| D[Acceder a módulo de préstamos]
    
    D --> E[Ver lista de libros disponibles]
    E --> F[Seleccionar libro]
    F --> G{¿Libro disponible?}
    
    G -->|No| H[Mensaje: No disponible]
    G -->|Sí| I[Seleccionar usuario]
    
    I --> J[Configurar fechas]
    J --> K[Calcular costo automáticamente]
    K --> L[Mostrar resumen]
    
    L --> M{¿Confirmar préstamo?}
    M -->|No| N[Volver al formulario]
    M -->|Sí| O[Guardar préstamo]
    
    O --> P[Marcar libro como no disponible]
    P --> Q[Mostrar confirmación]
    Q --> R[Redirigir a lista de préstamos]
    
    H --> S[Volver al catálogo]
    N --> J
    C --> T[Proceso de autenticación]
```

## 🔄 Diagrama de Flujo - Proceso de Devolución

```mermaid
flowchart TD
    A[Usuario accede a préstamos] --> B[Ver lista de préstamos activos]
    B --> C[Seleccionar préstamo para devolver]
    C --> D{¿Préstamo existe?}
    
    D -->|No| E[Error: Préstamo no encontrado]
    D -->|Sí| F{¿Ya está devuelto?}
    
    F -->|Sí| G[Mensaje: Ya devuelto]
    F -->|No| H[Confirmar devolución]
    
    H --> I{¿Confirmar?}
    I -->|No| J[Cancelar operación]
    I -->|Sí| K[Marcar como devuelto]
    
    K --> L[Marcar libro como disponible]
    L --> M[Actualizar fecha de devolución]
    M --> N[Mostrar confirmación]
    N --> O[Redirigir a lista]
    
    E --> P[Volver a lista]
    G --> P
    J --> P
```

## 🏗️ Diagrama de Arquitectura de Capas

```mermaid
graph TB
    subgraph "Presentation Layer"
        A[React Components]
        B[Pages]
        C[Layouts]
    end
    
    subgraph "Application Layer"
        D[Controllers]
        E[Services]
        F[Middleware]
    end
    
    subgraph "Domain Layer"
        G[Models]
        H[Repositories]
        I[Validators]
    end
    
    subgraph "Infrastructure Layer"
        J[Database]
        K[File System]
        L[External APIs]
    end
    
    A --> D
    B --> D
    C --> D
    
    D --> E
    D --> F
    D --> G
    
    E --> G
    E --> H
    
    G --> J
    H --> J
    I --> G
```

## 🔐 Diagrama de Seguridad y Autenticación

```mermaid
graph TD
    A[Request] --> B{¿Ruta protegida?}
    B -->|No| C[Procesar request]
    B -->|Sí| D[Verificar autenticación]
    
    D --> E{¿Usuario autenticado?}
    E -->|No| F[Redirigir a login]
    E -->|Sí| G{¿Email verificado?}
    
    G -->|No| H[Redirigir a verificación]
    G -->|Sí| I[Verificar permisos]
    
    I --> J{¿Tiene permisos?}
    J -->|No| K[Error 403 Forbidden]
    J -->|Sí| L[Procesar request]
    
    C --> M[Response]
    L --> M
    F --> N[Login Page]
    H --> O[Verification Page]
    K --> P[Error Page]
```

## 📊 Diagrama de Estados - Libro

```mermaid
stateDiagram-v2
    [*] --> Disponible
    Disponible --> Prestado : Crear préstamo
    Prestado --> Disponible : Devolver libro
    Prestado --> Prestado : Renovar préstamo
    Disponible --> [*] : Eliminar libro
    Prestado --> [*] : Eliminar libro
```

## 📊 Diagrama de Estados - Préstamo

```mermaid
stateDiagram-v2
    [*] --> Activo
    Activo --> Devuelto : Marcar como devuelto
    Activo --> Vencido : Fecha de devolución pasada
    Vencido --> Devuelto : Marcar como devuelto
    Devuelto --> [*] : Finalizado
```

## 🔄 Diagrama de Flujo de Datos

```mermaid
graph LR
    subgraph "Input Sources"
        A[Formularios Web]
        B[API Requests]
        C[File Uploads]
    end
    
    subgraph "Processing"
        D[Validation]
        E[Business Logic]
        F[Data Transformation]
    end
    
    subgraph "Storage"
        G[Database]
        H[File System]
        I[Cache]
    end
    
    subgraph "Output"
        J[Web Pages]
        K[API Responses]
        L[Reports]
    end
    
    A --> D
    B --> D
    C --> D
    
    D --> E
    E --> F
    F --> G
    F --> H
    F --> I
    
    G --> J
    G --> K
    G --> L
    H --> J
    I --> K
```

## 🎨 Diagrama de Componentes UI

```mermaid
graph TD
    subgraph "UI Components"
        A[Button]
        B[Input]
        C[Card]
        D[Table]
        E[Modal]
        F[Navigation]
    end
    
    subgraph "Layout Components"
        G[AppLayout]
        H[AuthLayout]
        I[Sidebar]
        J[Header]
        K[Footer]
    end
    
    subgraph "Page Components"
        L[Dashboard]
        M[CRUD Pages]
        N[Forms]
        O[Lists]
    end
    
    A --> M
    B --> N
    C --> L
    D --> O
    E --> M
    F --> G
    
    G --> I
    G --> J
    G --> K
    H --> N
```

## 🔄 Diagrama de Ciclo de Vida de Desarrollo

```mermaid
graph LR
    A[Planificación] --> B[Desarrollo]
    B --> C[Testing]
    C --> D[Code Review]
    D --> E[Deployment]
    E --> F[Monitoreo]
    F --> A
    
    subgraph "Testing"
        G[Unit Tests]
        H[Integration Tests]
        I[E2E Tests]
    end
    
    subgraph "Deployment"
        J[Staging]
        K[Production]
    end
    
    C --> G
    C --> H
    C --> I
    E --> J
    E --> K
```

## 📈 Diagrama de Métricas y Monitoreo

```mermaid
graph TD
    A[Application] --> B[Logs]
    A --> C[Metrics]
    A --> D[Errors]
    
    B --> E[Log Aggregation]
    C --> F[Metrics Collection]
    D --> G[Error Tracking]
    
    E --> H[Dashboard]
    F --> H
    G --> H
    
    H --> I[Alerts]
    H --> J[Reports]
    H --> K[Analytics]
```

---

Estos diagramas proporcionan una visión completa y detallada de la arquitectura, flujos de datos, relaciones y componentes del Sistema de Gestión de Biblioteca. Cada diagrama está diseñado para mostrar diferentes aspectos del sistema desde diferentes perspectivas técnicas. 