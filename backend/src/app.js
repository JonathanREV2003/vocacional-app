import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';
import testRoutes from './routes/test.routes.js';
import iaRoutes from './routes/ia.routes.js';

const app = express();

app.use(morgan('dev')); //peticiones por consola
app.use(express.json()); //formato json
app.use(cors({
  origin: [
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ].filter(Boolean)
}));

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', testRoutes);
app.use('/api/ia', iaRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Error: el puerto ${PORT} ya está en uso. Cierra el proceso que lo ocupa o cambia PORT en .env.`);
  } else {
    console.error('Error al iniciar el servidor:', error);
  }
  process.exit(1);
});