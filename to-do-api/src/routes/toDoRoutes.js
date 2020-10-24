const express = require("express");
const router = express.Router();

const toDoController = require("../controllers/toDoController");

/**
@route GET tarefas
@desc Retornar todas as tarefas
@access Public 
@endpoint http://localhost:porta/tarefas
**/
router.get("/", toDoController.getAll);

/**
@route POST tarefa
@desc Criar uma tarefa
@access Public 
@endpoint http://localhost:porta/tarefas/cadastro ========= body json
**/
router.post("/cadastro", toDoController.criarTarefa);

/**
@route PUT tarefa
@desc Atualizar uma tarefa
@access Public 
@endpoint http://localhost:porta/tarefas/editar/1
**/
router.put("/editar/:id", toDoController.atualizarTarefa); //lembrar de editar o body no insomnia

/**
@route PATCH tarefa
@desc Atualizar o status da tarefa para concluído
@access Public 
@endpoint http://localhost:porta/tarefas/naoconcluidas/2
**/
router.patch("/naoconcluidas/:id", toDoController.concluirTarefa); //lembrar de editar somente o concluido no body

/**
@route DELETE tarefa
@desc Deletar uma tarefa pelo seu identificador
@access Public 
@endpoint http://localhost:porta/tarefas/1
**/
router.delete("/:id", toDoController.deletarTarefa);

module.exports = router;
