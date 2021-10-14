// Dentro de "PROJETO", criaremos uma nova pasta chamada "models", a qual terá a conexão com o banco de dados e algumas validações de regra de negócios. Nosso Controller decidirá qual será a requisição que faremos.
const moment =  require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        // Formatando a data e hora com o uso da lib moment
        const data =  moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        // Tratamento de erros
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data dever ser maior ou igual a data atual',
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]


        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length


        if(existemErros) {
            res.status(400).json(erros)
        } else {
            // Atendimento com a data de criação.
            const atendimentoDatado = {...atendimento, dataCriacao, data}
        
            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }
}

module.exports = new Atendimento