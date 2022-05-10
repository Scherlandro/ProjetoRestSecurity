package biontec.biontec.api.model;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.persistence.*;

import org.hibernate.annotations.ManyToAny;
import biontec.biontec.api.model.RoleModel;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "usuarios")
public class UsuarioModel implements UserDetails, Serializable {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 50)
    private String username;

    @Column(nullable = false, length = 150)
    private String password;

    @ManyToMany
    private List<RoleModel> roles;


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public List<RoleModel> getRoles() {
        return roles;
    }

    public void setRoles(List<RoleModel> roles) {
        this.roles = roles;
    }





       /*
        List<GrantedAuthority> role = new ArrayList<>();
        role = roles.stream().map(r -> {
            return new SimpleGrantedAuthority("ROLE_".concat(r.getName()));
        }).collect(Collectors.toList());
      */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return  this.roles.stream().map(r -> {
            return new SimpleGrantedAuthority("ROLE_".concat(r.getName()));
        }).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }



    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
