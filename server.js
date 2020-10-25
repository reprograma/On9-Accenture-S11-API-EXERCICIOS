//chamando o arquivo app
const app = require("./src/app");

//definindo qual a porta vai rodar o nosso servidor
const PORT = 8080;

//método para chamar e comprovar que nosso servidor está funcionando. Útil para saber se nosso código está certo.
app.listen(PORT, function () {
  console.log(`app rodando na porta ${PORT}`);
});
