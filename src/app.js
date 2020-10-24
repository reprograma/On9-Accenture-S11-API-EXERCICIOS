const express = require("express") //chamando o express
const app = express() //executando o express

const index = require("./routes/index")
const toDoRotas = require("./routes/toDoRoutes") //chamando as rotas
// const tarefasController = require("./routes/tarefasRoutes")

app.use(express.json())  //avisando que vamos usar json sempre que formos nos comunicar]

app.use("/", index)
app.use("/tarefas", toDoRotas)

module.exports = app
