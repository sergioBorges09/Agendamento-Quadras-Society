package fut.esportes.api.controller;

import fut.esportes.api.aws.AwsS3Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/s3")
public class AwsS3Controller {

    private final AwsS3Service awsS3Service;

    public AwsS3Controller(AwsS3Service awsS3Service) {
        this.awsS3Service = awsS3Service;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        try {
            String key = file.getOriginalFilename();
            awsS3Service.uploadFile(key, file);
            return ResponseEntity.ok("Upload feito com sucesso: " + key);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro no upload: " + e.getMessage());
        }
    }
}
