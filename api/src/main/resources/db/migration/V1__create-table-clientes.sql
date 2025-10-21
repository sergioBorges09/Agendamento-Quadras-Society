CREATE TABLE clientes (

                          id BIGINT NOT NULL AUTO_INCREMENT,
                          nome VARCHAR(100) NOT NULL,
                          email VARCHAR(100) NOT NULL UNIQUE,
                          telefone VARCHAR(15) NOT NULL,
                          cpf CHAR(11) NOT NULL UNIQUE,
                          senha VARCHAR(255) NOT NULL,

                          PRIMARY KEY (id)
);
