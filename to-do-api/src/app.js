const express = require("express");
const app = express();

//const index = require("./routes/index")
const toDoRoutes = require("./routes/toDoRoutes");

app.use(express.json);
app.use("/tarefas", toDoRoutes);
//app.use("/index");

module.exports = app;