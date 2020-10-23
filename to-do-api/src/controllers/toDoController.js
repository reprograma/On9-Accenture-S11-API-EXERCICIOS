const { response, request } = require("express")
const tarefaModels = require("../models/tarefas.json")

const getAll = (request, response) => {
    response.status(200).send(tarefaModels);
}

const getById = (request, response) => {
    const id  = request.params.id
    response.status(200).send(tarefaModels.find(tarefa => tarefa.id == id)); 
}

const getByConcluida = (request, response) => {
    const concluido = request.params.concluido
    if(tarefaAtualizada.concluido == false) {
        response.json({Erro: "Tarefas concluídas não localizadas"})
    } else {
    response.status(200).send(tarefaModels.find(tarefa => tarefa.concluido == concluido)); 
}

const getByNaoConcluida = (request, response) => {
    const concluido = request.params.concluido
    if(tarefaAtualizada.concluido == true) {
        response.json({Erro: "Tarefas não concluídas não localizadas"})
    } else {
        response.status(200).send(tarefaModels.find(tarefa => tarefa.concluido == concluido)); 
    }
}

const criarTarefa = (request, response) => {
    let { concluido, descricao, nomeColaborador} = request.body

    const novaTarefa = {
        id: Math.random().toString(32).substring(2,8),
        dataInclusao: () => new Date().toString(),
        concluido: concluido,
        descricao: descricao,
        nomeColaborador: nomeColaborador   
    }

    tarefaModels.push(novaTarefa);
    response.status(201).json(novaTarefa);
}

const atualizarTarefa = (request, response) => {
    const { id } = request.params;
    const { concluido, descricao, nomeColaborador } = request.body

    const tarefaAtualizada = tarefaModels.find(tarefa => tarefa.id == id);

    if(tarefaAtualizada.concluido == true) {
        response.json({Erro: "Impossível atualizar tarefas concluídas"})
    } else {
        const novaTarefa = {
            id: tarefaAtualizada.id,
            dataInclusao: tarefaAtualizada.dataInclusao,
            concluido: concluido,
            descricao: descricao,
            nomeColaborador: nomeColaborador
    }
    
        const index = tarefaModels.indexOf(tarefaAtualizada)
        tarefaModels[index] = novaTarefa
    }
}

const concluirTarefa = (request, response) => {
    const { id } = request.params;
    const { concluido } = request.body;

    const tarefa = tarefaModels.find(tarefa => tarefa.id == id)

    tarefa.concluido = concluido

    response.status(200).json ({
        mensagem: "Tarefa concluída",
        tarefa
    })
}

const corrigirNomeColaborador = (request, response) => {
    const { id } = request.params;
    const { nomeColaborador } = request.body;

    const tarefa = tarefaModels.find(tarefa => tarefa.id == id)

    tarefa.nomeColaborador = nomeColaborador

    response.status(200).json ({
        mensagem: "Responável atualizado",
        tarefa
    })
}

const deletarTarefa = (request, response) => {
    const { id } = request.params;
    const tarefaFiltrada = tarefaModels.find(tarefa => tarefa.id == id)

    if (tarefaFiltrada.concluido == true) {
        response.json({Erro: "Impossível deletar tarefas concluidas."})
    } else {
        const index = tarefaModels.indexOf(tarefaFiltrada);
        tarefaModels.splice(index, 1);
        
        response.json({mensagem: "tudo certo"});
    } 
 }

module.exports = {
    getAll,
    getById,
    getByConcluida,
    getByNaoConcluida,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    corrigirNomeColaborador,
    concluirTarefa
}}
