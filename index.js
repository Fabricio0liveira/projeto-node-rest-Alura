// Responsabilidade no arquivo index.js é somente subir o servidor no ar
const PORT = 3000
const customExpress = require('./config/customExpress')
// Importando a conexão com banco de dados
const conexao = require('./infraestrutura/conexao')

// Conectando o banco de dados
conexao.connect((erro) => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('Conectado com sucesso o banco de dados.')
        const app = customExpress()
        // Iniciando o servidor na porta 3000, fazendo referência a const PORT
        app.listen(PORT, () => {
            console.log('Servidor rodando na porta 3000')
        })
    }
})



