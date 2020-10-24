const tarefasModels = require("../models/tarefas.json")

const getAll = (request, response) =>{
    response.status(200).send(tarefasModels)
}

const getID =  (request,response) =>{
    const{id} = request.params
    const tarefaEscolhida = tarefasModels.find(tarefa => tarefa.id == id);
    response.status(200).send(tarefaEscolhida)
}

const getTarefaConcluida = (request,response) =>{
    const tarefasConcluidas = tarefasModels.filter(tarefa => tarefa.concluido == true);
    response.status(200).send(tarefasConcluidas)
    
}

const getTarefaNaoConcluida = (request, response) =>{
    const tarefasNaoConcluidas = tarefasModels.filter(tarefa => tarefa.concluido == false);
    response.status(200).send(tarefasNaoConcluidas)
}

const criarTarefa = (request,response) =>{
    let {descricao,nomeColaborador} = request.body

    const novaTarefa = {
        id: Math.random().toString(32).substr(2,9),
        dataInclusao: new Date().toString(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }

    tarefasModels.push(novaTarefa)

    response.status(201).json(novaTarefa)
    
}

const atualizarTarefa = (request, response) =>{
    const {id} = request.params // pega o ID na URL
    const {concluido, descricao, nomeColaborador} = request.body // pega os dados enviados pelo usuario no body

    const tarefaAtualizada = tarefasModels.find(tarefa => tarefa.id == id) //procura a tarefa que sera atualizada

    if(tarefaAtualizada.concluido == true){
        response.json({Erro: "Impossível atualizar tarefas concluidas"})
    } else {
        const novaTarefa = { // construir o novo objeto editado
            id: tarefaAtualizada.id, // manter o id que ja existe
            dataInclusao: tarefaAtualizada.dataInclusao, // manter a dataInclusao que ja existe
            concluido: concluido, // adicionando o valor "concluido" que foi mandando pelo usuario
            descricao: descricao, // adicionando o valor "descricao" que foi mandando pelo usuario
            nomeColaborador: nomeColaborador // adicionando o valor "nomeColaborador" que foi mandado pelo usuario
        }
    
        const index = tarefasModels.indexOf(tarefaAtualizada) //procuro a posição dentro do JSON do objeto que sera atualizado
    
        tarefasModels[index] = novaTarefa //atribuindo a antiga tarefa a nova que construimos
    
        response.status(200).json(tarefasModels[index])


    }
 
}

const concluirTarefa = (request,response) =>{
    const {id} = request.params // pegando o valor do ID mandado na URL
    const {concluido} = request.body // pega o valor de "concluido" enviado no Body

    const tarefa =  tarefasModels.find(tarefa => tarefa.id == id) // encontrando a tarefa referente pelo ID

    if(tarefa.concluido == true){
        response.json({Erro: "Impossível atualizar uma tarefa que já foi concluida"})
    }else {   
    tarefa.concluido = concluido // atualizando o campo "concluido" no nosso JSON
    }    
    response.status(200).json({
        mensagem:"Tarefa Concluida",
        tarefa
    })

}

const corrigirResponsavel = (request,response) =>{
    const {id} = request.params
    const {nomeColaborador} = request.body

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id)

    if(tarefa.concluido == true){
        response.json({Erro: "Impossível atualizar uma tarefa que já foi concluida"})
    }else{    
    tarefa.nomeColaborador = nomeColaborador
    }

    response.status(200).json({
        mensagem: "Nome do Colaborador foi modificado",
        tarefa
    })
}



const deletarTarefa = (request,response) =>{
    const {id} = request.params
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id)

    if (tarefaFiltrada.concluido == true){
        response.json({Erro: "Impossível deletar tarefas concluidas"})
    } else {
        const index = tarefasModels.indexOf(tarefaFiltrada) 
        tarefasModels.splice(index, 1)
     
        response.json({mensagem: "tarefa deletada com sucesso"}) 
    }

    
}

module.exports = {
    getAll,
    getID,
    getTarefaConcluida,
    getTarefaNaoConcluida,
    criarTarefa,
    atualizarTarefa,
    concluirTarefa,
    corrigirResponsavel,
    deletarTarefa
    
}