package biontec.biontec.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import biontec.biontec.api.dtos.CreateUserRoleDto;
import biontec.biontec.api.model.RoleModel;
import biontec.biontec.api.model.UsuarioModel;
import biontec.biontec.api.repository.UsuarioRepository;

@Service
public class CreateRoleUserService {

    @Autowired
    UsuarioRepository userRepository;

    public UsuarioModel execute(CreateUserRoleDto createUserRoleDTO) {

        Optional<UsuarioModel> userExists = userRepository.findById(createUserRoleDTO.getIdUser());
        List<RoleModel> roles = new ArrayList<>();

        if (!userExists.isPresent()) {
            throw new Error("Usuario não existe!");
        }
        roles = createUserRoleDTO.getIdsRoles().stream().map(role -> {
            return new RoleModel(role);
        }).collect(Collectors.toList());
        UsuarioModel user = userExists.get();
        user.setRoles(roles);
        userRepository.save(user);
        return user;

    }

}