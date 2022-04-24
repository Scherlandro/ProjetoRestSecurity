package biontec.biontec.api.services;

import biontec.biontec.api.model.UsuarioModel;
import biontec.biontec.api.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public ResponseEntity<List<UsuarioModel>> listarUsuarios() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    public List<ResponseEntity<UsuarioModel>> UsuarioServerList(){
        return usuarioRepository.findAll()
                .stream()
                .map((record) -> ResponseEntity.ok().body(record))
                .collect(Collectors.toList());
    }


}
