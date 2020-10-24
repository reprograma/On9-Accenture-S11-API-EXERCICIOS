const express = require("express");

const router = express.Router();

router.get("/", function (request, res) {

  res.status(200).send({
    titulo: "Projeto To-Do Turma 09",
    versao: "1.0.0",
    mesnsagem: "Analu ensina muito",
  });
});

module.exports = router;