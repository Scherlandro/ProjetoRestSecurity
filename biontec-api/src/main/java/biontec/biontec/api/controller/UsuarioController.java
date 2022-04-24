package biontec.biontec.api.controller;

import biontec.biontec.api.dtos.UsuarioDto;
import biontec.biontec.api.model.UsuarioModel;
import biontec.biontec.api.repository.UsuarioRepository;
import biontec.biontec.api.repository.customRep.UserCustomRepository;
import biontec.biontec.api.services.UsuarioServices;
import lombok.var;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    final UsuarioServices usuarioServices;

    @Autowired
    private UsuarioRepository repository;
    @Autowired
    private final UserCustomRepository customRepository;

    public UsuarioController(UserCustomRepository customRepository, UsuarioServices usuarioServices) {
        this.customRepository = customRepository;
        this.usuarioServices = usuarioServices;
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<UsuarioModel>> listarUsuarios(){
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping(path = "/{id_usuario}")
    public ResponseEntity consultar(@PathVariable("id_usuario") Integer id_usuario){
        return repository.findById(id_usuario).map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(path = "/filtrar")
    public UsuarioModel findUserByBody(@RequestBody @Valid UsuarioDto userDto) {
        String nome_usuario = "", senha = "";
        var usuarioModel = new UsuarioModel(nome_usuario,senha);
        BeanUtils.copyProperties(userDto, usuarioModel);
        List<UsuarioModel> listUsers = usuarioServices.UsuarioServer();
        for (UsuarioModel entity : listUsers) {
            if (entity.equals(usuarioModel)) {
                return entity;
            }
        }
        return usuarioModel;
        //return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Registro não encontrado");
    }

    @PostMapping(path = "/salvar")
    public UsuarioModel salvar(@RequestBody UsuarioModel usuario){
        return repository.save(usuario);
    }

    @PutMapping(path = "/editar")
    public UsuarioModel editar(@RequestBody UsuarioModel usuario){
        return repository.save(usuario);
    }

    @DeleteMapping(path = "/delete/{id_usuario}")
    public void excluir(@PathVariable("id_usuario") Integer id_usuario){
        repository.deleteById(id_usuario);
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

    @GetMapping("/filter/custom")
    public List<UsuarioDto> findUserByCustom(
            @RequestParam(value = "nome_usuario", required = false) String nome_usuario,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "senha", required = false) String senha
    ) {

        return customRepository.find(nome_usuario, email, senha)
                .stream()
                .map((u) -> UsuarioDto.converter(u))
                .collect(Collectors.toList());
    }


}

