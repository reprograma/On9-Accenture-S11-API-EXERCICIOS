const express = require('express');
const router = express.Router();

const controller = require('../controllers/toDoControllers');

//GET
router.get('/', controller.getAllTasks);
router.get('/concluidas', controller.getFinishedTasks);
router.get('/naoconcluidas', controller.getUnfinishedTasks);
router.get('/:id', controller.getByID);

//POST
router.post('/cadastro', controller.createTask);

//PUT
router.put('/editar/:id', controller.updateTask)


module.exports = router;