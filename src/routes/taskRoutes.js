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

//router.post("/cadastro", controller.criarTarefa)

//router.put("/editar/:id", controller.atualizarTarefa)

//router.patch("/naoconcluidas/:id", controller.concluirTarefa)

//router.delete("/:id", controller.deletarTarefa)

module.exports = router




/*router.get("/", function(request, response){
    response.status(200).send({
        title: "Reprograma",
        version: "1.0.0"
    })
})

module.exports = router*/