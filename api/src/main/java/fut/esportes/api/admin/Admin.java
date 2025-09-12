package fut.esportes.api.admin;

import fut.esportes.api.endereco.Endereco;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.EqualsAndHashCode;
import org.springframework.security.crypto.password.PasswordEncoder;

@Table(name = "admin")
@Entity(name = "Admin")
@EqualsAndHashCode(of = "id")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String email;
    private String telefone;
    private String senha;

    @Embedded
    private Endereco endereco;

    public Admin(){
    }

    public Admin(DadosCadastroAdmin dados, PasswordEncoder encoder) {
        this.nome = dados.nome();
        this.email = dados.email();
        this.telefone = dados.telefone();
        this.senha = encoder.encode(dados.senha());
        this.endereco = new Endereco(dados.endereco());
    }


    public long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public Endereco getEndereco() {
        return endereco;
    }
}
