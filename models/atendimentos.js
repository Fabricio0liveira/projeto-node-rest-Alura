// Dentro de "PROJETO", criaremos uma nova pasta chamada "models", a qual terá a conexão com o banco de dados e algumas validações de regra de negócios. Nosso Controller decidirá qual será a requisição que faremos.
const moment =  require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    // Adicionando novo atendimento
    adicionarAtendimento(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        // Formatando a data e hora com o uso da lib moment
        const data =  moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        // Tratamento de erros
        // Verificando se a data é maior ou igual a data atual e não menor
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        // Verificando se o nome do cliente de 5 ou mais caracteres, para não registrar como vazio.
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
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    // Listando todos os atendimentos registrados na nossa tabela atendimentos
    listarAtendimentos(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }   
        })
    }

    // Consultando somente um atendimento pelo 'id'
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }  
        })
    }

    // Alterar dados de um atendimento
    alterar(id, values, res) {
        if(values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'
    
        conexao.query(sql, [values, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...values, id})
            }
        })
    }

    // Deletar atendimento
    deletarAtendimento(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento