package fut.esportes.api.agendamento;

import fut.esportes.api.cliente.Cliente;
import fut.esportes.api.quadra.Quadra;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "agendamentos")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;
    private LocalTime horario;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "quadra_id")
    private Quadra quadra;

    public Agendamento() {}

    public Agendamento(LocalDate data, LocalTime horario, Cliente cliente, Quadra quadra) {
        this.data = data;
        this.horario = horario;
        this.cliente = cliente;
        this.quadra = quadra;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public LocalDate getData() { return data; }

    public void setData(LocalDate data) { this.data = data; }

    public LocalTime getHorario() { return horario; }

    public void setHorario(LocalTime horario) { this.horario = horario; }

    public Cliente getCliente() { return cliente; }

    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public Quadra getQuadra() { return quadra; }

    public void setQuadra(Quadra quadra) { this.quadra = quadra; }
}
