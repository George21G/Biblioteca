# 🚀 Guía de Instalación - Sistema de Gestión de Biblioteca

Esta guía te llevará paso a paso a través del proceso de instalación y configuración del Sistema de Gestión de Biblioteca.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

### ✅ Software Requerido

| Software | Versión Mínima | Descripción |
|----------|----------------|-------------|
| **PHP** | 8.2+ | Lenguaje de programación del backend |
| **Composer** | 2.0+ | Gestor de dependencias PHP |
| **Node.js** | 18.0+ | Runtime de JavaScript |
| **npm** | 8.0+ | Gestor de paquetes Node.js |
| **MySQL** | 8.0+ | Base de datos (o PostgreSQL 13+) |
| **Git** | 2.0+ | Control de versiones |

### 🔍 Verificar Instalaciones

```bash
# Verificar PHP
php --version
# Debe mostrar: PHP 8.2.x o superior

# Verificar Composer
composer --version
# Debe mostrar: Composer version 2.x.x

# Verificar Node.js
node --version
# Debe mostrar: v18.x.x o superior

# Verificar npm
npm --version
# Debe mostrar: 8.x.x o superior

# Verificar MySQL
mysql --version
# Debe mostrar: mysql Ver 8.x.x

# Verificar Git
git --version
# Debe mostrar: git version 2.x.x
```

## 🛠️ Instalación Paso a Paso

### Paso 1: Clonar el Repositorio

```bash
# Navegar al directorio donde quieres instalar el proyecto
cd /ruta/donde/instalar

# Clonar el repositorio
git clone https://github.com/George21G/Biblioteca

# Entrar al directorio del proyecto
cd biblioteca

# Verificar que estás en el directorio correcto
ls -la
# Deberías ver archivos como: composer.json, package.json, artisan, etc.
```

### Paso 2: Instalar Dependencias PHP

```bash
# Instalar dependencias de Composer
composer install

# Si tienes problemas de memoria, usa:
composer install --ignore-platform-reqs

# Verificar que la instalación fue exitosa
composer show --installed
```

**⚠️ Posibles Errores y Soluciones:**

```bash
# Error: Memory limit
# Solución: Aumentar límite de memoria
php -d memory_limit=-1 composer install

# Error: Extension missing
# Solución: Instalar extensiones PHP faltantes
sudo apt-get install php8.2-mysql php8.2-xml php8.2-curl php8.2-mbstring php8.2-zip
```

### Paso 3: Instalar Dependencias JavaScript

```bash
# Instalar dependencias de npm
npm install

# Si tienes problemas, limpia la caché
npm cache clean --force
npm install

# Verificar instalación
npm list --depth=0
```

**⚠️ Posibles Errores y Soluciones:**

```bash
# Error: Node modules corruptos
# Solución: Eliminar y reinstalar
rm -rf node_modules package-lock.json
npm install

# Error: Permisos
# Solución: Usar sudo (solo si es necesario)
sudo npm install
```

### Paso 4: Configurar Variables de Entorno

```bash
# Copiar archivo de configuración
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate
```

**📝 Editar el archivo `.env`:**

```env
# Configuración de la aplicación
APP_NAME="Sistema de Biblioteca"
APP_ENV=local
APP_KEY=base64:tu_clave_generada
APP_DEBUG=true
APP_URL=http://localhost:8000

# Configuración de base de datos
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=biblioteca
DB_USERNAME=tu_usuario_mysql
DB_PASSWORD=tu_password_mysql

# Configuración de correo (opcional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

# Configuración de sesión
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

### Paso 5: Configurar Base de Datos

#### Opción A: MySQL

```bash
# Conectar a MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE biblioteca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Crear usuario (opcional pero recomendado)
CREATE USER 'biblioteca_user'@'localhost' IDENTIFIED BY 'tu_password_seguro';
GRANT ALL PRIVILEGES ON biblioteca.* TO 'biblioteca_user'@'localhost';
FLUSH PRIVILEGES;

