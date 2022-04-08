package biontec.biontec.api.controller;

import biontec.biontec.api.model.ClienteModel;
import biontec.biontec.api.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @GetMapping(path = "/")
    public ResponseEntity<List<ClienteModel>> listarClientes(){
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping(path = "/{id_cliente}")
    public ResponseEntity consultar(@PathVariable("id_cliente") Integer id_cliente){
        return repository.findById(id_cliente).map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping(path = "/salvar")
    public ClienteModel salvar(@RequestBody ClienteModel cliente){
        return repository.save(cliente);
    }

    @PutMapping(path = "/editar")
    public ClienteModel editar(@RequestBody ClienteModel cliente){
        return repository.save(cliente);
    }

    @PostMapping(path = "/delete/{id_cliente}")
    public void excluir(@PathVariable("id_cliente") Integer id_cliente){
        repository.deleteById(id_cliente);
    }
}

