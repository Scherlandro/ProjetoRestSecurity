package biontec.biontec.api.repository;

import biontec.biontec.api.model.PaisModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaisRepository extends JpaRepository<PaisModel, Integer> {
  //https://stackoverflow.com/questions/33153271/how-do-you-create-a-spring-jpa-repository-findby-query-using-a-property-that-con
  // @Query("SELECT p.nome_pais FROM paises p WHERE p.nome_pais = ?1 ")
 // Repository findByNome_pais(String nome_pais);
}
