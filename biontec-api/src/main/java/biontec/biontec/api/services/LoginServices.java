package biontec.biontec.api.services;

import biontec.biontec.api.model.UsuarioModel;
import biontec.biontec.api.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginServices {

    final UsuarioRepository loginRepository;


    public LoginServices(UsuarioRepository loginRepository) {

        this.loginRepository = loginRepository;
    }

    public List<UsuarioModel> LoginServer(){
        return loginRepository.findAll();
    }


}
