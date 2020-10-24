const { response, request } = require("express")
const tarefasModels = require("../models/tarefas.json")

const getAll = (request, response)=>{
    response.status(200).send(tarefasModels)
}

const criarTarefa = (request, response)=>{
    let { descricao, nomeColaborador } = request.body  //o que o usuário vai digitar
    
    const novaTarefa ={
        id: Math.random().toString(32).substr(2,9), //para vir um id aleatorio math.random, to string é o numero max que virá, substr
        dataInclusao: new Date().toString(), //uma função nativa que pega a hora e a data do pc do usuário e o tostring é pra vir em string e o subst é o tamanho da string que virá
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }

    tarefasModels.push(novaTarefa); //inserindo a nova tarefa na lista de tarefas

    response.status(201).json(novaTarefa) //enviando a nova tarefa como response
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

const deletarTarefa = (request, response)=>{
    const { id } = request.params //desestruturando o id que vai receber uma req pelos params passados na url
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id)  //filtrando as tarefas com find para ele retornar o que eu pedi (id)

    const index = tarefasModels.indexOf(tarefaFiltrada)
    tarefasModels.splice(index, 1)

    response.json({mensagem: "Tarefa deletada com sucesso"})
}

module.exports ={
    getAll,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa
}