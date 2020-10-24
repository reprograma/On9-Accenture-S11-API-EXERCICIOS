const express = require("express") // chamando express
const router = express.Router() // executando função router que vem do express

router.get("/", function (req, res){ //avisa que estamos usando o verbo GET, escreve a rota, coloca a função de resposta
    res.status(200).send({ // manda status 200 e enviando um objeto
        titulo: "Projeto To-Do Turma On9",
        versao: "1.0.0",
        mensagem: "Oi Aline"
    })
    
})

module.exports = router // exportando as rotas criadas