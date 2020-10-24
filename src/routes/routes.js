const controller = require('../controller/tarefasController');

const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);

router.get('/concluidas', controller.getConcluidas);

router.get('/naoconcluidas', controller.getNaoConcluidas);

router.get('/:id', controller.getById);

router.post('/cadastro', controller.cadastrarTarefa);

router.put('/editar/:id', controller.atualizarTarefa);

router.patch('/naoconcluidas/:id', controller.concluirTarefa);

router.patch('/naoconcluidas/colaborador/:id', controller.atualizarColaborador);

router.delete('/:id', controller.deletarTarefa);

module.exports = router;