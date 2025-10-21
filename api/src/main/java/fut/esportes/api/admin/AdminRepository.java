package fut.esportes.api.admin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    boolean existsByEmail(String email);
    boolean existsByCpf(String cpf);

    Optional<Admin> findByEmail(String email);
}
