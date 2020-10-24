const express =  require("express") //chama express
const router =  express.Router() // execura função router

const controller = require("../controllers/taskController")

/**
@route GET tasks
@desc Return all tasks
@access Public 
@endpoint http://localhost:8080/tasks/
**/
router.get("/", controller.getAll)

/**
@route GET tasks/true
@desc Return only completed tasks
@access Public 
@endpoint http://localhost:8080/tasks/true
**/
router.get("/true", controller.getByTrue);

/**
@route GET tasks/false
@desc Return only not completed tasks
@access Public 
@endpoint http://localhost:8080/tasks/false
**/
router.get("/false", controller.getByFalse);

/**
@route GET tasks/:id
@desc Return only a single task by id: identifier
@access Public 
@endpoint http://localhost:8080/tasks/:id
**/
router.get("/:id", controller.getById);

/**
@route POST tasks/:id
@desc Create a new task
@access Public 
@endpoint http://localhost:8080/tasks/add
**/
router.post("/add", controller.addTask)

/**
@route PUT tasks/:id
@desc Update task
@access Public 
@endpoint http://localhost:8080/tasks/:id
**/
router.put("/:id", controller.updateTask)

/**
@route PATCH false/:id
@desc task completed
@access Public 
@endpoint http://localhost:8080/tasks/false/:id
**/
router.patch("/false/:id", controller.doneTask)

/**
@route PATCH false/collab/:id
@desc update collab
@access Public 
@endpoint http://localhost:8080/tasks/false/collab/:id
**/
router.patch("/false/collab/:id", controller.collabTask)

//router.delete("/:id", controller.deletarTarefa)

module.exports = router




/*router.get("/", function(request, response){
    response.status(200).send({
        title: "Reprograma",
        version: "1.0.0"
    })
})

module.exports = router*/