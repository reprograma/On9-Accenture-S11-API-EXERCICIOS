const { response, request } = require("express")
const tarefasModels = require("../models/tarefas.json")

const getAll = (request, response)=>{
    response.status(200).send(tarefasModels)
}

const getById = (request, response) =>{
    const {id} = request.params
    const tarefaEncontrada = tarefasModel.find(tarefa => tarefa.id == id)
    response.status(200).send(tarefaEncontrada)
}

const getTarefasConcluidas = (request, response) =>{
    const tarefasConcluidas = tarefasModel.filter(tarefa => tarefa.concluido == true)
    response.status(200).send(tarefasConcluidas)
}

const getTarefasNaoConcluidas = (request, response) =>{
    const tarefasNaoConcluidas = tarefasModel.filter(tarefa => tarefa.concluido == false)
    response.status(200).send(tarefasNaoConcluidas)
}


const criarTarefa = (request, response)=>{
    let { descricao, nomeColaborador } = request.body
    
    const novaTarefa ={
        id: Math.random().toString(32).substr(2,9),
        dataInclusao: new Date().toString(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }

    tarefasModels.push(novaTarefa);

    response.status(201).json(novaTarefa)
}

const atualizarTarefa = (request, response) =>{
    const { id } = request.params //pega o ID na URL
    const { concluido, descricao, nomeColaborador } = request.body //pega os dados enviados pelo usuário no body

    const tarefaAtualizada = tarefasModels.find(tarefa => tarefa.id == id) //procura a tarefa q será atualizada

    if(tarefaAtualizada.concluido == true){
        response.status(400).send({mensagem: "Não é possível atualizar uma tarefa já concluída!" })
    }else{

    const novaTarefa = { //construir o novo objeto editado
        id: tarefaAtualizada.id, //manter o id que já existe
        dataInclusao: tarefaAtualizada.dataInclusao, //manter a data que já existe
        concluido: concluido, //adicionando o valor "concluido" que foi mandado pelo usuario
        descricao: descricao, //adicionando o valor "descricao" que foi mandado pelo usuario
        nomeColaborador: nomeColaborador //adicionando o valor "nomeColaborador" que foi mandado pelo usuario
    }

    const index = tarefasModels.indexOf(tarefaAtualizada) //procuro a posição dentro do JSON do objeto que será atualizado

    tarefasModels[index] = novaTarefa //atribuindo a antiga tarefa a nova que construimos

    response.status(200).json(tarefasModels[index])

}}

const concluirTarefa = (request, response)=>{
    const { id } = request.params //pegando o valor do ID mandado na URL
    const { concluido } = request.body //pegando o valor de "concluido" enviado no Body

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id)//encontrando a tarefa referente ao ID

    tarefa.concluido = concluido//atualizando o campo "concluido" no nosso JSON

    response.status(200).json({
        mensagem: "Tarefa concluída com sucesso!",
        tarefa
    })

}

const corrigirResponsavel = (request, response) =>{
    const {id} = request.params
    const {nomeColaborador} = request.body

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id)

    if(tarefa.concluido == true){
        response.status(204).send({mensagem: "Não é possível corrigir o responsável de uma tarefa já concluída!"})
    }else{
        tarefa.nomeColaborador = nomeColaborador
    }}

const deletarTarefa = (request, response)=>{
    const { id } = request.params
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id)

    if (tarefaFiltrada.concluido == true){
        response.status(204).send({mensagem: "Não é possível deletar uma tarefa que já foi concluída!"})
    }else{
    const index = tarefasModels.indexOf(tarefaFiltrada)
    tarefasModels.splice(index, 1)

    response.json({mensagem: "Tarefa deletada com sucesso"})
    }
}

module.exports ={
    getAll,
    getById,
    getTarefasConcluidas,
    getTarefasNaoConcluidas,
    criarTarefa,
    atualizarTarefa,
    concluirTarefa,
    corrigirResponsavel,
    deletarTarefa
}
