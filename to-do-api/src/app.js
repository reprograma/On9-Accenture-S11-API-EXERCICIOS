const express = require("express");
const app = express(); //executa a função
const cors = require("cors");

const index = require("./routes/index");
const toDoRoutes = require("./routes/toDoRoutes");

app.use(cors());
app.use(express.json());
app.use("/", index);
app.use("/tarefas", toDoRoutes); //rota raíz

module.exports = app;
