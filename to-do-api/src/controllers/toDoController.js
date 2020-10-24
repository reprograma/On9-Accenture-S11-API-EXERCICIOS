const { response } = require("express");
const tarefasModel = require("../models/tarejas.json");

//GETs

const getAll = (req, res) =>{
    res.status(200).send(tarefasModel)
}

const getById = (req, res) => {
    const { id } = req.params;
    const localizarTarefa = tarefasModel.find(tarefa => tarefa.id == id);
    res.status(200).send(localizarTarefa);
}

const getDone = (req, res) => {
    const { concluido } = req.body;
    const tarefasConcluidas = tarefasModel.filter(tarefa => tarefa.concluido == true);
    res.status(200).send(tarefasConcluidas);
}

const getNotDone = (req, res) => {
    const { concluido } = req.body;
    const tarefasNaoConcluidas = tarefasModel.filter(tarefa => tarefa.concluido == false);
    res.status(200).send(tarefasNaoConcluidas);
    }



//Post

const createTarefas = (req, res) =>{
    let {concluido, descricao, nomeColaborador} = req.body;

    const novaTarefa = {
        id: Math.random().toString(10).substr(2-10),
        dataInclusao: new Date().toString(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }
    
    tarefasModel.push(novaTarefa);
    res.status(201).json(novaTarefa)
}
//PUT

const updateTarefa = (req, res) =>{
    const {id} = req.params;
    const {concluido, descricao, nomeColaborador} = req.body;
    const tarefatoUpdate = tarefasModel.find(tarefa => tarefa.id === id);  
    
    if(tarefatoUpdate.concluido == true){
        res.json("Impossível atualizar uma tarefa concluída")
    } else {
        const newTarefa = {
            id: tarefatoUpdate.id,
            dataInclusao:tarefatoUpdate.dataInclusao,
            concluido: concluido,
            descricao: descricao,
            nomeColaborador: nomeColaborador
        }
    
        const index = tarefasModel.indexOf(tarefatoUpdate)
        tarefasModel[index] = newTarefa;
        res.status(200).json(tarefasModel[index])
    }

    

}

//Patch

const completeTarefa = (req, res) => {
    const { id } = req.params;
    const { concluido } = req.body;

    const index = tarefasModel.findIndex(tarefa => tarefa.id == id);

    if (tarefasModel[index].concluido == true) {
        res.status(400).send({ Erro: "Não é possível alterar tarefas concluídas!" })
    } else {
        tarefasModel[index].concluido = concluido;
        res.status(200).send(tarefasModel[index]);
    }
}

const updateColaborador = (req, res) => {
    const { id } = req.params;
    const { nomeColaborador } = req.body;

    const index = tarefasModel.findIndex(tarefa => tarefa.id == id);

    if (tarefasModel[index].concluido == true) {
        res.status(400).send({ Erro: "Não é possível alterar tarefas concluídas!" })
    } else {
        tarefasModel[index].nomeColaborador = nomeColaborador;
        res.status(200).send(tarefasModel[index]);
    }
}

//Delete
const deleteTarefa = (req, res) => {
    const {id} = req.params;
    const tarefaFiltrada = tarefasModel.find(tarefa => tarefa.id === id);
    
    if(tarefaFiltrada.concluido == true){
        res.json({Erro: "Impossível deletar tarefas concluídas!"})

    }else {
        const index = tarefasModel.indexOf(tarefaFiltrada);
        tarefasModel.splice(index, 1);
        res.json({mensagem: "Tarefa deletada com sucesso!"})

    }

    
}



module.exports = {
    getAll,
    getById,
    getDone,
    getNotDone,
    createTarefas,
    deleteTarefa,
    updateTarefa,
    completeTarefa,
    updateColaborador

}