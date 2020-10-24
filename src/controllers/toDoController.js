const tarefasModels = require("../models/tarefas.json");

const getAll = (req, res) => {
    res.status(200).send(tarefasModels);
}

const getById = (req, res) => {
    const { id } = req.params;
    const tarefa = tarefaModel.find(tarefa => tarefa.id == id);
    res.status(200).json(tarefa);
}

const getTarefaConcluida = (req, res) => {
    const { concluido } = req.body;
    tarefa.concluido = concluido;

    const tarefaConcluida = tarefaModel.filter(tarefa => tarefa.concluido == true);
    res.status(200).json(tarefaConcluida);
}

const getTarefaNaoConcluida = (req, res) => {
    const { concluido } = req.body;
    tarefa.concluido = concluido;

    const tareNaofaConcluida = tarefaModel.filter(tarefa => tarefa.concluido == false);
    res.status(200).json(tareNaofaConcluida);
}

const criarTarefa = (req, res) => {
    let { descricao, nomeColaborador } = req.body;

    const novaTarefa = {
        id: Math.random().toString(32).substr(2,8),
        dataInclusao: new Date().toString(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }

    tarefasModels.push(novaTarefa);

    res.status(201).json(novaTarefa);
    console.log(novaTarefa)
}

const atualizarTarefa = (req, res) => {
    const { id } = req.params; //pega o id da url
    const { concluido, descricao, nomeColaborador } = req.body; //pega os dados enviados pelo usuario no body

    const tarefaAtualizada = tarefasModels.find(tarefa => tarefa.id == id); //procura a tarefaque será atualizada, compara o que o usuario digitou com o que tem no json

    const novaTarefa = { //construir o novo objeto editado
        id: tarefaAtualizada.id, //manter id que já existe na tarefa que pegou para atualizar
        dataInclusao: tarefaAtualizada.dataInclusao, //manter data que já existe
        concluido: concluido,//adicionando o valor "concluido" que foi mandado pelo usuario
        descricao: descricao,//adicionando o valor "descricao" que foi mandado pelo usuario
        nomeColaborador: nomeColaborador//adicionando o valor "nomeColaborador" que foi mandado pelo usuario
    }

    const index = tarefasModels.indexOf(tarefaAtualizada);//procuro a posição dentro do JSON do objeto que sera atualizado

    tarefasModels[index] = novaTarefa; //dentro do model a posição que encontrei na const index será atribuida a nova que construimos

    res.status(200).json(tarefasModels[index]);
}

const concluirTarefa = (req, res) => {
    const { id } = req.params;//pega o valor do id da url
    const { concluido } = req.body;//pega valor do "concluido" enviado no body

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id);

    tarefa.concluido = concluido;//atualiza o campo "concluido" no nosso JSON

    res.status(200).json({ message: "Tarefa atualizada com sucesso", tarefa});
}

const deletarTarefa = (req, res) => {
    const { id } = req.params;
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id);

    const index = tarefasModels.indexOf(tarefaFiltrada);

    tarefasModels.splice(index, 1);

    res.json({ message: `Tarefa deletada com sucesso`});
}

module.exports = {
    getAll,
    getById,
    getTarefaConcluida,
    getTarefaNaoConcluida,
    criarTarefa,
    atualizarTarefa,
    concluirTarefa,
    deletarTarefa
}