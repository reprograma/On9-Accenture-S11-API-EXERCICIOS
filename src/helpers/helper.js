const dataInicio = () => {
    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth();
    let ano = data.getFullYear();
    mes++;
    let dataformatada = dia + '/' + mes + '/' + ano;
    return dataformatada;

}



module.exports = {
    dataInicio

}