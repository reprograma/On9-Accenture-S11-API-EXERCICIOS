const tarefasModels =require("../models/tarefas.json");

const getAll = (request, response) => {
    response.status(200).send(tarefasModels);
}

// Retornar tarefa por ID
const getById = (req, res) => {
    const { id } = req.params // pega o id passado pelo usuário na rota
    res.status(200).send(tarefasModels.find(tarefa => tarefa.id == id))
}

// Retornar tarefas concluídas
const getConcluida = (req, res) => {
    const tarefasConcluidas = tarefasModels.filter(tarefa => tarefa.concluido == true)
    res.status(200).send(tarefasConcluidas)
}

// Retornar tarefas não concluídas
const getNaoConcluida = (req, res) => {
    const tarefasNaoConcluidas = tarefasModels.filter(tarefa => tarefa.concluido == false)
    res.status(200).send(tarefasNaoConcluidas)
}

const criarTarefa = (request, response) => {
    let {descricao, nomeColaborador} = request.body;

    const novaTarefa = {
        id: Math.random().toString(32).substr(2,8),
        dataInclusao: new Date().toString(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador 
    } 

    tarefasModels.push(novaTarefa);

    response.status(201).send(tarefasModels);
}

const atualizarTarefa = (request, response) => {
    const { id } = request.params; //pega o ID na URL
    const {concluido, descricao, nomeColaborador} = request.body; //pega os dados enviados

    const tarefaAtualizada = tarefasModels.find(tarefa => tarefa.id ==id); //procurando a tarefa que sera atualizada

    if(tarefaAtualizada.concluido == true){
        response.json({Erro: "Impossível atualizar tarefa concluída!"});
    } else {
        const novaTarefa = { //construir o novo objeto editado
        id: tarefaAtualizada.id, //manter o id que já existe
        dataInclusao: tarefaAtualizada.dataInclusao, //manter a data que já xiste
        concluido: concluido, //adicionando o campo "concluido" que foi mandado pelo usuario
        descricao: descricao, //adicionando o valor "descricao" que foi mandado pelo usuario
        nomeColaborador: nomeColaborador //adicionando o valor "nomeColaborador" que foi modificado
    }
    const index = tarefasModels.indexOf(tarefaAtualizada); //procura a posição do json do objeto que será modificado
    tarefasModels[index] = novaTarefa; //atribuindo a antiga tarefa a nova que construimos
    response.status(200).json(tarefasModels[index]);
    } 
}

const concluirTarefa = (request, response) => {
    const {id} = request.params;
    const {concluido} = request.body;

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id);

    tarefa.concluido = concluido;

    response.status(200).json({
        mensagem: "Tarefa concluida",
        tarefa
    })

}

const deletarTarefa = (request, response) => {
    const {id} = request.params;
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id);

    if (tarefaFiltrada.concluido == true) {
        response.json({Erro: "Impossível deletar tarefa concluída"});
    } else {
        const index = tarefasModels.indexOf(tarefaFiltrada);
        tarefasModels.splice(index, 1);

        response.json({mensagem: "Tarefa deletada com sucesso!"});
    }
}

module.exports = {
    getAll,
    getById,
    getConcluida,
    getNaoConcluida,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa,
}