# Salir de MySQL
EXIT;
```

#### Opción B: PostgreSQL

```bash
# Conectar a PostgreSQL
sudo -u postgres psql

# Crear base de datos
CREATE DATABASE biblioteca;

# Crear usuario
CREATE USER biblioteca_user WITH PASSWORD 'tu_password_seguro';
GRANT ALL PRIVILEGES ON DATABASE biblioteca TO biblioteca_user;

# Salir de PostgreSQL
\q
```

### Paso 6: Ejecutar Migraciones

```bash
# Ejecutar migraciones para crear tablas
php artisan migrate

# Verificar que las tablas se crearon
php artisan migrate:status
```

**📊 Tablas creadas:**
- `users` - Usuarios del sistema
- `instituciones` - Instituciones educativas/empresas
- `usuarios` - Usuarios de la biblioteca
- `libros` - Catálogo de libros
- `prestamos` - Registro de préstamos
- `personal_access_tokens` - Tokens de API
- `migrations` - Control de migraciones
- `failed_jobs` - Trabajos fallidos
- `cache` - Caché del sistema

### Paso 7: Ejecutar Seeders (Datos de Prueba)

```bash
# Ejecutar seeders para crear datos de prueba
php artisan db:seed

# Verificar datos creados
php artisan tinker
>>> App\Models\Institucion::count();
>>> App\Models\Usuario::count();
>>> App\Models\Libro::count();
>>> exit
```

**📝 Datos de prueba creados:**
- 5 instituciones (escuelas, universidades, empresas)
- 20 usuarios (estudiantes, personal)
- 50 libros (diferentes géneros)
- 10 préstamos de ejemplo

### Paso 8: Compilar Assets

```bash
# Compilar assets para producción
npm run build

# Verificar que se crearon los archivos
ls -la public/build/
```

### Paso 9: Configurar Permisos (Solo Linux/Mac)

```bash
# Dar permisos de escritura a directorios necesarios
chmod -R 775 storage/
chmod -R 775 bootstrap/cache/

# Cambiar propietario (si es necesario)
sudo chown -R $USER:www-data storage/
sudo chown -R $USER:www-data bootstrap/cache/
```

### Paso 10: Iniciar el Servidor

```bash
# Iniciar servidor de desarrollo
php artisan serve

# El proyecto estará disponible en: http://localhost:8000
```

## 🎯 Verificación de la Instalación

### 1. Verificar Acceso Web

Abre tu navegador y ve a `http://localhost:8000`

**✅ Deberías ver:**
- Página de bienvenida
- Enlaces de login/registro
- Sin errores de JavaScript

### 2. Verificar Base de Datos

```bash
# Conectar a la base de datos
mysql -u biblioteca_user -p biblioteca

# Verificar tablas
SHOW TABLES;

# Verificar datos
SELECT COUNT(*) FROM instituciones;
SELECT COUNT(*) FROM usuarios;
SELECT COUNT(*) FROM libros;
SELECT COUNT(*) FROM prestamos;

# Salir
EXIT;
```

### 3. Verificar Logs

```bash
# Verificar logs de Laravel
tail -f storage/logs/laravel.log

# Verificar logs de errores del servidor
tail -f storage/logs/error.log
```

## 🚀 Comandos de Desarrollo

### Desarrollo Completo

```bash
# Iniciar todos los servicios de desarrollo
composer run dev

# Esto inicia:
# - Servidor Laravel (http://localhost:8000)
# - Cola de trabajos
# - Logs en tiempo real
# - Vite dev server (http://localhost:5173)
```

### Solo Frontend

```bash
# Solo para desarrollo de frontend
npm run dev
```

### Testing

```bash
# Tests PHP
composer test

# Tests JavaScript
npm test

# Tests con coverage
npm run test:coverage
```

### Mantenimiento

