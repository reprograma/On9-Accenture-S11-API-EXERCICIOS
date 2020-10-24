const tarefas = require('../model/tarefasModel.json');
const helper = require('../helpers/helper');

// GET

const getAll = (req, res) => {
    res.status(200).send(tarefas);
}

const getById = (req, res) => {
    const { id } = req.params;
    const localizarTarefa = tarefas.find(tarefa => tarefa.id == id);
    res.status(200).send(localizarTarefa);
}

const getConcluidas = (req, res) => {
    let tarefasConcluidas = []
    for (i = 0; i < tarefas.length; i++) {
        if (tarefas[i].concluido == true) {
            tarefasConcluidas[i] = tarefas[i];
        }
    }

    res.status(200).send(tarefasConcluidas);
}

const getNaoConcluidas = (req, res) => {
    let tarefasNaoConcluidas = []
    for (i = 0; i < tarefas.length; i++) {
        if (tarefas[i].concluido == false) {
            tarefasNaoConcluidas[i] = tarefas[i];
        }
    }

    res.status(200).send(tarefasNaoConcluidas);
}

//POST

const cadastrarTarefa = (req, res) => {
    const { descricao, nomeColaborador } = req.body;

    let novaTarefa = {
        id: Math.random().toString(36).substr(8),
        dataInclusao: helper.dataInicio(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }

    tarefas.push(novaTarefa);
    res.status(200).send(novaTarefa);
}

//PUT
const atualizarTarefa = (req, res) => {
    const { id } = req.params;
    const { concluido, descricao, nomeColaborador } = req.body;

    const index = tarefas.findIndex(tarefa => tarefa.id == id);

    if (tarefas[index].concluido == true) {
        res.status(400).send({ mensagem: "Tarefa já esta concluida, não pode ser atualizada!" })
    }

    let atualizandoTarefa = {
        id: tarefas[index].id,
        dataInclusao: tarefas[index].dataInclusao,
        concluido: concluido,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }

    tarefas[index] = atualizandoTarefa;

    res.status(200).send(atualizandoTarefa);
}

//PATCH

const concluirTarefa = (req, res) => {
    const { id } = req.params;
    const { concluido } = req.body;

    const index = tarefas.findIndex(tarefa => tarefa.id == id);

    if (tarefas[index].concluido == true) {
        res.status(400).send({ mensagem: "Tarefa já esta concluida!" })
    } else {
        tarefas[index].concluido = concluido;
        res.status(200).send(tarefas[index]);
    }
}

const atualizarColaborador = (req, res) => {
    const { id } = req.params;
    const { nomeColaborador } = req.body;

    const index = tarefas.findIndex(tarefa => tarefa.id == id);

    if (tarefas[index].concluido == true) {
        res.status(400).send({ mensagem: "Tarefa já esta concluida!" })
    } else {
        tarefas[index].nomeColaborador = nomeColaborador;
        res.status(200).send(tarefas[index]);
    }
}

// DELETE

const deletarTarefa = (req, res) => {
    const { id } = req.params;
    const index = tarefas.findIndex(tarefa => tarefa.id == id);

    if (tarefas[index].concluido == true) {
        res.status(400).send({ mensagem: "Tarefa não pode ser deletada pois já esta concluida!" })
    } else {
        tarefas.splice(index, 1);
        res.status(200).send({ mensagem: "Tarefa deletada com sucesso !" })

    }


}
module.exports = {
    getAll,
    getById,
    getConcluidas,
    getNaoConcluidas,
    cadastrarTarefa,
    atualizarTarefa,
    concluirTarefa,
    atualizarColaborador,
    deletarTarefa
}