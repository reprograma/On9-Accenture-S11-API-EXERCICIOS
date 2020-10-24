const { request, response } = require("express")
const taskModels = require("../models/taskModels.json")

//GET
const getAll = (request, response)=>{
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
    const doneTrue = taskModels.filter(task => task.done == true );
    response.status(200).json(doneTrue)
}

//GET
const getByFalse = (request, response) => {
    const doneFalse = taskModels.filter(task => task.done == false );
    response.status(200).json(doneFalse)
}

const addTask = (request, response)=>{
    let { description, collab } = request.body
    
    const newTask ={
        id: Math.random().toString(32).substr(2,9),
        inclusionDate: new Date().toString(),
        done: false,
        description: description,
        collab: collab
    }

    taskModels.push(newTask);

    response.status(201).json(newTask)
}


module.exports ={
    getAll,
    getById,
    getByTrue,
    getByFalse,
    addTask
}




    /*taskModels.forEach(task=>{
        if(task.done.includes(done)){

        }
    })
    if ()
    const task = taskModels.find((task) => task)*/