# Documentación de Endpoints API

La API está construida con Express.js y se ejecuta en el puerto 4000. Base URL: `http://localhost:4000/api`.

## Autenticación (/api/auth)

### POST /api/auth/register
Registra un nuevo usuario.

- **Body**:
  ```json
  {
    "nombre": "string",
    "email": "string",
    "password": "string",
    "rol": "string"
  }
  ```
- **Respuesta**:
  - 200: Usuario registrado exitosamente.
  - 400: Datos inválidos.
  - 500: Error del servidor.

### POST /api/auth/login
Inicia sesión de un usuario.

- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Respuesta**:
  - 200: Token JWT y datos del usuario.
  - 400: Credenciales inválidas.
  - 500: Error del servidor.

## Tests (/api/tests)

### GET /api/tests
Obtiene todos los tests con sus preguntas y opciones.

- **Respuesta**:
  - 200: Array de tests con preguntas y opciones.
  - 500: Error obteniendo tests.

### POST /api/tests/submit
Envía respuestas de un test y calcula puntuaciones de carreras.

- **Body**:
  ```json
  {
    "userId": "number",
    "responses": [
      {
        "questionId": "number",
        "optionId": "number"
      }
    ]
  }
  ```
- **Respuesta**:
  - 200: Respuestas guardadas y top careers calculadas.
  - 400: Datos inválidos.
  - 500: Error guardando respuestas.

### GET /api/users/:userId/top-careers
Obtiene las top 3 carreras para un usuario.

- **Parámetros**:
  - userId: ID del usuario.
- **Respuesta**:
  - 200: Array de top careers.
  - 400: ID de usuario requerido.
  - 500: Error obteniendo carreras.

## IA (/api/ia)

### POST /api/ia/interview/chat
Interactúa con el chatbot de entrevistas.

- **Body**:
  ```json
  {
    "careerName": "string",
    "userMessage": "string"
  }
  ```
- **Respuesta**:
  - 200: Respuesta del chatbot.
  - 400: Datos requeridos faltantes.
  - 500: Error en el chatbot.

### POST /api/ia/job-opportunities
Obtiene oportunidades laborales basadas en carreras.

- **Body**:
  ```json
  {
    "topCareers": ["string"],
    "userMessage": "string"
  }
  ```
- **Respuesta**:
  - 200: Oportunidades laborales generadas.
  - 400: topCareers requerido.
  - 500: Error obteniendo oportunidades.

## Tasks (/api/tasks) - Endpoints de Prueba

### GET /api/tasks/loginn
Obtiene todos los logins (posiblemente para testing).

- **Respuesta**:
  - 200: Array de logins.
  - 500: Error.

### POST /api/tasks/loginn
Crea un nuevo login.

- **Body**: Datos del login.
- **Respuesta**:
  - 200: Login creado.
  - 500: Error.

### PUT /api/tasks/loginn/:id
Actualiza un login por ID.

- **Parámetros**:
  - id: ID del login.
- **Body**: Datos a actualizar.
- **Respuesta**:
  - 200: Login actualizado.
  - 500: Error.

### DELETE /api/tasks/loginn/:id
Elimina un login por ID.

- **Parámetros**:
  - id: ID del login.
- **Respuesta**:
  - 200: Login eliminado.
  - 500: Error.

## Notas Generales
- Todos los endpoints requieren autenticación JWT excepto register y login.
- Usar middleware de CORS para frontend.
- Errores se manejan con códigos HTTP estándar.