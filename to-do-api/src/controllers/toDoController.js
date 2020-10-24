const tarefasModels = require("../models/tarefas.json");
const helper = require("../helpers/helpers");

//GET
const getAll = (request, response) => {
  response.status(200).send(tarefasModels);
};

//GET
const obterPorId = (requisicao, resposta) => {
  const { id } = requisicao.params;
  const tarefa = tarefasModels.find((tarefa) => tarefa.id == id);

  resposta.json(tarefa);
};

//GET
const obterConcluidas = (requisicao, resposta) => {
  const tarefasConcluidas = tarefasModels.filter(
    (tarefa) => tarefa.concluido == true
  );

  resposta.status(200).json(tarefasConcluidas);
};

//GET
const obterPendentes = (requisicao, resposta) => {
  const tarefasPendentes = tarefasModels.filter(
    (tarefa) => tarefa.concluido == false
  );

  resposta.status(200).json(tarefasPendentes);
};

//POST
const criarTarefa = (request, response) => {
  let { descricao, nomeColaborador } = request.body;

  const novaTarefa = {
    id: Math.random().toString(32).substr(2, 8), //numero aleatório, com letras, posição de início 2 e fim 8
    dataInclusao: new Date().toString(),
    concluido: false,
    descricao: descricao,
    nomeColaborador: nomeColaborador,
  };

  tarefasModels.push(novaTarefa);
  response.status(201).json(novaTarefa);
};

//PUT
const atualizarTarefa = (request, response) => {
  const { id } = request.params;
  const { concluido, descricao, nomeColaborador } = request.body;

  const tarefaAtualizada = tarefasModels.find((tarefa) => (tarefa.id = id));

  if (tarefaAtualizada.concluido == true) {
    response.json({ Error: "Impossível atualizar tarefas concluídas." });
  } else {
    const atualizacao = {
      id: tarefaAtualizada.id, //manter o id que já existe
      dataInclusao: tarefaAtualizada.dataInclusao, //manter a data que já existe
      concluido: concluido, //atribuindo o que foi passado no body
      descricao: descricao,
      nomeColaborador: nomeColaborador,
    };

    const index = tarefasModels.indexOf(tarefaAtualizada);

    tarefasModels[index] = atualizacao;
    response.status(200).json(tarefasModels[index]);
  }
};

//PATCH status
const concluirTarefa = (request, response) => {
  const { id } = request.params;
  const { concluido } = request.body;

  const tarefa = tarefasModels.find((tarefa) => tarefa.id == id);

  tarefa.concluido = concluido;
  response.status(200).json(tarefa);
};

//DELETE
const deletarTarefa = (request, response) => {
  const { id } = request.params;
  const tarefaFiltrada = tarefasModels.find((tarefa) => tarefa.id == id);

  if (tarefaFiltrada.concluido == true) {
    response.json({ Error: "Impossível deletar tarefas concluídas." });
  } else {
    const index = tarefasModels.indexOf(tarefaFiltrada);
    tarefasModels.splice(index, 1);
    response.json(tarefasModels);
  }
};

module.exports = {
  getAll,
  obterPorId,
  obterConcluidas,
  obterPendentes,
  criarTarefa,
  atualizarTarefa,
  concluirTarefa,
  deletarTarefa,
};
