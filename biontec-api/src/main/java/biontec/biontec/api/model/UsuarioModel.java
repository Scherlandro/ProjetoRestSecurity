package biontec.biontec.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.util.Objects;

@Entity(name = "usuarios")
public class UsuarioModel {

    @Id
    private Integer id_usuario;

    @Column(nullable = false, length = 50)
    private String nome_usuario;

    @Column(nullable = false, length = 50)
    private String email;

    @Column(nullable = false, length = 50)
    private String senha;

    @Column(nullable = false, length = 50)
    private String perfil;


    public UsuarioModel() {
    }

    public UsuarioModel(@NotBlank String nome_usuario,
                @NotBlank String senha) {
        this.nome_usuario = nome_usuario;
        this.senha = senha;
       // this.loggedIn = false;
    }


    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getNome_usuario() {
        return nome_usuario;
    }

    public void setNome_usuario(String nome_usuario) {
        this.nome_usuario = nome_usuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UsuarioModel)) return false;
        UsuarioModel user = (UsuarioModel) o;
        return Objects.equals(nome_usuario, user.nome_usuario) &&
                Objects.equals(senha, user.senha);
    }


}
