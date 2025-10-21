package fut.esportes.api.controller;

import fut.esportes.api.aws.AwsS3Service;
import fut.esportes.api.quadra.DadosCadastroQuadra;
import fut.esportes.api.quadra.Quadra;
import fut.esportes.api.quadra.QuadraService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/quadras")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class QuadraController {

    private final QuadraService quadraService;
    private final AwsS3Service awsS3Service;

    public QuadraController(QuadraService quadraService, AwsS3Service awsS3Service) {
        this.quadraService = quadraService;
        this.awsS3Service = awsS3Service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Quadra cadastrarQuadra(@RequestPart("dados") DadosCadastroQuadra dados,
                                  @RequestPart("imagem") MultipartFile imagem) {
        try {
            String key = "quadras/" + System.currentTimeMillis() + "_" + imagem.getOriginalFilename();
            String urlImagem = awsS3Service.uploadFile(key, imagem);

            Quadra quadra = new Quadra(dados, urlImagem);
            return quadraService.salvar(quadra);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar imagem para S3", e);
        }
    }

    @GetMapping
    public List<Quadra> listarQuadras() {
        return quadraService.listarTodas();
    }

    @GetMapping("/{id}")
    public Quadra buscarQuadra(@PathVariable Long id) {
        return quadraService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void excluirQuadra(@PathVariable Long id) {
        quadraService.excluir(id);
    }
}
