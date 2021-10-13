const mySql = require('mysql')

// Configurações iniciais para o mySql criar uma conexao com o banco de dados
const conexao = mySql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'
})

module.exports = conexao