package biontec.biontec.api.services;

import biontec.biontec.api.model.AlmoxarifadoModel;
import biontec.biontec.api.repository.AlmoxarifadoRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AlmoxarifadoServices {

    final AlmoxarifadoRepository almoxarifadoRepository;

    public AlmoxarifadoServices(AlmoxarifadoRepository repository) {

        this.almoxarifadoRepository = repository;
    }


    @Transactional
    public AlmoxarifadoModel save(AlmoxarifadoModel almoxarifadoModel) {

        return almoxarifadoRepository.save(almoxarifadoModel);
    }

    public Optional<AlmoxarifadoModel> findById(Integer id) {
        return almoxarifadoRepository.findById(id);
    }

    public List<AlmoxarifadoModel> findAll() {
        return almoxarifadoRepository.findAll();
    }

    public boolean existsByPlaca(String placa) {
        return almoxarifadoRepository.existsByPlaca(placa);
    }

    public boolean existsByDisponibilidade(Boolean disponibilidade) {
        return almoxarifadoRepository.existsByDisponibilidade(disponibilidade);
    }
}
