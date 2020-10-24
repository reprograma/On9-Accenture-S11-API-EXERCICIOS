const routes = require('./routes/routes');

const express = require('express');

const app = express();

app.use(express.json());
app.use('/tarefas', routes);

module.exports = app;