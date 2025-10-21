package fut.esportes.api.cliente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DadosLoginCliente(
        @NotBlank @Email String email,
        @NotBlank String senha
) {}
