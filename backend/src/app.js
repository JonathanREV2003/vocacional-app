const express = require('express');
const morgan = require('morgan');

const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(morgan('dev')); //peticiones por consola

app.use(taskRoutes);

app.listen(4000)
console.log('Server is running on port 4000');