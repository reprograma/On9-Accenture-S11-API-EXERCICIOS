const express = require("express") //chama o express
const router = express.Router()  //executando o router

router.get("/", function (request, response){   //usa o verbo GET, escreve a rota, colcoa a função de resposta
    response.status(200).send({ //manda status 200 e enviando um objeto
      titulo:"Projeto To-Do Turma On9",
      versao: "1.0.0",
      mensagem: "Mara você é de mais"
    })
})

module.exports = router // exportando as rotas criadas

