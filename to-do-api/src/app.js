const express = require("express")
const app = express()

const index = require("./routes/index")
const toDoRotas = require("./routes/toDoRoutes")

app.use(express.json())
app.use("/tarefas", toDoRotas)
app.use("/", index)

module.exports = app