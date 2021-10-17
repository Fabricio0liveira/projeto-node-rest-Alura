// Aqui nosso dever é controlar todas as rotas e o que devemos fazer quando acessarmos cada uma delas. 

const Atendimento = require('../models/atendimentos')

// Isso é uma function que no caso irá retornar algo.
// Exportando o módulo
module.exports = app => {
    // método GET
    // Primeira rota
    app.get('/atendimentos', (req, res) => {
        // Chamando o metodo GET para listar os atendimentos. 
        Atendimento.listarAtendimentos(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        // Convertendo valor string para number
        const id = parseInt(req.params.id)
        
        Atendimento.buscaPorId(id, res)
    })

    // Método POST. Enviando dados para o servidor 
    app.post('/atendimentos', (req, res) => {
        // Verificando o que o cliente está enviando na requisição. No caso o 'body'.
        const atendimento = req.body

        // Salvando os dados, que estao sendo passados no corpo da requisição, dentro da tabela no banco de dados.
        Atendimento.adicionarAtendimento(atendimento, res)
    })

    // Alterando dados de um atendimento
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Atendimento.alterar(id, values, res)
    })
}