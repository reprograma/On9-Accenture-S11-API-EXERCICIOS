const express = require("express") // chama o express
const router = express.Router() // executa função router

router.get("/", function (request, response) { // usa o verbo GET, escreve a rota, coloca a função de resposta
    response.status(200).send({ //manda status 200 e enviando um objeto
        titulo: "Projeto To-Do Turma On9",
        versao: "1.0.0",
        mensagem: "Apresentação da API"
    })
})

module.exports = router //exportando as rotas criadas