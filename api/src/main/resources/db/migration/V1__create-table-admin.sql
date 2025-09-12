create table admin (
                       id BIGINT NOT NULL AUTO_INCREMENT,
                       nome VARCHAR(100) NOT NULL,
                       email VARCHAR(100) NOT NULL UNIQUE,
                       telefone VARCHAR(20) NOT NULL,
                       logradouro VARCHAR(100) NOT NULL,
                       bairro VARCHAR(100) NOT NULL,
                       cep VARCHAR(9) NOT NULL,
                       numero VARCHAR(20),
                       complemento VARCHAR(100),
                       cidade VARCHAR(100) NOT NULL,
                       uf CHAR(2) NOT NULL,
                       primary key (id)
);
