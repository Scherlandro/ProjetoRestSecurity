package biontec.biontec.api.repository;

import biontec.biontec.api.model.AlmoxarifadoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AlmoxarifadoRepository extends JpaRepository<AlmoxarifadoModel, Integer> {

    boolean existsByPlaca(String placa);

    boolean existsByDisponibilidade(Boolean disponibilidade);
}
