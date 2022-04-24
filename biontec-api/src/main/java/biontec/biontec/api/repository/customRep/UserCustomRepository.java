package biontec.biontec.api.repository.customRep;

import biontec.biontec.api.model.UsuarioModel;
import lombok.var;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class UserCustomRepository {


    private final EntityManager em;


        public UserCustomRepository(EntityManager em) {
            this.em = em;
        }

        public List<UsuarioModel> find(String nome_usuario, String email, String senha) {

            String query = "select U from usuarios as U ";
            String condicao = "where";

            if (nome_usuario != null) {
                query += condicao + " U.nome_usuario = :nome_usuario";
                condicao = " and ";
            }
            if (email != null) {
                query += condicao + " U.email = :email";
                condicao = " and ";
            }
            if (senha != null) {
                query += condicao + " U.senha = :senha";
            }
            var q = em.createQuery(query, UsuarioModel.class);

            if (nome_usuario != null) {
                q.setParameter("nome_usuario", nome_usuario);
            }
            if (email != null) {
                q.setParameter("email", email);
            }
            if (senha != null) {
                q.setParameter("senha", senha);
            }
            return q.getResultList();
        }
    }

