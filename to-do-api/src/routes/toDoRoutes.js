const express = require("express")
const router = express.Router()

const controller = require("../controllers/toDoController")

router.get("/", controller.getAll)

router.get("/:id", controller.getById)

router.get("/concluidas", controller.getTarefasConcluidas)

router.get("/naoconcluidas", controller.getTarefasNaoConcluidas)

router.post("/cadastro", controller.criarTarefa)

router.put("/editar/:id", controller.atualizarTarefa)

router.patch("/responsavel/:id", controller.corrigirResponsavel)

router.patch("/naoconcluidas/:id", controller.concluirTarefa)

router.delete("/:id", controller.deletarTarefa)

module.exports = router

