package biontec.biontec.api.controller;

import biontec.biontec.api.model.ProdutoModel;
import biontec.biontec.api.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    @GetMapping(path = "/")
    public ResponseEntity<List<ProdutoModel>> listarProdutos(){
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping(path = "/{id_produto}")
    public ResponseEntity consultar(@PathVariable("id_produto") Integer id_produto){
        return repository.findById(id_produto).map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping(path = "/salvar")
    public ProdutoModel salvar(@RequestBody ProdutoModel produto){
        return repository.save(produto);
    }

    @PostMapping(path = "/delete/{id_produto}")
    public void excluir(@PathVariable("id_produto") Integer id_produto){
        repository.deleteById(id_produto);
    }
}

