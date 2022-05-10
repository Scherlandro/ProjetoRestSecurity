package biontec.biontec.api.controller;

import biontec.biontec.api.dtos.CreateUserRoleDto;
import biontec.biontec.api.dtos.UsuarioDto;
import biontec.biontec.api.model.UsuarioModel;
import biontec.biontec.api.repository.UsuarioRepository;
import biontec.biontec.api.repository.customRep.UserCustomRepository;
import biontec.biontec.api.services.CreateRoleUserService;
import biontec.biontec.api.services.UsuarioServices;
import lombok.var;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {


    @Autowired
    private UsuarioServices usuarioServices;

    @Autowired
    CreateRoleUserService createRoleUserService;


    @GetMapping(path = "/")
    public ResponseEntity listarUsuarios(){
        return usuarioServices.listarUsuarios();
    }

    @GetMapping(path = "/{id_usuario}")
    public ResponseEntity consultar(@PathVariable("id_usuario") UUID id_usuario){
        return usuarioServices.consultarPorId(id_usuario);
    }

    @GetMapping(path = "/filtrar")
    public UsuarioModel findUserByBody(@RequestBody @Valid UsuarioDto userDto) {
        String nome_usuario = "", senha = "";
        var usuarioModel = new UsuarioModel();
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

    @PostMapping(path = "/criar")
    public UsuarioModel criar(@RequestBody UsuarioModel usuario){
        return usuarioServices.salvar(usuario);
    }

    @PostMapping(path = "/role")
    public UsuarioModel role(@RequestBody CreateUserRoleDto createUserRoleDto){
        return createRoleUserService.execute(createUserRoleDto);
    }

    @PutMapping(path = "/editar")
    public UsuarioModel editar(@RequestBody UsuarioModel usuario){
        return usuarioServices.editar(usuario);
    }

    @DeleteMapping(path = "/delete/{id_usuario}")
    public void excluir(@PathVariable("id_usuario") UUID id_usuario){
        usuarioServices.excluir(id_usuario);
    }



}

