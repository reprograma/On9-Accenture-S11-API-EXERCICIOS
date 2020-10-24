const tarefasModels = require("../models/tarefas.json")

const getAll = (request, response) =>{
    response.status(200).send(tarefasModels)
}

const criarTarefa = (request, response) =>{
    let {descricao, nomeColaborador} = request.body

    const novaTarefa ={
        id: Math.random().toString(32).substr(2,9),
        dataInclusao: () => new Date().toString(),
        concluido: false,
        decricao: descricao,
        nomeColaborador: nomeColaborador
    }

    tarefasModels.push(novaTarefa)

    
    response.status(201).json(novaTarefa)
}

const atualizarTarefa = (request, response) =>{
    const {id} = request.params //pega o ID na URL
    const {concluido, descricao, nomeColaborador} = request.body //pega os dados enviados pelo usuário no body

    const tarefaAtualizada = tarefasModels.find(tarefa => tarefa.id == id) //procura a tarefa atualizada
    
    
    if(tarefaAtualizada.concluido == true){
        response.json({Erro: "Impossivel atualizar tarefas concluidas"})
    } else{
        const novaTarefa = { //construir o novo objeto editado
            id: tarefaAtualizada.id, //manter o id que já existe
            dataInclusao: tarefaAtualizada.dataInclusao, //manter a data que já existe
            concluido: concluido, //adicionando o valor "concluido" que foi mandado pelo usuario
            descricao: descricao, //adicionando o valor "descricao" que foi mandado pelo usuario
            nomeColaborador: nomeColaborador //adicionando o valor "nomeColaborador" que foi mandado pelo usuario
        }

    const index = tarefasModels.indexOf(tarefaAtualizada) // procuro a posicao dentro do JSON do objeto que sera atualizado

    tarefasModels[index] = novaTarefa // atribuindo a antiga tarefa a nova que construimos

    response.status(200).json(tarefaAtualizada)

    }

}

const concluirTarefa = (request, response) =>{
    const {id} = request.params //pegando o valor do ID mandado na URL
    const {concluido} = request.body //pegando o valor de "concluido" enviado no Body

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id) //encontrando a tarefa referente ao ID

    if(tarefaConcluida.concluido == true){
        response.json({Erro: "Impossivel editar tarefas concluidas"})
    } else{
        response.json({
            mensagem: "Tarefas concluidas editadas com sucesso"})
    }

    tarefa.concluido = concluido // atualizando o campo "concluido" no nosso JSON

    response.status(200).json

}

const deletarTarefa = (request, response) =>{

    const {id} = request.params
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id)

    if(tarefaFiltrada.concluido == true){
        response.json({Erro: "Impossivel deletar tarefas concluidas"})
    } else {
        const index = tarefasModels.indexOf(tarefaFiltrada)
        tarefasModels.splice(index, 1)

        response.json({mensagem: "Tarefa deletada com sucesso"})
    }


}

module.exports ={
     getAll,
     criarTarefa,
     deletarTarefa,
     atualizarTarefa,
     concluirTarefa
 }