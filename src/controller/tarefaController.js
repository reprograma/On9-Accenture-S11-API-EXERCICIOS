const tarefaModels = require("../models/tarefas.json");

const getAll = (request, response) => {
  response.status(200).send(tarefaModels);
};

const criarTarefa = (request, response) => {
  let { descricao, nomeColaborador } = request.body;

  const novaTarefa = {
    id: Math.random().toString(32).substr(2, 8),
    dataInclusao: new Date().toString(),
    concluido: false,
    descricao: descricao,
    nomeColaborador: nomeColaborador,
  };
  tarefaModels.push(novaTarefa);

  response.status(201).json(novaTarefa);
  //    response.status(201).send(novaTarefa)

  console.log(novaTarefa);
};

const atualizarTarefa = (request, response) => {
  const { id } = request.params; //pega o ID na URL

  //vai pegar da url os dados enviados pelo usuário
  const { concluido, descricao, nomeColaborador } = request.body;

  const tarefaAtualizada = tarefaModels.find((tarefa) => tarefa.id == id); //procura a tarefa de acordo com o id passado na url

  if (tarefaAtualizada.concluido == true) {
    response.json({ Erro: "Impossivel atualizar tarefas concluidas" });
  } else {
    const novaTarefa = {
      //Constroe o novo objeto editado
      id: tarefaAtualizada.id, //manter o id que já existe porque o PUT reescreve tudo e se não tiver essa linha ele vai apagar.
      dataInclusao: tarefaAtualizada.dataInclusao, //vai manter também a mesma data da inclusão.
      concluido: concluido, //adicionando o valor "concluído" que foi mandado pelo usuário.
      descricao: descricao, //adicionando o valor "descricao" que foi mandado pelo usuário.
      nomeColaborador: nomeColaborador, //adiciona o valor "nomeColaborador" que foi mandado pelo usuário
    };

    const index = tarefaModels.indexOf(tarefaAtualizada); //procuro a posição dentro do JSON

    tarefaModels[index] = novaTarefa; //atribuindo a antiga tarefa a nova que construímos

    response.status(200).json(tarefaModels[index]);
  }
};

const concluirTarefa = (request, response) => {
  const { id } = request.params; //pegando o valor do ID mandado na URL
  const { concluido } = request.body; //pegando o valor "concluido" enviado no Body

  const tarefa = tarefaModels.find((tarefa) => tarefa.id == id); //encontrando a tarefa referida na URL

  if (tarefa.concluido == true) {
    response.json({ Erro: "Impossivel atualizar tarefas concluidas" });
  } else {
    const novaTarefa = {
      //Constroe o novo objeto editado
      id: tarefa.id, //manter o id que já existe porque o PUT reescreve tudo e se não tiver essa linha ele vai apagar.
      dataInclusao: tarefa.dataInclusao, //vai manter também a mesma data da inclusão.
      concluido: concluido, //adicionando o valor "concluído" que foi mandado pelo usuário.
      descricao: tarefa.descricao, //mantem a descrição
      nomeColaborador: tarefa.nomeColaborador, //mantem o nome do colaborador
    };

    const index = tarefaModels.indexOf(tarefa); //procuro a posição dentro do JSON

    tarefaModels[index] = novaTarefa; //atribuindo a antiga tarefa a nova que construímos

    response.status(200).json(tarefaModels[index]);
  }
  /**  
    tarefa.concluido = concluido //atualizando o campo "concluido" no nosso json

    response.status(200).json({
        mensagem: "Tarefa concluída", //mensagem de retorno quando com sucesso.
        tarefa //retorna o objeto atualizado
    })
    */
};

const concluirTarefaColaborador = (request, response) => {
  const { id } = request.params; //pega o ID na URL

  //vai pegar da url os dados enviados pelo usuário
  const { nomeColaborador } = request.body;

  const tarefaColaboradorAtualizada = tarefaModels.find(
    (tarefa) => tarefa.id == id
  ); //procura a tarefa de acordo com o id passado na url

  if (tarefaColaboradorAtualizada.concluido == true) {
    response.json({ Erro: "Impossivel atualizar tarefas concluidas" });
  } else {
    const novaTarefa = {
      //Constroe o novo objeto editado
      id: tarefaColaboradorAtualizada.id, //manter o id que já existe porque o PUT reescreve tudo e se não tiver essa linha ele vai apagar.
      dataInclusao: tarefaColaboradorAtualizada.dataInclusao, //vai manter também a mesma data da inclusão.
      concluido: tarefaColaboradorAtualizada.concluido, //mantem o status da tarefa
      descricao: tarefaColaboradorAtualizada.descricao, //mantem a descrição da tarefa.
      nomeColaborador: nomeColaborador, //adiciona o valor "nomeColaborador" que foi mandado pelo usuário
    };

    const index = tarefaModels.indexOf(tarefaColaboradorAtualizada); //procuro a posição dentro do JSON

    tarefaModels[index] = novaTarefa; //atribuindo a antiga tarefa a nova que construímos

    response.status(200).json(tarefaModels[index]);
  }
};

const deletarTarefa = (request, response) => {
  //desestruturando o objeto para pegar os parametros do id da url
  const { id } = request.params;

  //para filtrar com o models e encontrar o primeiro objeto com o parametro colocado na url
  const tarefaFiltrada = tarefaModels.find((tarefa) => tarefa.id == id);

  if (tarefaFiltrada.concluido == true) {
    response.json({ Erro: "Impossível deletar tarefas concluidas" });
  } else {
    //precisamos adicionar um index porque o splice precisa do index para apagar corretamente.
    const index = tarefaModels.indexOf(tarefaFiltrada);
    tarefaModels.splice(index, 1);

    response.json({ messagem: "Tarefa deletada com sucesso." });
  }
};

module.exports = {
  getAll,
  criarTarefa,
  atualizarTarefa,
  concluirTarefa,
  concluirTarefaColaborador,
  deletarTarefa,
};
