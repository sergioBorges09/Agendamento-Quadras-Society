package fut.esportes.api.aws;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
public class AwsS3Service {

    private final S3Client s3Client;
    private final String region;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public AwsS3Service(@Value("${aws.access-key-id}") String accessKeyId,
                        @Value("${aws.secret-access-key}") String secretAccessKey,
                        @Value("${aws.region}") String region) {
        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKeyId, secretAccessKey)
                ))
                .build();
        this.region = region;
    }

    public String uploadFile(String key, MultipartFile file) throws IOException {
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .contentType(file.getContentType())
                        .build(),
                software.amazon.awssdk.core.sync.RequestBody.fromInputStream(file.getInputStream(), file.getSize())
        );
        return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + key;
    }
}
