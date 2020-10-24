const express = require("express")
const app = express() // cria uma aplicação de express

const taskRoutes = require("./routes/taskRoutes")

app.use(express.json())
app.use("/tasks", taskRoutes)

module.exports = app