# Arquitectura de la Aplicación Vocacional

## Stack Tecnológico

### Frontend
- **Framework**: React 19.1.1 con Vite como bundler.
- **Estilos**: Tailwind CSS v3 para diseño responsivo y utilitario.
- **Animaciones/3D**: Spline para elementos interactivos.
- **Iconos**: Boxicons y React Icons.
- **Navegación**: React Router DOM para enrutamiento.
- **Notificaciones**: React Toastify.
- **Otras dependencias**: Node-fetch para peticiones.

### Backend
- **Runtime**: Node.js con módulos ES6 (type: "module").
- **Framework**: Express.js 5.1.0 para API REST.
- **Base de Datos**: PostgreSQL con driver 'pg' para conexiones.
- **Autenticación**: JWT (jsonwebtoken) y bcrypt para hashing de contraseñas.
- **Logging**: Morgan para logs de peticiones.
- **CORS**: Habilitado para comunicación con frontend.
- **Otras dependencias**: Dotenv para variables de entorno, node-fetch para APIs externas.

### Base de Datos
- **Tipo**: PostgreSQL (relacional).
- **Esquema**: Definido en `db.sql` con tablas para usuarios, tests, preguntas, opciones, carreras, respuestas y puntuaciones.

### APIs de IA
- **Chat**: GPT-4o mini para interacciones conversacionales.
- **Planes de Estudio**: Gemini Free Tier o DeepSeek para generación de oportunidades laborales.

## Dependencias Principales

### Frontend (package.json)
- React y React DOM para UI.
- Tailwind CSS para estilos.
- Spline para elementos 3D.
- React Router para navegación.
- Toastify para notificaciones.

### Backend (package.json)
- Express para servidor.
- PG para PostgreSQL.
- JWT y bcrypt para auth.
- Morgan para logging.
- Cors para cross-origin.

## Estructura del Proyecto
- **Frontend**: Componentes en React, páginas para login, dashboard, tests, chat, etc.
- **Backend**: Controladores para auth, tests, IA, tasks; modelos para DB; rutas para endpoints.
- **Docs**: Documentación en esta carpeta.

## Flujo General
1. Usuario se registra/login en frontend.
2. Accede a tests vocacionales.
3. Envía respuestas al backend, que calcula puntuaciones.
4. Usa IA para chat de entrevistas y oportunidades laborales.