const express = require("express");
const app = express();

const index = require("./routes/index");

const toDoRouter = require("./routes/toDoRoutes");

app.use(express.json());

app.use("/", index);
app.use("/tarefas", toDoRouter);

module.exports = app;