const express = require("express");
const router = express.Router();

const controller = require("../controller/tarefaController");

router.get("/", controller.getAll);

router.post("/cadastro", controller.criarTarefa);

router.put("/editar/:id", controller.atualizarTarefa);

router.patch("/naoconcluidas/:id", controller.concluirTarefa);

router.patch(
  "/naoconcluidas/colaborador/:id",
  controller.concluirTarefaColaborador
);

router.delete("/:id", controller.deletarTarefa);

module.exports = router;
