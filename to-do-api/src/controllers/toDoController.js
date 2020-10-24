const tarefasModels = require("../models/tarefas.json")

const getAll = (req, res)=>{
    res.status(200).send(tarefasModels)
}

const getId = (req, res)=>{
    const {id} = req.params
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id)

    res.status(200).json(tarefaFiltrada)
}
// a constante a seguir filtra por tarefas concluidas e não concluidas usando uma só rota
// const getStatus = (req, res)=>{
//     const {concluido} = req.query
//     let status = false
//     console.log(concluido)
//     if(concluido == "false"){
//         status = false
//     }else{
//         status = true
//     }
//     const tarefasFiltradas = tarefasModels.filter(tarefa => tarefa.concluido == status)
//     res.status(200).json(tarefasFiltradas)
// }
const getCompleted = (req, res) =>{
    const tarefasConcluidas = tarefasModels.filter(tarefa => tarefa.concluido == true)
    res.status(200).json(tarefasConcluidas)
}

const getUnCompleted = (req, res)=>{
    const tarefasNaoConcluidas = tarefasModels.filter(tarefa => tarefa.concluido == false)
    res.status(200).json(tarefasNaoConcluidas)
}

const criarTarefa = (req, res) =>{
    let{descricao, nomeColaborador} = req.body
    const novaTarefa = {
        id: Math.random().toString(32).substr(2.8),
        dataInclusao: new Date().toString(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }

    tarefasModels.push(novaTarefa);
    
    res.status(201).json(novaTarefa)
}

const atualizarTarefa = (req, res) =>{
    const {id} = req.params
    const {concluido, descricao, nomeColaborador} = req.body

    const tarefaAtualizada = tarefasModels.find(tarefa => tarefa.id == id)
    
    const novaTarefa = {
        id: tarefaAtualizada.id,
        dataInclusao: tarefaAtualizada.dataInclusao,
        concluido: concluido,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }
    if(tarefaAtualizada.concluido == true){
        res.send("impossível atualizar tarefa")
    } else{
    const index = tarefasModels.indexOf(tarefaAtualizada)
    tarefasModels[index] = novaTarefa
    res.status(200).json(tarefasModels[index])
    }
}

const concluirTarefa = (req, res) =>{
    const {id} = req.params
    const {concluido} = req.body

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id)
    
    tarefa.concluido = concluido

    res.status(200).json({mensagem: "tarefa concluida",
    tarefa
})
}

const deletarTarefa = (req, res) =>{
    const {id} = req.params
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id)

    if(tarefaFiltrada.concluido == true){
        res.send("impossível deletar tarefa")
    } else{
        const index = tarefasModels.indexOf(tarefaFiltrada)
        tarefasModels.splice(index,1)
        res.send("tarefa deletada")
    }

}
module.exports = {
    getAll,
    getId,
  //getStatus,
    getCompleted,
    getUnCompleted,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa, 
    atualizarTarefa,
    concluirTarefa
}