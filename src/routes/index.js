const express = require("express")
const router = express.Router() //Executa a função router

router.get("/", function (request, response){
    response.status(200).send({ //usa o GET - faz a rota
        titulo: "Exercicios projeto To-do Turma On9",
        versao: "1.0.0",
        mensagem: "Minha API S11"
    })
})

module.exports = router //Exportando as rotas criadas