package biontec.biontec.api.services;

import biontec.biontec.api.dtos.UsuarioDto;
import biontec.biontec.api.model.UsuarioModel;
import biontec.biontec.api.repository.UsuarioRepository;
import biontec.biontec.api.security.UserPrincipalSecurity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UsuarioServices implements UserDetailsService {

    final UsuarioRepository usuarioRepository;

/*    private BCryptPasswordEncoder passwordEncoder(){
     return new BCryptPasswordEncoder();
   }*/

    public UsuarioServices(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<UsuarioModel> UsuarioServer(){
        return usuarioRepository.findAll();
    }

    public ResponseEntity listarUsuarios(){
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    public ResponseEntity<Boolean> validarSenha(String login, String password){
        Optional<UsuarioModel> optUser = usuarioRepository.findByName(login);
        if(!optUser.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
        UsuarioModel user = optUser.get();
        boolean valido = new BCryptPasswordEncoder().matches(password, user.getPassword());
        HttpStatus status = (valido) ? HttpStatus.OK: HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(valido);

    }

    public ResponseEntity<UsuarioModel> validarUsuario(UsuarioDto usuarioModel){
        Optional<UsuarioModel> optUser = usuarioRepository.findByName(usuarioModel.getNome_usuario());
        if(!optUser.isPresent()){
             ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);

        }
        UsuarioModel user = optUser.get();
        boolean valido = new BCryptPasswordEncoder().matches(usuarioModel.getSenha(), user.getPassword());
        HttpStatus status = (valido) ? HttpStatus.OK: HttpStatus.UNAUTHORIZED;
         ResponseEntity.status(status).body(valido);
         return ResponseEntity.ok(optUser.get());

    }

    public ResponseEntity consultarPorId( Integer id_usuario){
        return usuarioRepository.findById(id_usuario).map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    public List<ResponseEntity<UsuarioModel>> UsuarioServerList(){
        return usuarioRepository.findAll()
                .stream()
                .map((record) -> ResponseEntity.ok().body(record))
                .collect(Collectors.toList());
    }

    public UsuarioModel salvar(UsuarioModel usuario){
        UsuarioModel usuarioExistente = usuarioRepository.findByUsername(usuario.getUsername());
        if (usuarioExistente != null) {
            throw new Error("Usuario já existe!");
        }
        usuario.setPassword(new BCryptPasswordEncoder().encode(usuario.getPassword()));
        UsuarioModel usuarioCriado = usuarioRepository.save(usuario);
        return usuarioCriado;
    }

    public UsuarioModel editar(UsuarioModel usuario){
        usuario.setPassword(new BCryptPasswordEncoder().encode(usuario.getPassword()));
        UsuarioModel usuarioCriado = usuarioRepository.save(usuario);
        return usuarioCriado;
    }

    public void excluir( Integer id_usuario){
        usuarioRepository.deleteById(id_usuario);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UsuarioModel usuario = usuarioRepository.findByUsernameFetchRoles(username);

        if(usuario != null){
            throw new Error("Usario não existe");
        }
        return new UserPrincipalSecurity(usuario);
    }

}
