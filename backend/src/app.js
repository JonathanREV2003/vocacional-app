require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const taskRoutes = require('./routes/task.routes');
const authRoutes = require('./routes/auth.routes');
const testRoutes = require('./routes/test.routes');

const app = express();

app.use(morgan('dev')); //peticiones por consola
app.use(express.json()); //formato json
app.use(cors()); // habilitar CORS

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', testRoutes);

app.listen(4000)
console.log('Server is running on port 4000');