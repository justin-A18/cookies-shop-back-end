<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>

# Cookies Shop Backend

Este es el backend para una tienda de galletas, desarrollado con NestJS y PostgreSQL. El sistema incluye funcionalidades para manejar productos, carritos de compras y autenticación de usuarios.

## Tecnologías

- **NestJS**: Framework para Node.js utilizado para construir el backend.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **TypeORM**: ORM para TypeScript y JavaScript.
- **Bcrypt**: Para el hash de contraseñas.
- **JWT**: Para la autenticación de usuarios.
- **Nodemailer**: Para el envio de correos.

## Uso

- **Autenticación**:
  - `POST /auth/register`
  - `POST /auth/login`
  - `POST /auth/validate-email/:token`
  - `POST /auth/change-password/:token`
  - `POST /auth/reset-password`

## Installation

# Cookies Shop Backend

Este es el backend para una tienda de galletas, desarrollado con NestJS y PostgreSQL. El sistema incluye funcionalidades para manejar productos, carritos de compras y autenticación de usuarios.

## Tecnologías

- **NestJS**: Framework para Node.js utilizado para construir el backend.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **TypeORM**: ORM para TypeScript y JavaScript.
- **Bcrypt**: Para el hash de contraseñas.
- **JWT**: Para la autenticación de usuarios.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/justin-A18/cookies-shop-back-end.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd cookies-shop-back-end
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura la base de datos. Crea un archivo `.env` en el directorio raíz del proyecto y agrega la configuración de tu base de datos PostgreSQL. Un ejemplo de configuración puede ser:

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=tu_usuario
   DATABASE_PASSWORD=tu_contraseña
   DATABASE_NAME=tu_base_de_datos
   ```

5. Inicia el servidor:

   ```bash
   npm run start
   ```
