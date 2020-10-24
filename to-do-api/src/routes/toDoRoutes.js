const express = require('express');
const router = express.Router();

const tarefasController = require('../controllers/toDoController');

//@desc GET -  trazer todas as tarefas no json
router.get('/', tarefasController.getAll);
//@desc GET -  trazer todas as tarefas no json pelo id
router.get('/:id', tarefasController.getById);
//@desc GET -  trazer todas as tarefas no json com o status concluído
router.get('/done', tarefasController.getDone);
//@desc GET -  trazer todas as tarefas no json com o status não concluído
router.get('/notdone', tarefasController.getNotDone);
//@desc POST - Criar tarefa
router.post('/cadastro', tarefasController.createTarefas)
//@desc PUT atualiza os dados
router.put('/editar/:id', tarefasController.updateTarefa)
//@desc PATCH atualiza o colaborador 
router.patch('/notdone/colaborador/:id', tarefasController.updateColaborador)
//@desc PATCH Atualiza o status para completado
router.patch('/notdone/:id', tarefasController.completeTarefa)
//@desc DELETE
router.delete('/:id', tarefasController.deleteTarefa)


module.exports = router;