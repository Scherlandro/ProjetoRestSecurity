package biontec.biontec.api.controller;

import biontec.biontec.api.dtos.RoleUserDto;
import biontec.biontec.api.dtos.UsuarioDto;
import biontec.biontec.api.model.RoleModel;
import biontec.biontec.api.model.UsuarioModel;
import biontec.biontec.api.services.RoleUserService;
import biontec.biontec.api.services.UsuarioServices;
import lombok.var;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {


    @Autowired
    private UsuarioServices usuarioServices;

    @Autowired
    RoleUserService roleUserService;


    @GetMapping(path = "/")
    public ResponseEntity listarUsuarios(){
        return usuarioServices.listarUsuarios();
    }

    @GetMapping(path = "/{id_usuario}")
    public ResponseEntity consultar(@PathVariable("id_usuario") Integer id_usuario){
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

    @PutMapping(path = "/editar")
    public UsuarioModel editar(@RequestBody UsuarioModel usuario){
        return usuarioServices.editar(usuario);
    }

    @DeleteMapping(path = "/delete/{id_usuario}")
    public void excluir(@PathVariable("id_usuario") Integer id_usuario){
        usuarioServices.excluir(id_usuario);
    }

    @PostMapping(path = "/role")
    public UsuarioModel role(@RequestBody RoleUserDto roleUserDto){
        return roleUserService.execute(roleUserDto);
    }

    @GetMapping(path = "/list-role")
    public List<RoleModel> listRoles(){
        return roleUserService.listRoles();
    }

    @GetMapping(path = "/fetch-role/{username}")
    public UsuarioModel listFetchRoles(@PathVariable("username")String username){
        return roleUserService.listFethRoles(username);
    }


}

