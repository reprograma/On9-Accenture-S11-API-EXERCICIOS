const app = require("./src/app");
const port = 8080;

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`);
});