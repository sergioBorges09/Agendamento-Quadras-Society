package fut.esportes.api.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DadosLoginAdmin(
        @NotBlank
        @Email
        String email,

        @NotBlank
        String senha
) {}
