const tarefasModels = require("../models/tarefas.json")

const getAll = (req, res) => {
    res.status(200).send(tarefasModels)
}

// Retornar uma tarefa específica
const getById = (req, res) => {
    const { id } = req.params // pega o id passado pelo usuário na rota
    res.status(200).send(tarefasModels.find(tarefa => tarefa.id == id))
}

// Retornar uma lista de tarefas concluídas
const getConcluida = (req, res) => {
    const tarefasConcluidas = tarefasModels.filter(tarefa => tarefa.concluido == true)
    res.status(200).send(tarefasConcluidas)
}

// Retornar uma lista de tarefas não concluídas
const getNaoConcluida = (req, res) => {
    const tarefasNaoConcluidas = tarefasModels.filter(tarefa => tarefa.concluido == false)
    res.status(200).send(tarefasNaoConcluidas)
}

// Cadastrar uma tarefa
const criarTarefa = (req, res) => {
    let { descricao, nomeColaborador } = req.body

    const novaTarefa = {
        id: Math.random().toString(32).substr(2, 8), // substr: retorna uma parte da string, começa na posição 2 e vai até a 8 (o 8 é o tamanho da string)
        dataInclusao: new Date().toString(),
        concluido: false, // porque não está concluída
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }

    tarefasModels.push(novaTarefa) // inserindo a nova tarefa na lista de tarefas

    res.status(201).json(novaTarefa)
}

// PUT: Reescrever uma tarefa (impedir edição do ID e da data) já tem impedindo editar id e dataInclusao
const atualizarTarefa = (req, res) => {
    const { id } = req.params // pegando o id que está na url que o usuário digitou
    const { concluido, descricao, nomeColaborador } = req.body // pegando o que o usuário digitou no body

    const tarefaAtualizada = tarefasModels.find(tarefa => tarefa.id == id) // para pegar uma unidade. Comparando o que a gente tem com o que o usuário digitou. Procura a tarefa que será atualizada

    if (tarefaAtualizada.concluido == true) {
        res.json({ Erro: "Impossível atualizar tarefas concluídas." })
    } else {
        // atribuindo os dados que vieram com o que o usuário digitou
        const novaTarefa = { // construir o novo objeto editado
        id: tarefaAtualizada.id, // manter o id que já existe
        dataInclusao: tarefaAtualizada.dataInclusao, // manter a data que já existe
        concluido: concluido, // adicionando o campo "concluído" que foi mandado pelo usuário
        descricao: descricao, // adicionando o valor "descrição" que foi mandado pelo usuário
        nomeColaborador: nomeColaborador // adicionando o valor "nomeColaborador" que foi mandado pelo usuário
        }

        const index = tarefasModels.indexOf(tarefaAtualizada) // procuro a posição dentro do JSON do objeto que será atualizado
        tarefasModels[index] = novaTarefa // atribuindo a antiga tarefa a nova que construímos
        res.status(200).json(tarefasModels[index])
    }  
}

// PATCH: Colocar uma tarefa como concluída (Impedir edição de tarefas concluidas)
const concluirTarefa = (req, res) => {
    const { id } = req.params // pegando o valor do ID mandanda na URL
    const { concluido } = req.body // pegando o valor de "concluído" enviado no Body

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id) // encontrando a tarefa referente ao ID

    if (tarefa.concluido == true) {
        res.json({ Erro: "Está tarefa já estava concluída." })
    } else {
        tarefa.concluido = concluido // atualizando o campo "concluído" no nosso JSON

        res.status(200).json({
            mensagem: "Tarefa concluída.", // enviando a mensagem
            tarefa // enviando o objeto atualizado
        })
    }
    
}

// PATCH: Corrigir responsável (Impedir edição de tarefas concluidas)
const atualizarColaborador = (req, res) => {
    const { id } = req.params
    const { nomeColaborador } = req.body

    const tarefa = tarefasModels.find(tarefa => tarefa.id == id)

    if (tarefa.concluido == true) {
        res.json({ Erro: "Não é possível atualizar o responsável, pois está tarefa já foi concluída." })
    } else {
    tarefa.nomeColaborador = nomeColaborador

    res.status(200).json(tarefa)
    }
}

// DELETE: Apagar uma tarefa (Impedir deleção de tarefas concluidas)
const deletarTarefa = (req, res) => {
    const { id } = req.params
    // const tarefaFiltrada = tarefasModels.findIndex(tarefa => tarefa.id == id)
    const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id) // tava com findeIndex e não estava deletando corretamente. VER O PORQUÊ

    if (tarefaFiltrada.concluido == true) {
        res.json({ Erro: "Impossível deletar tarefas concluídas." })
    } else {
        const index = tarefasModels.indexOf(tarefaFiltrada)
        tarefasModels.splice(index, 1) // ele apaga o que está na primeira posição
        
        res.json({ mensagem: "Tarefa deletada com sucesso!" })
    }    
    // funciona com essa forma também, e usando em tarefaFiltrada o find no lugar do findIndex
    // tarefasModels.splice(tarefaFiltrada, 1)
    // console.log(tarefasModels)
}

module.exports = {
    getAll,
    getById,
    getConcluida,
    getNaoConcluida,
    criarTarefa,
    atualizarTarefa,
    concluirTarefa,
    atualizarColaborador,
    deletarTarefa
}