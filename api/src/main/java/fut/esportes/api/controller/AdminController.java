package fut.esportes.api.controller;

import fut.esportes.api.admin.Admin;
import fut.esportes.api.admin.AdminRepository;
import fut.esportes.api.admin.DadosCadastroAdmin;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin")
public class AdminController {

    @Autowired
    private AdminRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping
    @Transactional
    public void cadastrar(@RequestBody @Valid DadosCadastroAdmin dados){
        repository.save(new Admin(dados, encoder));
    }
}
