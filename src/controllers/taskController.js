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



module.exports ={
    getAll,
    getById,
    getByTrue,
    getByFalse
}




    /*taskModels.forEach(task=>{
        if(task.done.includes(done)){

        }
    })
    if ()
    const task = taskModels.find((task) => task)*/