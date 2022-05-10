package biontec.biontec.api.dtos;

import biontec.biontec.api.model.UsuarioModel;
import lombok.var;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

public class UsuarioDto {

    /*
    public static UsuarioDto converter(UsuarioModel u) {
        var users = new UsuarioDto();
        users.setNome_usuario(u.getNome_usuario());
        users.setEmail(u.getEmail());
        users.setSenha(u.getSenha());
        return users;
    }

     */


    @NotBlank
    private String nome_usuario;

    @Email
    private String email;

    @NotEmpty
    private String senha;




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

}
