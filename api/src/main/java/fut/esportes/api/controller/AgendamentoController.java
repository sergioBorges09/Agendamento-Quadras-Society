package fut.esportes.api.controller;

import fut.esportes.api.agendamento.Agendamento;
import fut.esportes.api.agendamento.AgendamentoService;
import fut.esportes.api.cliente.Cliente;
import fut.esportes.api.cliente.ClienteService;
import fut.esportes.api.admin.Admin;
import fut.esportes.api.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<List<Agendamento>> listarAgendamentos(Authentication authentication) {
        String emailLogado = authentication.getName();

        Admin adminLogado = adminService.buscarPorEmailOpcional(emailLogado);
        if (adminLogado != null) {
            return ResponseEntity.ok(agendamentoService.listarTodosAgendamentos());
        }

        Cliente clienteLogado = clienteService.buscarPorEmailOpcional(emailLogado);
        if (clienteLogado == null) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.ok(agendamentoService.listarAgendamentosDoCliente(clienteLogado));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Agendamento> cadastrarAgendamento(
            @RequestBody Agendamento agendamento,
            Authentication authentication) {

        Cliente clienteLogado = clienteService.buscarPorEmailOpcional(authentication.getName());
        if (clienteLogado == null) {
            return ResponseEntity.status(403).build();
        }

        agendamento.setCliente(clienteLogado);
        Agendamento agendamentoSalvo = agendamentoService.salvar(agendamento);
        return ResponseEntity.ok(agendamentoSalvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluirAgendamento(
            @PathVariable Long id,
            Authentication authentication) {

        Agendamento agendamento = agendamentoService.buscarPorId(id);
        String emailLogado = authentication.getName();

        Admin adminLogado = adminService.buscarPorEmailOpcional(emailLogado);
        if (adminLogado != null) {
            agendamentoService.excluir(id);
            return ResponseEntity.ok("Agendamento excluído pelo admin.");
        }

        Cliente clienteLogado = clienteService.buscarPorEmailOpcional(emailLogado);
        if (clienteLogado == null || !agendamento.getCliente().getId().equals(clienteLogado.getId())) {
            return ResponseEntity.status(403)
                    .body("Você não tem permissão para excluir este agendamento.");
        }

        agendamentoService.excluir(id);
        return ResponseEntity.ok("Agendamento excluído com sucesso.");
    }
}
