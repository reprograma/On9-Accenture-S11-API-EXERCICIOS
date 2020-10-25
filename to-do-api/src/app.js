
const express  = require("express")
const app = express()

const index = require("./routes/index")
const toDoRotas = require("./routes/toDoRoutes")

app.use(express.json())

app.use("/", index)
app.use("/tarefas", toDoRotas)

module.exports = app
