const express = require("express") //primeira coisa chamar o express
const app = express() // executa a funçao express

const index = require("./routes/index")
const toDoRotas = require("./routes/toDoRoutes")

app.use(express.json())

app.use("/", index)
app.use("/tarefas",toDoRotas)


module.exports = app