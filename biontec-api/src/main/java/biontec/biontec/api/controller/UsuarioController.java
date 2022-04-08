package biontec.biontec.api.controller;

import biontec.biontec.api.model.UsuarioModel;
import biontec.biontec.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @GetMapping(path = "/")
    public ResponseEntity<List<UsuarioModel>> listarUsuarios(){
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping(path = "/{id_usuario}")
    public ResponseEntity consultar(@PathVariable("id_usuario") Integer id_usuario){
        return repository.findById(id_usuario).map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
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
}
  /*
    private static final String URL_LISTAR_ESTAMPADOR_MUNICIPIO = "/credenciados?categoria=%s&municipio=%s";

    https://www.javatips.net/api/CloudPlayground-master/openshift/twitter-example/tweetstream-example/tweetstream/src/main/java/org/richfaces/examples/tweetstream/ui/useragent/UserAgentProcessor.java#
    https://github.com/thorntail/thorntail-examples/blob/master/kitchensink-html5-mobile/src/main/java/org/jboss/as/quickstarts/html5_mobile/service/MemberRegistration.java
    https://www.ibm.com/docs/pt-br/was/9.0.5?topic=cjrwa-configuring-jax-rs-applications-using-jax-rs-11-methods
    https://stackoverflow.com/questions/20813767/why-is-this-simple-jax-rs-example-not-working
	https://www.youtube.com/watch?v=-sPRp_ryyvY

	@GET
    @Path("estampadores")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarEstampadores(@QueryParam("municipio") String municipio) {
        return Response.ok(RestUtil.get(EnumAPI.CNH_SERVICE_2_0,
                RestUtil.replaceUrlParams(URL_LISTAR_ESTAMPADOR_MUNICIPIO,"ESTAMPADOR",
                        RestUtil.encondeStringURL(municipio.trim())))).build();
    }
   */
