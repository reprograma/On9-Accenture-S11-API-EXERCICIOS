const app = require ('./src/app');
const port = 8080;

app.listen(port, function(){
    console.log(`Server running at ${port}`)
});