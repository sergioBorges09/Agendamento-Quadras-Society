package fut.esportes.api.admin;

import fut.esportes.api.endereco.DadosEndereco;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroAdmin(

        @NotNull
        String nome,

        @NotBlank
        @Email
        String email,

        @NotBlank
        String telefone,

        @NotBlank
        String senha,

        @NotNull
        @Valid
        DadosEndereco endereco)
{ }
