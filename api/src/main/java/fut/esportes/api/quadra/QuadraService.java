package fut.esportes.api.quadra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuadraService {

    @Autowired
    private QuadraRepository repository;

    public Quadra salvar(Quadra quadra) {
        return repository.save(quadra);
    }

    public List<Quadra> listarTodas() {
        return repository.findAll();
    }

    public Quadra buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quadra não encontrada"));
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
