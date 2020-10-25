const express = require("express")
const { deletarTarefa } = require("../controllers/toDoControllers")
const router = express.Router()

const Controller = require("../controllers/toDoControllers")
router.post("/cadastro", Controller.criarTarefa)
router.put("/editar/:id", Controller.atualizarTarefa)
router.patch("/naoconcluidas/:id", Controller.concluirTarefa)
router.delete("/:id", Controller.deletarTarefa)
router.get("/", Controller.getAll)
router.get("/Tarefaconcluida", Controller.getTarefaConcluida)
router.get("/TarefaNaoConcluida", Controller.getTarefaNaoConcluida)
router.get("/:id", Controller.getById)

module.exports = router