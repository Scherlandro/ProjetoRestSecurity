package biontec.biontec.api.controller;


import biontec.biontec.api.dtos.LoginDto;
import biontec.biontec.api.model.UsuarioModel;
import biontec.biontec.api.services.LoginServices;
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

    final LoginServices loginServices;

    public LoginController(LoginServices loginServices) {
        this.loginServices = loginServices;
    }

    @PutMapping("/login")
    public UsuarioModel login(@RequestBody @Valid LoginDto loginDto) {
        String nome_usuario = "", senha = "";
        var loginModel = new UsuarioModel(nome_usuario,senha);
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


    }
