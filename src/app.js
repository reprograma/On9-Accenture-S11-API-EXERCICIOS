const express = require("express");

//chamando o nosso express por meio da função
const app = express();

//exportando o nosso index para o nosso arquivo app
const index = require("./routes/index");

//chamando a nossa rota
const taskRoutes = require("./routes/taskRoutes")

//criando a nossa rota raiz (geralmente o frontEnd nos envia). A gente vai usar o json e por isso temos que avisar ao express.
app.use(express.json());

app.use("/", index);

//Aqui a gente define a rota raiz
app.use("/tarefas", taskRoutes)

//aqui a gente exporta para usar em outro arquivo
module.exports = app;
