package biontec.biontec.api.controller;


import biontec.biontec.api.dtos.LoginDto;
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

import javax.security.auth.spi.LoginModule;
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


    /*
    @PostMapping("/login")
    public UsuarioModel login(@RequestBody @Valid LoginDto loginDto) {
        String nome_usuario = "", senha = "";
        var loginModel = new UsuarioModel();
        BeanUtils.copyProperties(loginDto, loginModel);
        List<UsuarioModel> listUsers = loginServices.LoginServer();
        for (UsuarioModel other : listUsers) {
            if (other.equals(loginModel)) {
                return other;
                // return ResponseEntity.status(HttpStatus.OK).body("Seja bem vindo");
            }
        }
        return null;
        //return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Registro não encontrado");
    }

     */


    }
