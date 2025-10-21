package fut.esportes.api.controller;

import fut.esportes.api.cliente.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.security.Key;
import io.jsonwebtoken.security.Keys;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Cliente> cadastrar(@RequestBody @Valid DadosCadastroCliente dados) {
        Cliente clienteSalvo = service.cadastrar(dados);
        return ResponseEntity.ok(clienteSalvo);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid DadosLoginCliente dados) {
        try {
            Cliente cliente = service.buscarPorEmail(dados.email());

            boolean senhaCorreta = service.getPasswordEncoder().matches(dados.senha(), cliente.getSenha());
            if (!senhaCorreta) {
                return ResponseEntity.status(401).body("Senha incorreta");
            }

            String secret = "segredoSuperSecretoQueDeveSerMaiorQue32BytesParaSeguranca";
            Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); // ✅ Corrigido

            String token = Jwts.builder()
                    .setSubject(cliente.getEmail())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();

            return ResponseEntity.ok(new LoginResponse(cliente, token));

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Usuário não encontrado");
        }
    }
}
