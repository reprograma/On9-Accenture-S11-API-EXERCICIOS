const express = require("express")
const router = express.Router()

const controller = require("../controllers/toDoController")

router.get("/", controller.getAll)

router.get("/concluidas", controller.getConcluidas)

router.get("/naoconcluidas", controller.getNaoConcluidas)

router.post("/cadastro", controller.criarTarefa)

router.put("/editar/:id", controller.atualizarTarefa)

router.patch("/naoconcluidas/:id", controller.concluirTarefa)

router.patch("/naoconcluidas/colaborador/:id", controller.corrigirResponsavel)

router.get("/:id", controller.getById)

router.delete("/:id", controller.deletarTarefa)

module.exports = router