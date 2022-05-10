package biontec.biontec.api.dtos;

import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class CreateUserRoleDto {

    private UUID idUser;

    private List<UUID> idsRoles;

}
