package fut.esportes.api.admin;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminService {

    private final AdminRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public Admin cadastrar(DadosCadastroAdmin dados) {
        if (repository.existsByEmail(dados.email())) {
            throw new IllegalArgumentException("Email já cadastrado!");
        }
        if (repository.existsByCpf(dados.cpf())) {
            throw new IllegalArgumentException("CPF já cadastrado!");
        }

        Admin admin = new Admin(dados);
        admin.setSenha(passwordEncoder.encode(dados.senha()));

        return repository.save(admin);
    }

    public Admin login(DadosLoginAdmin dados) {
        Admin admin = repository.findByEmail(dados.email())
                .orElseThrow(() -> new IllegalArgumentException("E-mail ou senha inválidos"));

        System.out.println("Admin achado: " + admin);

        return admin;
    }
    public Admin buscarPorEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Administrador não encontrado com o email: " + email));
    }

    public Admin buscarPorEmailOpcional(String email) {
        return repository.findByEmail(email).orElse(null);
    }
}
