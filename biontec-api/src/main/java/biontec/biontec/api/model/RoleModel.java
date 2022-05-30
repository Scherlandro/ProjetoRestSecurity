package biontec.biontec.api.model;

import java.util.UUID;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "roles")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoleModel {

    @Id
    @GeneratedValue
    private Integer id_role;

    @Column(nullable = false, length = 45)
    private String name_role;

    public RoleModel(Integer id_role) {
        this.id_role = id_role;
    }

}

