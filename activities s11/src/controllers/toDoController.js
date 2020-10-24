const { response } = require("express");
const { request } = require("../app");
const tarefasModels = require("../models/tarefas.json");


//get
const getAll = (request, response) => {
    response.status(200).send(tarefasModels);
}

const getById = (request, response) => {
    const { id } = request.params;

    const tarefaById = tarefasModels.find(tarefa => tarefa.id == id);

    response.status(200).json(tarefaById);
}

const getCompleted = (request, response) => {
    const { concluido } = request.body;

    const completedToDo = tarefasModels.filter(tarefa => tarefa.concluido == true);

    response.status(200).send(completedToDo);
}

const getUncompleted = (request, response) => {
    const { concluido } = request.body;
    
    const uncompletedToDo = tarefasModels.filter(tarefa => tarefa.concluido == false);

    response.status(200).send(uncompletedToDo);
}


//post
const criarTarefa = (request, response) => {
    let { descricao, nomeColaborador } = request.body

    const novaTarefa = {
        id: Math.random().toString(32).substr(2,8),
        dataInclusao: new Date().toString(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }

    tarefasModels.push(novaTarefa);

    response.status(201).json(novaTarefa);

}


//put
const atualizarTarefa = (request, response) => {
    const { id } = request.params;
    const { concluido, descricao, nomeColaborador } = request.body

    const tarefaAtualizada = tarefasModels.find(tarefa => tarefa.id == id);

    if (tarefaAtualizada.concluido == true) {
        response.json({Erro: "impossível atualizar tarefas concluídas."})
    } else {
        const novaTarefa = {
        id: tarefaAtualizada.id, //mantendo o id que ja existe
        dataInclusao: tarefaAtualizada.dataInclusao, //mantendo a data que ja existe
        concluido: concluido,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }

    const index = tarefasModels.indexOf(tarefaAtualizada);

    tarefasModels[index] = novaTarefa;

    response.status(200).json(tarefasModels[index]);
    
    }

}


//patch
const concluirTarefa = (request, response) => {
    const { id } = request.params;
    const { concluido } = request.body;

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id);

    tarefa.concluido = concluido;
    
    response.status(200).json({
        mensagem:"tarefa concluída",
        tarefa
    })
}


//delete
const deletarTarefa = (request, response) => {
    const { id } = request.params;
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id);

    if (tarefaFiltrada.concluido == true) {
        response.json({Erro: "impossível deletar tarefas concluídas."})
    } else {
        const index = tarefasModels.indexOf(tarefaFiltrada);
        tarefasModels.splice(index, 1);

        response.json({mensagem: "tudo certo!"});
    }

    
}


module.exports = {
    getAll,
    getById,
    getCompleted,
    getUncompleted,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa
}