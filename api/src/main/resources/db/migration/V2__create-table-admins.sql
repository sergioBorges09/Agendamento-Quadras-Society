CREATE TABLE admins (
                       id BIGINT NOT NULL AUTO_INCREMENT,
                       nome VARCHAR(100) NOT NULL,
                       email VARCHAR(100) NOT NULL UNIQUE,
                       cpf CHAR(11) NOT NULL UNIQUE,
                       senha VARCHAR(255) NOT NULL,
                       telefone VARCHAR(15),

                       PRIMARY KEY (id)
);
