const { response, request } = require("express")
const tarefasModels = require("../models/tarefas.json")

const getAll = (request, response)=>{
    response.status(200).send(tarefasModels)
}

const getById = (request, response) =>{
    const {id} = request.params
    const tarefaFiltrada = tarefasModels.find(tarefa =>tarefa.id == id)
    response.status(200).send(tarefaFiltrada)
}

const getConcluidos = (request, response) => {
    const tarefaConcluida = tarefasModels.filter(tarefa => tarefa.concluido == true)
    response.status(200).send(tarefaConcluida)
}


const getNaoConcluidos = (request, response) => {
    const tarefaNaoConcluida = tarefasModels.filter(tarefa => tarefa.concluido == false)
    response.status(200).send(tarefaNaoConcluida)
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
    const { id } = request.params //pega id na url
    const { concluido, descricao, nomeColaborador} = request.body //pega os dados que o user digitou no body
    
    
    const tarefaAtualizada = tarefasModel.find(tarefa => tarefa.id == id) // procura a tarefa

    if(tarefaAtualizada.concluido == true){
        response.json({Erro: "Impossivel atualizar tarefa atualizada"})
    } else {
        const novaTarefa = { //construir o novo objeto editado
            id: tarefaAtualizada.id, //mantendo id existente
            dataInclusao: tarefaAtualizada.dataInclusao, //mantendo id existente
            concluido: concluido, //adicionando o valor enviado pelo user
            descricao: descricao,
            nomeColaborador: nomeColaborador
        }

        const index = tarefasModel.indexOf(tarefaAtualizada) //procuro a posiçao dentro do json do objeto q sera atualizado 

        tarefasModel[index] = novaTarefa // atribuindo a antiga tarefa à nova construida

        response.status(200).json(tarefasModel[index])
    }
}

const concluirTarefa = (request,response) =>{
    const { id } = request.params
    const { concluido } = request.body

    const tarefa = tarefasModel.find(tarefa => tarefa.id == id)

    tarefa.concluido = concluido

    response.status(200).json({         
        mensagem: "tarefa concluida",
        tarefa
    })
}

const alterarColaborador = (request,response) =>{
    const { id } = request.params
    const { nomeColaborador } = request.body

    const tarefa = tarefasModel.find(tarefa => tarefa.id == id)

    tarefa.nomeColaborador = nomeColaborador

    response.status(200).json({         
        mensagem: "Colaborador alterado",
        tarefa
    })
}

const deletarTarefa = (request, response) =>{
    const { id } = request.params
    const tarefaFiltrada = tarefasModel.find(tarefa => tarefa.id == id)

    if (tarefaFiltrada.concluido == true){
        response.json({Erro: "Impossivel deletar tarefas concluidas"})
    } else {
        const index = tarefasModel.indexOf(tarefaFiltrada)
        tarefasModel.splice(index,1)
        
        response.json({mensagem: "Tarefa deletada com sucesso"})
    }

}

module.exports ={
    getAll,
    getConcluidos,
    getNaoConcluidos,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    alterarColaborador,
    concluirTarefa,
    getById,
}