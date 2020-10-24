const { response, request } = require("express")
const tarefasModels = require("../models/tarefas.json")

const getAll = (request, response)=>{
    response.status(200).send(tarefasModels)
}

const getById = (request, response) => {
    const { id } = req.params;
    const tarefa = tarefaModel.find(tarefa => tarefa.id == id);
    res.status(200).json(tarefa);
}


const getTarefaConcluida = (request, response) => {
    const { concluido } = req.body;
    tarefa.concluido = concluido;

    const tarefaConcluida = tarefaModel.filter(tarefa => tarefa.concluido == true);
    res.status(200).json(tarefaConcluida);
}

const getTarefaNaoConcluida = (request, response) => {
    const { concluido } = req.body;
    tarefa.concluido = concluido;

    const tareNaofaConcluida = tarefaModel.filter(tarefa => tarefa.concluido == false);
    res.status(200).json(tareNaofaConcluida);
}

const atualizarTarefa = (request, response) =>{
    const { id } = request.params //pega o ID na URL
    const { concluido, descricao, nomeColaborador } = request.body //pega os dados enviados pelo usuário no body

    const tarefaAtualizada = tarefasModels.find(tarefa => tarefa.id == id) //procura a tarefa q será atualizada

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

}

const concluirTarefa = (request, response)=>{
    const { id } = request.params //pegando o valor do ID mandado na URL
    const { concluido } = request.body //pegando o valor de "concluido" enviado no Body

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id)//encontrando a tarefa referente ao ID

    tarefa.concluido = concluido//atualizando o campo "concluido" no nosso JSON

    response.status(200).json({
        mensagem: "Tarefa concluida",
        tarefa
    })

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



const criarpublicacao = (request, response) =>{
    const { dataInclusao, concluido, descricao, nomeColaborador} = request.body
    console.log(descricao)

    for(let i=0; i < descricao.length; i++){
        console.log(descricao[i])
    
    }

    const novaPublicacao ={
        id: Math.random().toString(32).substr(1, 2),
        titulo: titulo,
        conteudo: conteudo
    }
}

const deletarTarefa = (request, response)=>{
    const { id } = request.params
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id)

    const index = tarefasModels.indexOf(tarefaFiltrada)
    tarefasModels.splice(index, 1)

    response.json({mensagem: "Tarefa deletada com sucesso"})
}


module.exports={
    getAll,
    getById,
    getTarefaConcluida,
    getTarefaNaoConcluida,
    atualizarTarefa,
    concluirTarefa,
    criarTarefa,
    criarpublicacao,
    deletarTarefa,
}
