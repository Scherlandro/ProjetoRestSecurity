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
    private UUID id;

    @Column(nullable = false, length = 45)
    private String name;

    public RoleModel(UUID id) {
        this.id = id;
    }

}

