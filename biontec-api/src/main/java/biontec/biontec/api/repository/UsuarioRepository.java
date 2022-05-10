package biontec.biontec.api.repository;


import biontec.biontec.api.model.UsuarioModel;
import lombok.var;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, UUID> {
    UsuarioModel findByUsername(String username);
}

