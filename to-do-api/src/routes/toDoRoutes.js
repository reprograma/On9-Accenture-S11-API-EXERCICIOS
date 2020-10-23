const express = require("express");
const toDoController = require("../controllers/toDoController");
const router = express.Router();

const controller = require ("../controllers/toDoController")

router.get("/tarefas", toDoController.getAll)
router.get("/tarefas/:id", toDoController.getById)
router.get("/tarefas/concluidas", toDoController.getByConcluida)
router.get("/tarefas/naoconcluidas", toDoController.getByNaoConcluida)
router.post("/tarefas/cadastro", toDoController.criarTarefa)
router.put("/tarefas/editar/id", toDoController.atualizarTarefa)
router.patch("/tarefas/naoconcluidas/:id", toDoController.concluirTarefa)
router.patch("/tarefas/colaborador/naoconcluidas/:id", toDoController.corrigirNomeColaborador)
router.delete("/tarefas/:id", toDoController.deletarTarefa)

module.exports = router