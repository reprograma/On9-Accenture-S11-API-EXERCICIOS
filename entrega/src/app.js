const express = require('express');
const app = express();

const toDoRoutes = require('./routes/toDoRoutes');

app.use('/tarefas', toDoRoutes);

module.exports = app;
