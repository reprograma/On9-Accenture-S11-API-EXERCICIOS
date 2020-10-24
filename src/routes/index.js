const express = require("express") // chama o Express
const router = express.Router() // executa a função Router que vem do Express


router.get("/", function (request,response){ //usando o verbo GET. escreve a rota, coloca a função de resposta
    response.status(200).send ({ // mandando um status 200 e enviando um objeto
        titulo: "Projeto To-Do Turma On9",
        versao: "1.0.0",
        mensagem: "Analu é demais"
    })
})

module.exports = router //exportanto as rotas criadas