
const tarefasModels = require("../models/tarefas.json")

//GET para mostrar todas as tarefas
const getAll = (request, response)=>{
    
    response.status(200).send(tarefasModels)
}

//GET mostrar tarefa pelo ID
const tarefaUnica = (request, response)=>{
    const { id } = request.params

    const umaTarefa = tarefasModels.find(tarefa=> tarefa.id == id)

    response.status(200).send(umaTarefa)
}

//GET mostrar tarefas concluidas
const tarefaConcluida = (request, response)=>{
const concluidas = []
const lista = tarefasModels.filter(tarefa=> tarefa.concluido == true)
concluidas.push(lista)

response.status(200).send(concluidas)
    
}

//GET mostrar tarefas não concluidas
const tarefaNaoConcluida = (request, response)=>{
    const naoConcluidas = []
    const listaTotal = tarefasModels.filter(tarefa=> tarefa.concluido == false)

    naoConcluidas.push(listaTotal)

    response.status(200).send(naoConcluidas)
}

// POST criar nova tarefa
const criarTarefa = (request, response)=>{
    let {descricao, nomeColaborador} = request.body

    const novaTarefa ={
        id: Math.random().toString(32).substr(2,9),
        dataInclusao: new Date().toString(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }
    tarefasModels.push(novaTarefa)

    response.status(201).json(novaTarefa)

}

// PUT atualizar toda tarefa
const atualizarTarefa = (request, response)=>{
    const{ id } = request.params // pega o ID na URL
    const {concluido, descricao, nomeColaborador} = request.body // pega os dados enviados pelo usuário no body

    const tarefaAtualizada = tarefasModels.find(tarefa=> tarefa.id == id) //procura a tarefa que será atualizada

    if(tarefaAtualizada.concluido == true){
        response.json({Erro: "Não é possível atualizar uma tarefa concluída"})
    } else {
        const novaTarefa = { //construir o novo objeto editado
            id: tarefaAtualizada.id, //manter o ID que já existe
            dataInclusao: tarefaAtualizada.dataInclusao, // manter a data que já existe
            concluido: concluido, // adicionando o valor "concluido" que foi mandado pelo usuario
            descricao: descricao, // adicionando o valor "descricao" que foi mandado pelo usuario
            nomeColaborador: nomeColaborador // adicionando o valor "nomeColaborador" que foi mandado pelo usuario
        }
        
        const index = tarefasModels.indexOf(tarefaAtualizada) //procuro a posição dentro do JSON do objeto que será atualizado
    
        tarefasModels[index] = novaTarefa // atribuindo a antiga tarefa que construimos
    
        response.status(200).json(tarefasModels)
    }
}

//PATCH atualizar concluido
const concluirTarefa = (request, response)=>{
    const {id} = request.params // pegando o valor do ID que foi mandado na URL
    const {concluido} = request.body // pegando o valor de "concluido" enviado no body

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id) //encontrando a tarefa referente ao ID

    tarefa.concluido = concluido // atualizando o campo "concluido" no nosso JSON

    response.status(200).json({ // mostrando ao usario que foi atualizado e como ficou no total
        mensagem: "Tarefa concluída!",
        tarefa
    })
}

//PATCH atualiza nome colaborador
const atualizarColaborador = (request, response)=>{
    const { id } = request.params
    const { nomeColaborador } = request.body
    

    const tarefas = tarefasModels.find(tarefas=> tarefas.id == id)

    tarefas.nomeColaborador = nomeColaborador
    
        response.status(200).json({
            mensagem: "Nome do responsável atualizado",
        })
    }

const deletarTarefa = (request, response) =>{
    const { id } = request.params
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id)
    
    //Validação para impedir a deleção de uma tarefa concluída
    if(tarefaFiltrada.concluido == true){
        response.json({Erro: "Impossível deletar uma tarefa já concluída"})
    } else {
        const index = tarefasModels.indexOf(tarefaFiltrada)
        tarefasModels.splice(index, 1)

        response.json({mensagem: "Tarefa deletada com sucesso!"})
    }
}

module.exports = {
    getAll,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa,
    atualizarColaborador,
    tarefaUnica,
    tarefaConcluida,
    tarefaNaoConcluida
}