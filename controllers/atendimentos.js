// Aqui nosso dever é controlar todas as rotas e o que devemos fazer quando acessarmos cada uma delas. 

// Isso é uma function que no caso irá retornar algo.
// Exportando o módulo
module.exports = app => {
    // método GET
    // Primeira rota
    app.get('/atendimentos', (req, res) => {
        res.send('Você está na rota de atendimentos e está realizando um GET.')
    })

    // Método POST. Enviando dados para o servidor 
    app.post('/atendimentos', (req, res) => {
        // Verificando o que o cliente está enviando na requisição. No caso o 'body'.
        console.log(req.body)
        res.send('Você está na rota de atendimentos e está realizando um POST')
    })
}