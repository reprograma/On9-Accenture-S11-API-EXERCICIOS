const express = require("express");
const router = express.Router();

router.get("/", function(request, response) {
    response.status(200).send({
        titulo: "projeto To-Do turma on9",
        versao: "1.0.0",
        mensagem: "tururu"
    })
})

module.exports = router