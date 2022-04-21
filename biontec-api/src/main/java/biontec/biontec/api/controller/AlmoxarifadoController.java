package biontec.biontec.api.controller;

import biontec.biontec.api.dtos.AlmoxarifadoDto;
import biontec.biontec.api.model.AlmoxarifadoModel;
import biontec.biontec.api.services.AlmoxarifadoServices;
import lombok.var;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/almoxarifado")
public class AlmoxarifadoController {


    final AlmoxarifadoServices almoxarifadoServices;


    public AlmoxarifadoController(AlmoxarifadoServices almoxarifadoServices) {
        this.almoxarifadoServices = almoxarifadoServices;
    }

    @GetMapping("/")
    public ResponseEntity<Object> listAlmoxarifado(){
        List<AlmoxarifadoModel> almoxarifadoModelList = almoxarifadoServices.findAll();
        if(almoxarifadoModelList.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Registro não encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(almoxarifadoModelList);

    }

    @GetMapping("/{id_veiculo}")
    public ResponseEntity<Object> getAlmoxarifado(@PathVariable(value = "id_veiculo") Integer id_veiculo){
        Optional<AlmoxarifadoModel> almoxarifadoModelOptional = almoxarifadoServices.findById(id_veiculo);
        if(!almoxarifadoModelOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Registro não encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(almoxarifadoModelOptional.get());
    }

    @PostMapping("/salvar")
    public ResponseEntity<Object> saveAlmoxarifado(@RequestBody @Valid AlmoxarifadoDto almoxarifadoDto){
        if(almoxarifadoServices.existsByPlaca(almoxarifadoDto.getPlaca())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Plate Car is already is use!");
        }
        /* obs:É desnecessário a verificação de disponibilidade de um objeto se ele está sendo criado nesse momento

        if(almoxarifadoServices.existsByDisponibilidade(almoxarifadoDto.getDisponibilidade())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Vehicle is not available!");
        }
         */

        var almoxarifadoModel = new AlmoxarifadoModel();
        BeanUtils.copyProperties(almoxarifadoDto, almoxarifadoModel);
        almoxarifadoModel.setDt_saida(LocalDateTime.now(ZoneId.of("UTC")));
        almoxarifadoModel.setDt_entrada(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.CREATED).body(almoxarifadoServices.save(almoxarifadoModel));

    }

    @PutMapping("/{id_veiculo}")
    public ResponseEntity<Object> updateAlmoxarifado(@PathVariable(value = "id_veiculo") Integer id_veiculo ,
                                                     @RequestBody @Valid AlmoxarifadoDto almoxarifadoDto){
        Optional<AlmoxarifadoModel> almoxarifadoModelOptional = almoxarifadoServices.findById(id_veiculo);
        if(!almoxarifadoModelOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Registro não encontrado");
        }
        var almoxarifadoModel = new AlmoxarifadoModel();
        BeanUtils.copyProperties(almoxarifadoDto, almoxarifadoModel);
        almoxarifadoModel.setId_veiculo(almoxarifadoModelOptional.get().getId_veiculo());
        almoxarifadoModel.setDt_saida(LocalDateTime.now(ZoneId.of("UTC")));
        almoxarifadoModel.setDt_entrada(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.CREATED).body(almoxarifadoServices.save(almoxarifadoModel));

    }





}
