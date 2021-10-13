class Tabelas {
    // Dentro da classe Tabelas neste arquivo, aplicaremos o método init() que iniciará nosso trabalho. Dentro dos parênteses, receberemos a conexao do banco de dados que o deixará desacoplado sem que saiba de onde vem exatamente.
    init(conexao) {
        console.log('Tabelas foram chamadas')
        this.conexao = conexao

        // Chamando o método aqui depois de ter feito a criação
        this.criarAtendimentos()
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Atendimentos criada com sucessso!')
            }
        })
    }
}

module.exports = new Tabelas