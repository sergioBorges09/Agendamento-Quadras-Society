package fut.esportes.api.cliente;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    private final ClienteRepository repository;
    private final PasswordEncoder passwordEncoder;

    public ClienteService(ClienteRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }
    public PasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }

    public Cliente cadastrar(DadosCadastroCliente dados) {
        if (repository.existsByEmail(dados.email())) {
            throw new IllegalArgumentException("Email já cadastrado!");
        }
        if (repository.existsByCpf(dados.cpf())) {
            throw new IllegalArgumentException("CPF já cadastrado!");
        }

        Cliente cliente = new Cliente(dados);

        cliente.setSenha(passwordEncoder.encode(dados.senha()));

        return repository.save(cliente);
    }

    public Cliente buscarPorEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com o e-mail: " + email));
    }
    public Cliente buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com o id: " + id));
    }
    public Cliente buscarPorEmailOpcional(String email) {
        return repository.findByEmail(email).orElse(null);
    }
}
