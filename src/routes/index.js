const express = require("express"); // chama express
const router = express.Router(); // executa função router

router.get("/", function (request, response) { //avisa que estamos usando o verbo GET, escreva a rota e coloca a função de resposta
    response.status(200).send({ //manda status 200 e enviando um objeto
        titulo: "Projeto To-Do",
        versao: "1.0.0"
    })
});

module.exports = router; //exportando as rotas criadas