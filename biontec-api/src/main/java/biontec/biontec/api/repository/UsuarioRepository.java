package biontec.biontec.api.repository;

import biontec.biontec.api.dtos.UsuarioDto;
import biontec.biontec.api.model.UsuarioModel;
import lombok.var;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.AbstractList;
import java.util.Arrays;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Integer> {
   //  List<UsuarioModel> findUsuarioModelByNome_usuario(UsuarioDto usuarioModel, String nome_usuario);

    }


