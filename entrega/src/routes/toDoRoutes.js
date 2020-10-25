const express = require('express');
const router = express.Router();

const controller = require('../controllers/toDoControllers');

router.get('/', controller.getAllTasks);
router.get('/concluidas', controller.getFinishedTasks);
router.get('/naoconcluidas', controller.getUnfinishedTasks);
router.get('/:id', controller.getByID);


module.exports = router;
