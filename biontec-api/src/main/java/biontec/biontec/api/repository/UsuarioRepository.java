package biontec.biontec.api.repository;


import biontec.biontec.api.model.UsuarioModel;
import lombok.var;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Integer> {
    UsuarioModel findByUsername(String username);
    Optional<UsuarioModel> findByName(String name);

    @Query("Select u from UsuarioModel u Join Fetch u.roles Where u.username = : username")
    UsuarioModel findByUsernameFetchRoles(@Param("username") String username);
}


