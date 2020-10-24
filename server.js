const app = require("./src/app") //chamando o app.js
const PORT = 8080    //criando a porta

app.listen(PORT, function(){  //colocando o app pra ouvir a porta
    console.log(`app rodando na porta ${PORT}`)
})