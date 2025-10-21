package fut.esportes.api.controller;

import fut.esportes.api.admin.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
public class AdminController {

    private final AdminService service;

    public AdminController(AdminService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Admin> cadastrar(@RequestBody @Valid DadosCadastroAdmin dados) {
        Admin adminSalvo = service.cadastrar(dados);
        return ResponseEntity.ok(adminSalvo);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid DadosLoginAdmin dados) {
        try {
            Admin admin = service.login(dados);

            String secret = "segredoSuperSecretoQueDeveSerMaiorQue32BytesParaSeguranca";
            Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

            String token = Jwts.builder()
                    .setSubject(admin.getEmail())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hora
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();

            return ResponseEntity.ok(new LoginResponse(admin, token));

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("E-mail ou senha inválidos");
        }
    }
}
