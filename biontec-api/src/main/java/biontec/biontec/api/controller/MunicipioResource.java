package biontec.biontec.api.controller;

import biontec.biontec.api.facade.RestService;
import biontec.biontec.api.facade.client.RestClientBuilder;
import biontec.biontec.api.facade.type.EnumAPI;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.xml.bind.ValidationException;

@Path("municipio")
public class MunicipioResource extends RestService {
    private static final String URL_CONSULTA_MUNICIPIO = "/public/listarMunicipiosUf?uf=%s";

    @GET
    @Produces("application/json")
    @Path("/{estado}")
    public Response listarMunicipiosPorUF(@PathParam("estado") final String estado) throws ValidationException {
        return new RestClientBuilder()
                .get()
                .wso2()
                .ip(findIpRequest())
                .api(EnumAPI.SCA.getUrlKey())
                .urlParams(URL_CONSULTA_MUNICIPIO, estado)
                .tracer()
                .response();
    }

}
