package biontec.biontec.api.controller;


import biontec.biontec.api.dtos.UsuarioDto;
import biontec.biontec.api.model.UsuarioModel;
import biontec.biontec.api.services.LoginServices;
import biontec.biontec.api.services.UsuarioServices;
import lombok.var;
import org.aspectj.bridge.Message;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.DelegatingServerHttpResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import javax.security.auth.spi.LoginModule;
import javax.servlet.http.HttpServlet;
import javax.validation.Valid;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/autenticar")
public class LoginController {

    private UsuarioServices usuarioServices;

    public LoginController(UsuarioServices usuarioServices) {
        this.usuarioServices = usuarioServices;
    }

    @GetMapping(path = "/login")
    public String login(@RequestBody @Valid UsuarioModel login) {
        List<UsuarioModel> listUsers = usuarioServices.UsuarioServer();
        for (UsuarioModel other : listUsers) {
            if (other.equals(login)) {
                System.out.println(other);
                return "page_usuarios";
            }
        }
        return null;
    }

    @PostMapping("/logar")
    public ResponseEntity<Boolean> validarSenha(@RequestBody @Valid UsuarioModel login) {
      return usuarioServices.validarSenha(login.getName(), login.getPassword());
      /*
       public ResponseEntity<Boolean> validarSenha(@RequestParam String login,
                               @RequestParam String password) {
      return usuarioServices.validarSenha(login, password);
       */

       /* List<UsuarioModel> listUsers = usuarioServices.UsuarioServer();
        for (UsuarioModel other : listUsers) {
            if (other.getName().equals(login)) {
                ResponseEntity<Boolean> check = usuarioServices.validarSenha(login, password);
                if (check.getBody()) {
                    return "page_usuarios";
                } else {
                    return "/";
                }
            }
        }
        return "Usuario não cadastrado";

        */
    }
    @GetMapping("/logar/{name},{password}")
    public ResponseEntity<UsuarioModel> authUser(@PathVariable("name")String name,
                                                 @PathVariable("password")String password) {
        UsuarioDto usuarioDto = new UsuarioDto();
        usuarioDto.setNome_usuario(name);
        usuarioDto.setSenha(password);
        return usuarioServices.validarUsuario(usuarioDto);
    }

}
