// Responsabilidade no arquivo index.js é somente subir o servidor no ar

const customExpress = require('./config/customExpress')
const app = customExpress()

// Iniciando o servidor na porta 3000, fazendo referência a const PORT
const PORT = 3000
app.listen(PORT, () => {
    console.log('Servidor rodando na porta 3000')
})

