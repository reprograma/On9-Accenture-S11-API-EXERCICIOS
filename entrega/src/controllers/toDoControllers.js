const tasksModels = require('../models/tasks.json');

/*   GET   */
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
    response.status(200).json({ task: task });
}

/*   POST   */
const createTask = (request, response) => {
    const { descricao, nomeColaborador } = request.body;

    const newTask = {
        id: Math.random().toString(32).substr(2, 8),
        dataInclusao: new Date().toString(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }
    tasksModels.push(newTask);
    response.status(200).json({
        mensagem: `Nova Tarefa incluída com sucesso!`,
        tasksModels
    })
}

/*   PUT   */
const updateTask = (request, response) => {

    const { id } = request.params;
    const task = tasksModels.find(task => task.id == id);
    const indice = tasksModels.findIndex(tarefa => tarefa.id == id);

    let { concluido, descricao, nomeColaborador } = request.body;

    task.id = task.id;
    task.dataInclusao = task.dataInclusao;
    task.concluido = concluido;
    task.descricao = descricao;
    task.nomeColaborador = nomeColaborador;

    tasksModels[indice] = task;
    response.status(200).json({
        mensagem: `Tarefa atualizada com sucesso`,
        tasksModels
    });
}

/*  PATCH  */
const updateStatus = (request, response) => {
    const { id } = request.params;
    const { concluido } = request.body;
    const task = tasksModels.find(task => task.id == id);

    if (task.concluido == false) {
        task.concluido = concluido;
        response.status(200).json({
            Mensagem: `Campo atualizado com sucesso`,
            task
        });
    } else {
        response.status(401).send(`Você não pode alterar campos de tarefas que já foram concluídas`);
    }

}
const updateColaborator = (request, response) => {
    const { id } = request.params;
    const { nomeColaborador } = request.body;

    const task = tasksModels.find(task => task.id == id);
    if (task.concluido == false) {
        task.nomeColaborador = nomeColaborador;
        response.status(200).send(task)
    } else {
        response.status(401).json({ mensagem: `Você não pode alterar o colaborador de tarefas que já foram concluídas` })
    }
}

const deleteTask = (request, response) => {
    const { id } = request.params;
    const task = tasksModels.find(task => task.id == id);
    const index = tasksModels.indexOf(task);

    if (task.concluido == false) {
        tasksModels.splice(index, 1);
        response.status(200).json({
            mensagem: `Tarefa deletada com sucesso`,
            tasksModels
        })

    } else {
        response.status(401).json({ Erro: `Você não pode deletar tarefas já concluídas` })
    }
}

module.exports = {
    getAllTasks,
    getFinishedTasks,
    getUnfinishedTasks,
    getByID,
    createTask,
    updateTask,
    updateStatus,
    updateColaborator,
    deleteTask    

}