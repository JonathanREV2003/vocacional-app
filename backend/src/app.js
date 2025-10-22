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
app.use(cors()); // habilitar CORS

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', testRoutes);
app.use('/api/ia', iaRoutes);

app.listen(4000)
console.log('Servidor corriendo en el puerto 4000');