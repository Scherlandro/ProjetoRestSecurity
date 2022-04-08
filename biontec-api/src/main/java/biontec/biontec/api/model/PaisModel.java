package biontec.biontec.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "paises")
public class PaisModel {

    @Id
   private Integer id_paises;

    @Column(nullable = false, length = 45)
   private String nome_pais ;

    @Column(nullable = false, length = 49)
    private String  bandeira ;

    private Integer area;

    private Integer population;

    @Column(nullable = false, length = 173)
    private String description;

    public Integer getId_paises() {
        return id_paises;
    }

    public void setId_paises(Integer id_paises) {
        this.id_paises = id_paises;
    }

    public String getNome_pais() {
        return nome_pais;
    }

    public void setNome_pais(String nome_pais) {
        this.nome_pais = nome_pais;
    }

    public String getBandeira() {
        return bandeira;
    }

    public void setBandeira(String bandeira) {
        this.bandeira = bandeira;
    }

    public Integer getArea() {
        return area;
    }

    public void setArea(Integer area) {
        this.area = area;
    }

    public Integer getPopulation() {
        return population;
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
