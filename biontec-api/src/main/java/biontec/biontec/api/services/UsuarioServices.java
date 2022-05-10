package biontec.biontec.api.services;

import biontec.biontec.api.model.UsuarioModel;
import biontec.biontec.api.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UsuarioServices {

    final UsuarioRepository usuarioRepository;

    public UsuarioServices(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<UsuarioModel> UsuarioServer(){
        return usuarioRepository.findAll();
    }

    public ResponseEntity listarUsuarios(){
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    public ResponseEntity consultarPorId( UUID id_usuario){
        return usuarioRepository.findById(id_usuario).map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    public List<ResponseEntity<UsuarioModel>> UsuarioServerList(){
        return usuarioRepository.findAll()
                .stream()
                .map((record) -> ResponseEntity.ok().body(record))
                .collect(Collectors.toList());
    }

    private BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    public UsuarioModel salvar(UsuarioModel usuario){
        UsuarioModel usuarioExistente = usuarioRepository.findByUsername(usuario.getUsername());
        if (usuarioExistente != null) {
            throw new Error("Usuario já existe!");
        }
        usuario.setPassword(passwordEncoder().encode(usuario.getPassword()));
        UsuarioModel usuarioCriado = usuarioRepository.save(usuario);
        return usuarioCriado;
    }

    public UsuarioModel editar(UsuarioModel usuario){
        usuario.setPassword(passwordEncoder().encode(usuario.getPassword()));
        UsuarioModel usuarioCriado = usuarioRepository.save(usuario);
        return usuarioCriado;
    }

    public void excluir( UUID id_usuario){
        usuarioRepository.deleteById(id_usuario);
    }

 /*
    @GetMapping(path = "/filtrar")
    public List<ResponseEntity<UsuarioModel>> findUserByBody(@RequestBody @Valid UsuarioDto userDto) {
        var usuarioModel = new UsuarioModel();
        BeanUtils.copyProperties(userDto, usuarioModel);
        List<ResponseEntity<UsuarioModel>> listUsers = usuarioServices.UsuarioServerList();
        for (ResponseEntity<UsuarioModel> entity : listUsers) {
            if (entity.equals(usuarioModel)) {
                return listUsers;
            }
        }
        return null;
        //return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Registro não encontrado");
    }

    @GetMapping(path = "/filter/{nome_usuario}")
    public List<UsuarioDto> findUserByName(@RequestBody UsuarioDto user,
                                           @PathVariable("nome_usuario") String nome_usuario) {
        return this.repository.findUsuarioModelByNome_usuario(user,nome_usuario)
                .stream()
                .map((u) -> UsuarioDto.converter(u))
                .collect(Collectors.toList());
    }
     */



}
