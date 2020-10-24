const { request, response } = require("express")
const taskModels = require("../models/taskModels.json")

//GET
const getAll = (request, response) => {
    response.status(200).send(taskModels)
}

//GET
const getById = (request, response) => {
    const { id } = request.params;
    const task = taskModels.find((task) => task.id == id);

    response.json(task);
}

//GET
const getByTrue = (request, response) => {
    const doneTrue = taskModels.filter(task => task.done == true);
    response.status(200).json(doneTrue)
}

//GET
const getByFalse = (request, response) => {
    const doneFalse = taskModels.filter(task => task.done == false);
    response.status(200).json(doneFalse)
}

//POST
const addTask = (request, response) => {
    let { description, collab } = request.body

    const newTask = {
        id: Math.random().toString(32).substr(2, 9),
        inclusionDate: new Date().toString(),
        done: false,
        description: description,
        collab: collab
    }

    taskModels.push(newTask);

    response.status(201).json(newTask)
}

//PUT
const updateTask = (request, response) => {
    const { id } = request.params;
    const { done, description, collab } = request.body

    const updatedTask = taskModels.find(task => task.id == id)

    const newTask = {
        id: updatedTask.id,
        inclusionDate: updatedTask.inclusionDate,
        done: done,
        description: description,
        collab: collab
    }

    const index = taskModels.indexOf(updatedTask)

    taskModels[index] = newTask

    response.status(200).json(taskModels[index])

}

//PATCH
const doneTask = (request, response) => {
    const { id } = request.params
    const { done } = request.body

    const task = taskModels.find(task => task.id == id)

    if (task.done == true) {
        response.status(400).json({
            message: "impossible update completed tasks"
        })
    } else {
        task.done = done;
        response.status(200).json({
            message: "task completed",
            task
        })

    }
}

//PATCH
const collabTask = (request, response) => {
    const { id } = request.params
    const { collab } = request.body

    const task = taskModels.find(task => task.id == id)

    if (task.done == true) {
        response.status(400).json({
            message: "impossible update completed tasks"
        })
    } else {
        task.collab = collab;
        response.status(200).json({
            message: "task completed",
            task
        })

    }
}
module.exports = {
    getAll,
    getById,
    getByTrue,
    getByFalse,
    addTask,
    updateTask,
    doneTask,
    collabTask
}




