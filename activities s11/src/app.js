const express = require("express");
const app = express();

const index = require("./routes/index");
const toDoRoutes = require("./routes/toDoRoutes");

app.use(express.json());

app.use("/", index);
app.use("/tarefas", toDoRoutes);

module.exports = app
