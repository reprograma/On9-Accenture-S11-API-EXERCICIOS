const express = require("express") //importando o express
const router = express.Router()  //chamando o express.router

const controller = require("../controllers/toDoController")

router.get("/", controller.getAll)

router.post("/cadastro", controller.criarTarefa)   //localhost:8080/tarefas/cadastro

router.put("/editar/:id", controller.atualizarTarefa)

router.patch("/naoconcluidas/:id", controller.concluirTarefa)

router.delete("/:id", controller.deletarTarefa)

module.exports = router //exportando as rotas
