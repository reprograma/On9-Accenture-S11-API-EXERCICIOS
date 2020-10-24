const express = require("express");
const router = express.Router(); //executa a função Router que vem do express

router.get("/", (request, response) => { //usando o verbo get
  response.status(200).send({ //resposta que será enviada na rota /
    titulo: "Projeto To-Do Turma On9",
    versao: "1.0.0",
  });
});

module.exports = router;
