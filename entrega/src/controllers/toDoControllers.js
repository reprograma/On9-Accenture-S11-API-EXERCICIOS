const tasksModels = require('../models/tasks.json');

//GET

const getAllTasks = function (request, response) {
    response.status(200).json({ Tarefas: tasksModels });
}
const getFinishedTasks = (request, response) => {
    const finishedTasks = tasksModels.filter(task => task.concluido == true);
    response.status(200).json({ Concluídas: finishedTasks })
}
const getUnfinishedTasks = (request, response) => {
    const unfinishedTasks = tasksModels.filter(task => task.concluido == false);
    response.status(200).json({ NãoConcluídas: unfinishedTasks })
}
const getByID = function (request, response) {
    const { id } = request.params;
    const task = tasksModels.filter(task => task.id == id)
    response.status(200).json({ TarefaSelecionada: task });
}
module.exports = {
    getAllTasks,
    getFinishedTasks,
    getUnfinishedTasks, 
    getByID
}