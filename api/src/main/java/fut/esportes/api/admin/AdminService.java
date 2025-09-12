package fut.esportes.api.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Transactional
    public void cadastrar(DadosCadastroAdmin dados) {
        Admin admin = new Admin(dados, encoder); // Criptografa a senha
        repository.save(admin);
    }
}
