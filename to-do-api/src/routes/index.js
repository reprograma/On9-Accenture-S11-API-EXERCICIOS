const express = require('express');
const router = express.Router();

router.get("/", function(request, response){
    response.send(200).send({
        titulo: "Projeto To-Do Reprograma",
        versao: "1.0,0"
    })
})

module.exports = router;