```bash
# Limpiar caché
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimizar para producción
php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 🔧 Configuración Avanzada

### Configurar Servidor Web (Apache)

```apache
# /etc/apache2/sites-available/biblioteca.conf
<VirtualHost *:80>
    ServerName biblioteca.local
    DocumentRoot /ruta/a/biblioteca/public
    
    <Directory /ruta/a/biblioteca/public>
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/biblioteca_error.log
    CustomLog ${APACHE_LOG_DIR}/biblioteca_access.log combined
</VirtualHost>
```

```bash
# Habilitar sitio
sudo a2ensite biblioteca.conf
sudo systemctl reload apache2
```

### Configurar Servidor Web (Nginx)

```nginx
# /etc/nginx/sites-available/biblioteca
server {
    listen 80;
    server_name biblioteca.local;
    root /ruta/a/biblioteca/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

```bash
# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/biblioteca /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Configurar SSL (HTTPS)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-apache

# Obtener certificado SSL
sudo certbot --apache -d biblioteca.tudominio.com

# Renovar automáticamente
sudo crontab -e
# Agregar: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🐳 Configuración con Docker

### Dockerfile

```dockerfile
# Dockerfile
FROM php:8.2-fpm

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Instalar extensiones PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer directorio de trabajo
WORKDIR /var/www

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# Configurar permisos
RUN chown -R www-data:www-data /var/www
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/var/www
    depends_on:
      - db
    environment:
      DB_HOST: db
      DB_DATABASE: biblioteca
      DB_USERNAME: root
      DB_PASSWORD: secret

  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: biblioteca
      MYSQL_ROOT_PASSWORD: secret
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

```bash
# Ejecutar con Docker
docker-compose up -d
docker-compose exec app php artisan migrate
docker-compose exec app php artisan db:seed
```

## 🔍 Solución de Problemas

### Problemas Comunes

#### 1. Error de Permisos

```bash
# Error: Permission denied
# Solución:
sudo chown -R $USER:$USER .
chmod -R 755 storage bootstrap/cache
```

#### 2. Error de Base de Datos

```bash
# Error: Connection refused
# Solución: Verificar que MySQL esté corriendo
sudo systemctl status mysql
sudo systemctl start mysql

# Error: Access denied
# Solución: Verificar credenciales en .env
mysql -u tu_usuario -p
```

#### 3. Error de Composer

```bash
# Error: Memory limit
# Solución:
php -d memory_limit=-1 composer install

# Error: Extension missing
# Solución: Instalar extensiones PHP
sudo apt-get install php8.2-mysql php8.2-xml php8.2-curl
```

#### 4. Error de npm

```bash
# Error: Node modules corruptos
# Solución:
rm -rf node_modules package-lock.json
npm install

# Error: Version incompatible
# Solución: Actualizar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 5. Error de Vite

```bash
# Error: Port already in use
# Solución: Cambiar puerto
npm run dev -- --port 3000

# Error: Cannot find module
# Solución: Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Logs y Debugging

```bash
# Ver logs de Laravel
tail -f storage/logs/laravel.log

# Ver logs de errores
tail -f storage/logs/error.log

# Modo debug
# En .env: APP_DEBUG=true

# Verificar configuración
php artisan config:show
php artisan route:list
```

## 📞 Soporte

Si encuentras problemas durante la instalación:

1. **Verificar prerrequisitos** - Asegúrate de tener todas las versiones correctas
2. **Revisar logs** - Los logs contienen información detallada de errores
3. **Buscar en issues** - Revisa si el problema ya fue reportado
4. **Crear issue** - Si es un problema nuevo, crea un issue con detalles

### Información Útil para Reportes

```bash
# Información del sistema
php --version
composer --version
node --version
npm --version
mysql --version

# Información del proyecto
php artisan --version
npm list --depth=0

# Logs de error
tail -n 50 storage/logs/laravel.log
```

---


Ahora puedes comenzar a usar el sistema en `http://localhost:8000` 