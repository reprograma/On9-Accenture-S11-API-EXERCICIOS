//chamando o express
const express = require("express");

//executando a função router do express
const router = express.Router();

//avisa que estamos usando o verbo GET, escreve a rota, coloca a função de resposta
router.get("/", function (request, response) {
  //manda status 200 e enviando um objeto
  response.send(200).send({
    titulo: "Projeto To-Do Turma 09",
    versao: "1.0.0",
    mesnsagem: "Analu ensina muito",
  });
});

//exportando as rotas criadas
module.exports = router;
