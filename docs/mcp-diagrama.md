
## Descripción General
El diagrama MCP ilustra el flujo de datos y procesos entre los componentes principales de la aplicación: Frontend, Backend, Base de Datos y APIs de IA. Representa cómo los usuarios interactúan con el sistema para realizar tests vocacionales, obtener resultados y usar funcionalidades de IA.

## Componentes Principales
1. **Usuario/Frontend (React)**: Interfaz de usuario donde el usuario se registra, inicia sesión, realiza tests y ve resultados.
2. **Backend (Node.js/Express)**: Servidor que procesa peticiones, maneja autenticación, lógica de tests y integra con IA.
3. **Base de Datos (PostgreSQL)**: Almacena usuarios, tests, respuestas y puntuaciones.
4. **APIs de IA (GPT-4o, Gemini/DeepSeek)**: Proporcionan respuestas para chat de entrevistas y oportunidades laborales.

## Flujo de Procesos
1. **Registro/Login**:
   - Usuario envía datos al Frontend.
   - Frontend hace POST a /api/auth/register o /api/auth/login.
   - Backend valida y guarda en DB, devuelve token JWT.

2. **Realizar Test**:
   - Usuario solicita tests via GET /api/tests.
   - Backend consulta DB y devuelve tests con preguntas.
   - Usuario envía respuestas via POST /api/tests/submit.
   - Backend guarda respuestas en DB, calcula puntuaciones y devuelve top careers.

3. **Ver Top Carreras**:
   - Usuario hace GET /api/users/:userId/top-careers.
   - Backend consulta DB y devuelve carreras.

4. **Chat de Entrevistas**:
   - Usuario envía mensaje a Frontend.
   - Frontend hace POST /api/ia/interview/chat con careerName y userMessage.
   - Backend llama a API de IA (GPT-4o) y devuelve respuesta.

5. **Oportunidades Laborales**:
   - Usuario envía topCareers y mensaje.
   - Frontend hace POST /api/ia/job-opportunities.
   - Backend llama a API de IA (Gemini/DeepSeek) y devuelve oportunidades.

## Representación ASCII del Diagrama
```
[Usuario/Frontend (React)]
         |
         | HTTP Requests (JWT Auth)
         v
[Backend (Express)]
         |
         | SQL Queries
         v
[Base de Datos (PostgreSQL)]
         |
         | API Calls
         v
[APIs de IA (GPT-4o, Gemini)]
```


