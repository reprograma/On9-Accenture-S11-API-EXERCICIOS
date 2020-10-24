const express = require("express");
const { route } = require(".");
const router = express.Router();

const controller = require("../controllers/toDoController");

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.get("/concluidas", controller.getCompleted);

router.get("/naoconcluidas", controller.getUncompleted);

router.post("/cadastro", controller.criarTarefa);

router.put("/editar/:id", controller.atualizarTarefa);

router.patch("naoconcluidas/:id", controller.concluirTarefa);

router.delete("/:id", controller.deletarTarefa);


module.exports = router