CREATE TABLE quadras (
                         id BIGINT NOT NULL AUTO_INCREMENT,
                         nome VARCHAR(255) NOT NULL,
                         endereco VARCHAR(255) NOT NULL,
                         valor DECIMAL(10,2) NOT NULL,
                         imagem_url VARCHAR(500),
                         PRIMARY KEY (id)
);
