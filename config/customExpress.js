// Qualquer modificação ou configuração relacionado ao 'express' é feita dentro deste arquivo

// Importando o módulo express
const express = require('express')

const consign = require('consign')
// Usando o consign, colocando a pasta controllers e módulos dentro dela para que sejam acessados pelo app
const bodyParser =  require('body-parser')


module.exports = () => {
    // Importando o objeto express e sua funcionalidades para const app, fica mais fácil para manipular as funcionalidades
    const app = express()
    app.use(bodyParser.urlencoded({extended: true})) //Fazendo a conversão dos dados, para quando eu receber do cliente em método post. converter e entender o que estou recebendo em 'req.body'
    app.use(bodyParser.json())
    consign().include('controllers').into(app)

    return app
}