CREATE TABLE agendamento (
                             id BIGINT NOT NULL AUTO_INCREMENT,
                             quadra VARCHAR(100) NOT NULL,
                             data DATE NOT NULL,
                             horario TIME NOT NULL,
                             cliente_id BIGINT NOT NULL,

                             PRIMARY KEY (id),
                             FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
