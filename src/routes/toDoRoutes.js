const express = require("express")
const router = express.Router()

const controller = require("../controllers/toDoController")

router.get("/", controller.getAll)

router.get("/concluidas", controller.getTarefaConcluida)

router.get("/naoconcluidas", controller.getTarefaNaoConcluida)

router.get("/:id", controller.getID)

router.post("/cadastro", controller.criarTarefa)

router.put("/editar/:id", controller.atualizarTarefa)

router.patch("/naoconcluidas/:id", controller.concluirTarefa)

router.patch("/naoconcluidas/colaborador/:id", controller.corrigirResponsavel)

router.delete("/:id", controller.deletarTarefa)


module.exports = router

