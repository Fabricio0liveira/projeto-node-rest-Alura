// Qualquer modificação ou configuração relacionado ao 'express' é feita dentro deste arquivo

// Importando o módulo express
const express = require('express')

const consign = require('consign')
// Usando o consign, colocando a pasta controllers e módulos dentro dela para que sejam acessados pelo app

module.exports = () => {
    // Importando o objeto express e sua funcionalidades para const app, fica mais fácil para manipular as funcionalidades
    const app = express()
    consign().include('controllers').into(app)

    return app
}